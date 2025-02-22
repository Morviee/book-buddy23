// app/api/chatbot/route.ts
// import { NextResponse } from 'next/server';
// import axios from 'axios';

// interface OllamaResponse {
//   response: string;
//   done: boolean;
// }

// interface GoogleBooksVolume {
//   volumeInfo: {
//     title?: string;
//     authors?: string[];
//     description?: string;
//   };
// }

// interface GoogleBooksResponse {
//   items?: GoogleBooksVolume[];
// }

// export async function POST(req: Request) {
//   const { query } = await req.json();

//   // Validate environment variables
//   if (!process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY || !process.env.OLLAMA_API_URL) {
//     return NextResponse.json({ response: 'API keys are not set properly.' }, { status: 500 });
//   }

//   // Default greeting
//   if (!query || /hello|hi|hey|heyy|hie/i.test(query)) {
//     return NextResponse.json(
//       { response: "Hello! I am BookBuddy, your book partner. Tell me a mood or genre, and I'll suggest books for you!" },
//       { status: 200 }
//     );
//   }

//   // If user asks for a description of a specific book
//   if (/description/i.test(query)) {
//     // Improved regex to extract the book title
//     const bookTitleMatch = query.match(/description of "([^"]+)"|description for "([^"]+)"/i);
//     const bookTitle = bookTitleMatch?.[1] || bookTitleMatch?.[2];

//     if (!bookTitle) {
//       return NextResponse.json(
//         { response: "Please provide the book title for the description. For example: 'Description of \"Book Title\"'." },
//         { status: 200 }
//       );
//     }

//     try {
//       // Fetch book details from Google Books API
//       const googleBooksResponse = await axios.get<GoogleBooksResponse>(
//         `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookTitle)}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}&maxResults=1`
//       );

//       const book = googleBooksResponse.data.items?.[0];

//       if (!book) {
//         return NextResponse.json(
//           { response: `Sorry, I couldn't find a description for "${bookTitle}".` },
//           { status: 200 }
//         );
//       }

//       // Format description into 2 lines
//       const description = book.volumeInfo?.description || 'No description available.';
//       const shortDescription = description.split('\n').slice(0, 2).join(' ').substring(0, 150) + '...';

//       return NextResponse.json(
//         { response: `Here's a brief description of "${book.volumeInfo?.title || bookTitle}":\n${shortDescription}` },
//         { status: 200 }
//       );

//     } catch (error) {
//       console.error('Error fetching book description:', error);
//       return NextResponse.json(
//         { response: 'Oops! Something went wrong while fetching the description. Try again later.' },
//         { status: 500 }
//       );
//     }
//   }

//   try {
//     // Step 1: Extract book genre or mood using Ollama
//     const ollamaResponse = await axios.post<OllamaResponse>(
//       process.env.OLLAMA_API_URL,
//       {
//         model: 'llama2',
//         prompt: `Analyze this query and extract a book genre or mood: "${query}". Return only a single word, such as 'mystery', 'romance', 'adventure', 'sci-fi', etc.`,
//         stream: false,
//       }
//     );

//     const intent = ollamaResponse.data.response?.trim();
//     if (!intent) {
//       return NextResponse.json(
//         { response: "I couldn't determine a book genre from your request. Try asking with words like 'romance' or 'mystery'!" },
//         { status: 400 }
//       );
//     }

//     // Step 2: Fetch book recommendations from Google Books API
//     const googleBooksResponse = await axios.get<GoogleBooksResponse>(
//       `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(intent)}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}&maxResults=3`
//     );

//     const books = googleBooksResponse.data.items?.slice(0, 3) || [];

//     if (books.length === 0) {
//       return NextResponse.json(
//         { response: `I couldn't find any books for "${intent}". Try another genre!` },
//         { status: 200 }
//       );
//     }

