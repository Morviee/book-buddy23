'use client'

import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'

export default function SearchPage() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [featuredBooks, setFeaturedBooks] = useState([])

    // Fetch featured books on initial load
    useEffect(() => {
        const fetchFeaturedBooks = async () => {
            const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/books/v1/volumes?q=bestsellers&maxResults=12&key=${apiKey}`
                )
                setFeaturedBooks(response.data.items || [])
            } catch (error) {
                console.error('Error fetching featured books:', error)
            }
        }
        fetchFeaturedBooks()
    }, [])

    // Function to handle the search
    const handleSearch = async (e) => {
        e.preventDefault()
        if (!query.trim()) return
        setIsLoading(true)
        setResults([])

        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY

        try {
            const response = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`
            )
            setResults(response.data.items || [])
        } catch (error) {
            console.error('Error fetching data from Google Books API:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-serif text-purple-900 mb-8 text-center">Search BookBuddy</h1>
                <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for books, authors, or users..."
                            className="w-full px-6 py-4 text-lg border-2 border-purple-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-2 bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 transition-colors duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1112 4.5a7.5 7.5 0 014.65 12.15z"
                                />
                            </svg>
                        </button>
                    </div>
                </form>
                {isLoading ? (
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-900"></div>
                        <p className="mt-4 text-lg text-purple-800">Searching the BookBuddy universe...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {(results.length > 0 ? results : featuredBooks).map((book) => (
                            <div
                                key={book.id}
                                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="aspect-w-3 aspect-h-4">
                                    {book.volumeInfo.imageLinks?.thumbnail && (
                                        <img
                                            src={book.volumeInfo.imageLinks.thumbnail}
                                            alt={book.volumeInfo.title}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    )}
                                </div>
                                <h3 className="text-lg font-bold text-purple-900 mt-4 line-clamp-1">
                                    {book.volumeInfo.title}
                                </h3>
                                {book.volumeInfo.authors && (
                                    <p className="text-sm text-purple-700">
                                        By {book.volumeInfo.authors.join(', ')}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
