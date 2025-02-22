"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";

export default function GenreBooksPage() {
  const params = useParams();
  const genre = params.genre as string;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!genre) return;

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

        if (!apiKey) {
          throw new Error("API key is not configured");
        }

        // Convert genre from slug format and encode
        const searchTerm = genre.replace(/-/g, " ");
        const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(
          searchTerm
        )}&maxResults=20&key=${apiKey}`;

        console.log("Fetching from URL:", url);

        const response = await fetch(url);
        const data = await response.json();

        console.log("API Response:", data);

        if (!response.ok) {
          throw new Error(`API Error: ${data.error?.message || response.statusText}`);
        }

        if (data.items && data.items.length > 0) {
          setBooks(data.items);
          setError(null);
        } else {
          setBooks([]);
          setError("No books found for this genre");
        }
      } catch (error) {
        console.error("Error details:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch books");
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [genre]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
      <Navbar />
      <main className="ml-16 p-4 sm:p-8">
        <h1 className="text-4xl sm:text-5xl font-serif text-black mb-8 sm:mb-12 text-center capitalize">
          {genre.replace(/-/g, " ")} Books
        </h1>

        {error && (
          <div className="text-center mb-4 text-black">
            <p>{error}</p>
            <p className="text-sm mt-2">
              API Key status: {process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY ? "Configured" : "Missing"}
            </p>
          </div>
        )}

        {loading ? (
          <p className="text-center text-xl text-blue-700">Loading books...</p>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
            {books.map((book: any) => {
              const volumeInfo = book.volumeInfo || {};
              const title = volumeInfo.title || "Unknown Title";
              const authors = volumeInfo.authors || ["Unknown Author"];
              const description = volumeInfo.description || "No description available.";
              const thumbnail = volumeInfo.imageLinks?.thumbnail?.replace("http:", "https:") || "/book-placeholder.png";
              const infoLink = volumeInfo.infoLink || "#";

              return (
                <div
                  key={book.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105"
                >
                  <div className="relative h-56 w-full">
                    <Image
                      src={thumbnail}
                      alt={title}
                      fill
                      className="object-contain transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-70 transition-opacity duration-300 flex items-end justify-center">
                      <h2 className="text-white text-sm sm:text-base font-bold mb-2 px-2 text-center line-clamp-2">
                        {title}
                      </h2>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <p className="text-xs sm:text-sm font-semibold text-black mb-1 line-clamp-1">
                      {authors[0]}
                    </p>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{description}</p>
                    <Link
                      href={infoLink}
                      target="_blank"
                      className="inline-block bg-indigo-400 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-rose-700 transition-colors duration-300 shadow-sm hover:shadow-md"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-xl text-black">No books found for this genre.</p>
        )}
      </main>
    </div>
  );
}