//     // Step 3: Format recommendations (structured and concise)
//     const recommendations = books.map((book, index) => {
//       const title = book.volumeInfo?.title || 'Unknown Title';
//       const authors = book.volumeInfo?.authors?.join(', ') || 'Unknown Author';
//       return `${index + 1}. ${title} by ${authors}`;
//     }).join('\n');

//     const response = `Here are 3 books you might like:\n${recommendations}\n\nWant a description? Just ask: "Description of [Book Title]".`;

//     return NextResponse.json({ response }, { status: 200 });

//   } catch (error) {
//     console.error('Error processing request:', error);
//     return NextResponse.json(
//       { response: 'Oops! Something went wrong. Try again later.' },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import axios from 'axios';

interface ChatContext {
  lastBookDiscussed?: string;
  lastRecommendations?: GoogleBooksVolume[];
}

interface GoogleBooksVolume {
  id: string;
  volumeInfo: {
    title?: string;
    authors?: string[];
    description?: string;
    publishedDate?: string;
    pageCount?: number;
    categories?: string[];
    averageRating?: number;
    imageLinks?: {
      thumbnail?: string;
    };
    publisher?: string;
  };
}

const chatSessions = new Map<string, ChatContext>();

export async function POST(req: Request) {
  const { query, sessionId } = await req.json();

  // Initialize context
  let context = chatSessions.get(sessionId) || { lastRecommendations: [] };

  try {
    // Check for basic greeting
    if (!query || /^(hello|hi|hey|heyy|hie)(\s|$)/i.test(query)) {
      return NextResponse.json({
        response: `## 📚 Welcome to BookBuddy!
        
I can help you find books and discuss them. Try:
• "Tell me about The Hobbit"
• "Recommend fantasy books"
• "Find books like Project Hail Mary"`,
      });
    }

    // Analyze query intent using Ollama
    const intent = await determineQueryIntent(query);
    
    switch (intent) {
      case 'SPECIFIC_BOOK':
        return await handleSpecificBookQuery(query, context);
      case 'RECOMMENDATION':
        return await handleRecommendationQuery(query, context);
      case 'SIMILAR_BOOKS':
        return await handleSimilarBooksQuery(query, context);
      default:
        return await handleGeneralQuery(query, context);
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { response: '❌ Sorry, I had trouble with that. Could you try again?' },
      { status: 500 }
    );
  }
}

async function determineQueryIntent(query: string): Promise<string> {
  const prompt = `
Analyze this book-related query: "${query}"
Return ONLY ONE of:
- SPECIFIC_BOOK (asking about a specific book)
- RECOMMENDATION (asking for book recommendations)
- SIMILAR_BOOKS (asking for similar books)
- GENERAL (other book-related questions)`;

  const response = await axios.post(
    process.env.OLLAMA_API_URL,
    {
      model: 'llama2',
      prompt,
      stream: false
    }
  );

  return response.data.response.trim();
}

async function handleSpecificBookQuery(query: string, context: ChatContext) {
  // Extract book title using Ollama
  const titleResponse = await axios.post(
    process.env.OLLAMA_API_URL,
    {
      model: 'llama2',
      prompt: `Extract the exact book title from: "${query}"
Return ONLY the title, no extra text.`,
      stream: false
    }
  );
  
  const bookTitle = titleResponse.data.response.trim();

  // Search Google Books API
  const googleBooksResponse = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(bookTitle)}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
  );

  const book = googleBooksResponse.data.items?.[0];
  
  if (!book) {
    return NextResponse.json({
      response: `Sorry, I couldn't find information about "${bookTitle}". Could you check the spelling?`
    });
  }

  // Format response using book data
  const response = formatBookDetails(book);
  context.lastBookDiscussed = book.volumeInfo.title;
  
  return NextResponse.json({ response });
}

