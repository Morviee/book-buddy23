// import Navbar from '../components/Navbar';
// import Image from 'next/image';

// export default function ChatbotPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 overflow-hidden relative">
//       <Navbar />
//       <main className="ml-16 p-8 flex flex-col items-center justify-center min-h-screen relative z-10">
//         <h1 className="text-5xl font-serif text-purple-900 mb-8 text-center">Chat with BookBuddy</h1>
//         <p className="text-xl text-blue-800 mb-12 text-center max-w-2xl">
//           Your AI reading companion. Ask about books, get recommendations, or discuss your favorite stories!
//         </p>

//         {/* Chatbot Container */}
//         <div className="w-full max-w-4xl bg-white bg-opacity-80 backdrop-blur-md rounded-3xl shadow-2xl p-8">
//           <div className="h-[500px] flex items-center justify-center">
//             {/* Embed Chatbot iframe here */}

//           </div>
//         </div>
//       </main>

//       {/* Decorative Elements */}
//       <div className="absolute top-20 left-40 transform -rotate-12">
//         <Image src="/Book1.jpg" alt="Book 1" width={150} height={200} className="rounded-lg shadow-lg" />
//       </div>
//       <div className="absolute top-40 right-60 transform rotate-6">
//         <Image src="/book2.jpg" alt="Book 2" width={130} height={180} className="rounded-lg shadow-lg" />
//       </div>
//       <div className="absolute bottom-40 right-32 transform rotate-15">
//         <Image src="/Book3.jpg" alt="Book 3" width={120} height={160} className="rounded-lg shadow-lg" />
//       </div>
//       <div className="absolute bottom-60 left-24 transform rotate-25">
//         <Image src="/Book5.jpg" alt="Book 4" width={100} height={140} className="rounded-lg shadow-lg" />
//       </div>
//       <div className="absolute bottom-20 left-1/3 transform rotate-10">
//         <Image src="/Book4.jpg" alt="Book 5" width={110} height={150} className="rounded-lg shadow-lg" />
//       </div>

//       {/* Floating elements */}
//       <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-purple-500 rounded-full opacity-50 animate-float"></div>
//       <div className="absolute top-2/3 right-1/3 w-6 h-6 bg-blue-500 rounded-full opacity-50 animate-float animation-delay-1000"></div>
//       <div className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-indigo-500 rounded-full opacity-50 animate-float animation-delay-2000"></div>
//     </div>
//   );
// }
'use client'; // Required for client-side rendering

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Image from 'next/image';

export default function ChatbotPage() {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return; 

    setMessages((prevMessages) => [...prevMessages, { text: input, isUser: true }]);
    setLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: input }),
      });

      console.log('Raw response:', response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Parsed JSON:', data);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.response, isUser: false },
      ]);
    } catch (error) {
      console.error('Error fetching response from the chatbot:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Sorry, something went wrong. Please try again.', isUser: false },
      ]);
    }

    setLoading(false);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 overflow-hidden relative">
      <Navbar />
      <main className="ml-16 p-8 flex flex-col items-center justify-center min-h-screen relative z-10">
        <h1 className="text-5xl font-serif text-purple-900 mb-8 text-center">Chat with BookBuddy</h1>
        <p className="text-xl text-blue-800 mb-12 text-center max-w-2xl">
          Your AI reading companion. Ask about books, get recommendations, or discuss your favorite stories!
        </p>

        {/* Chatbot Container */}
        <div className="w-full max-w-4xl bg-white bg-opacity-80 backdrop-blur-md rounded-3xl shadow-2xl p-8">
          <div className="h-[500px] flex flex-col">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-4 rounded-lg ${
                      msg.isUser
                        ? 'bg-purple-500 text-white'
                        : 'bg-blue-100 text-blue-900'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Field and Send Button */}
            <div className="flex items-center border-t border-gray-200 pt-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !loading && handleSend()}
                placeholder="Type your message..."
                className="flex-1 p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleSend}
                className="bg-purple-500 text-white p-3 rounded-r-lg hover:bg-purple-600 transition-colors"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-40 transform -rotate-12">
        <Image src="/Book1.jpg" alt="Book 1" width={150} height={200} className="rounded-lg shadow-lg" />
      </div>
      <div className="absolute top-40 right-60 transform rotate-6">
        <Image src="/book2.jpg" alt="Book 2" width={130} height={180} className="rounded-lg shadow-lg" />
      </div>
      <div className="absolute bottom-40 right-32 transform rotate-15">
        <Image src="/Book3.jpg" alt="Book 3" width={120} height={160} className="rounded-lg shadow-lg" />
      </div>
      <div className="absolute bottom-60 left-24 transform rotate-25">
        <Image src="/Book5.jpg" alt="Book 4" width={100} height={140} className="rounded-lg shadow-lg" />
      </div>
      <div className="absolute bottom-20 left-1/3 transform rotate-10">
        <Image src="/Book4.jpg" alt="Book 5" width={110} height={150} className="rounded-lg shadow-lg" />
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-purple-500 rounded-full opacity-50 animate-float"></div>
      <div className="absolute top-2/3 right-1/3 w-6 h-6 bg-blue-500 rounded-full opacity-50 animate-float animation-delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-indigo-500 rounded-full opacity-50 animate-float animation-delay-2000"></div>
    </div>
  );
}