async function handleRecommendationQuery(query: string, context: ChatContext) {
  // Extract genre/topic using Ollama
  const genreResponse = await axios.post(
    process.env.OLLAMA_API_URL,
    {
      model: 'llama2',
      prompt: `Extract the main genre/category from: "${query}"
Return ONLY the genre, no extra text.`,
      stream: false
    }
  );
  
  const genre = genreResponse.data.response.trim();

  // Search Google Books API
  const googleBooksResponse = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(genre)}&orderBy=relevance&maxResults=3&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
  );

  const books = googleBooksResponse.data.items || [];
  context.lastRecommendations = books;

  // Format recommendations
  const response = formatRecommendations(books, genre);
  return NextResponse.json({ response });
}

async function handleSimilarBooksQuery(query: string, context: ChatContext) {
  // Extract reference book title
  const titleResponse = await axios.post(
    process.env.OLLAMA_API_URL,
    {
      model: 'llama2',
      prompt: `Extract the book title to find similar books for from: "${query}"
Return ONLY the title, no extra text.`,
      stream: false
    }
  );
  
  const bookTitle = titleResponse.data.response.trim();

  // Get reference book details
  const referenceBookResponse = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(bookTitle)}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
  );

  const referenceBook = referenceBookResponse.data.items?.[0];
  
  if (!referenceBook) {
    return NextResponse.json({
      response: `I couldn't find the book "${bookTitle}". Could you check the title?`
    });
  }

  // Get similar books based on categories and authors
  const category = referenceBook.volumeInfo.categories?.[0];
  const author = referenceBook.volumeInfo.authors?.[0];
  
  const similarBooksResponse = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${
      category ? `subject:${encodeURIComponent(category)}` : ''
    }${author ? `+inauthor:${encodeURIComponent(author)}` : ''
    }&maxResults=3&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
  );

  const similarBooks = similarBooksResponse.data.items || [];
  context.lastRecommendations = similarBooks;

  // Format similar books response
  const response = formatSimilarBooks(similarBooks, referenceBook);
  return NextResponse.json({ response });
}

async function handleGeneralQuery(query: string, context: ChatContext) {
  // Use Ollama to generate a conversational response
  const prompt = `
Generate a brief, friendly response to this book-related question: "${query}"
Context: ${JSON.stringify(context)}
Keep it under 100 words and include one follow-up question if appropriate.`;

  const response = await axios.post(
    process.env.OLLAMA_API_URL,
    {
      model: 'llama2',
      prompt,
      stream: false
    }
  );

  return NextResponse.json({ response: response.data.response.trim() });
}

function formatBookDetails(book: GoogleBooksVolume): string {
  const { volumeInfo } = book;
  const title = volumeInfo.title;
  const authors = volumeInfo.authors?.join(', ') || 'Unknown author';
  const year = volumeInfo.publishedDate?.substring(0, 4);
  const rating = volumeInfo.averageRating ? `⭐ ${volumeInfo.averageRating}/5` : '';
  const description = volumeInfo.description?.substring(0, 150) + '...' || 'No description available.';

  return `## 📖 ${title} (${year}) ${rating}
By ${authors}

${description}

**Want to know more?**
• Ask about similar books
• Get more details
• See author's other works`;
}

function formatRecommendations(books: GoogleBooksVolume[], genre: string): string {
  const recommendations = books.map(book => {
    const { volumeInfo } = book;
    return `### ${volumeInfo.title}
By ${volumeInfo.authors?.join(', ')}
${volumeInfo.description?.substring(0, 100)}...`;
  }).join('\n\n');

  return `## 📚 Top ${genre} Books

${recommendations}

Want to know more about any of these books? Just ask!`;
}

function formatSimilarBooks(books: GoogleBooksVolume[], referenceBook: GoogleBooksVolume): string {
  const recommendations = books
    .filter(book => book.id !== referenceBook.id)
    .map(book => {
      const { volumeInfo } = book;
      return `### ${volumeInfo.title}
By ${volumeInfo.authors?.join(', ')}
${volumeInfo.description?.substring(0, 100)}...`;
    })
    .join('\n\n');

  return `## 📚 Books Similar to ${referenceBook.volumeInfo.title}

${recommendations}

Want details about any of these books? Just ask!`;
}