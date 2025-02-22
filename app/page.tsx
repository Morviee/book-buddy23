'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from './components/Navbar'

const featuredBooks = [
  { 
    title: "The Chamber of Secrets",
    author: "J.K. Rowling",
    pages: { current: 154, total: 360 },
    description: "Harry is in his second year at Hogwarts School of Witchcraft and Wizardry. Little does he know that this year will be just as eventful as the last...",
    genre: "Fantasy, Young Adult",
    cover: "/Fantsy.jpg"
  },
  { 
    title: "The Prisoner of Azkaban",
    author: "J.K. Rowling",
    pages: { current: 89, total: 435 },
    description: "Harry Potter's third year at Hogwarts is full of new dangers. A convicted murderer, Sirius Black, has broken out of Azkaban prison, and it seems he's after Harry...",
    genre: "Fantasy, Young Adult",
    cover: "/Mystery.jpg"
  },
  { 
    title: "The Goblet of Fire",
    author: "J.K. Rowling",
    pages: { current: 212, total: 636 },
    description: "Harry Potter is midway through his training as a wizard and his coming of age. Harry wants to get away from the pernicious Dursleys and go to the International Quidditch Cup...",
    genre: "Fantasy, Young Adult",
    cover: "/Romance.jpg"
  }
]

export default function Home() {
  const [currentBookIndex, setCurrentBookIndex] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentBookIndex((prevIndex) => (prevIndex + 1) % featuredBooks.length)
        setIsFlipping(false)
      }, 500)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const currentBook = featuredBooks[currentBookIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 py-8">
      <Navbar />
      <main className="max-w-[85%] mx-auto bg-white rounded-3xl shadow-xl overflow-hidden ml-40">
        <div className="flex relative">
          {/* Left Section (60%) */}
          <div className="w-[57%] p-12 space-y-10">
            <div>
              <h1 className="text-7xl font-serif mb-3 text-purple-900">
                Welcome to Your Personal <br /> Book Heaven
              </h1>
              <p className="text-gray-600 mb-5 max-w-md text-base">
                Embark on a Journey Through Pages, Where Every Book is an Adventure Waiting to be Enjoyed and Every Story Unfolds with Fun and Wonder.
              </p>
              {/* <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 text-base font-semibold rounded-full hover:opacity-90 transition-all duration-300 hover:shadow-lg">
                Start Reading →
              </button> */}
            </div>

            <div>
              <h2 className="text-2xl font-serif text-purple-800 mb-4">Popular Now</h2>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { title: 'The Game of Ice and Fire', cover: '/Fantasy.jpg' },
                  { title: 'Fantastic Beasts', cover: '/Mystery.jpg' },
                  { title: 'Game of Thrones', cover: '/Romance.jpg' },
                  { title: 'Fear', cover: '/sc-fi.png' }
                ].map((book, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={book.cover}
                      alt={book.title}
                      width={200}
                      height={260}
                      className="rounded-lg shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end p-3">
                      <p className="text-white text-xs font-medium">{book.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-purple-800 mb-4">New Series Collection</h2>
              <div className="bg-white border border-purple-100 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                <div className="p-3 flex items-center gap-4">
                  <Image
                    src="/Book4.jpg"
                    alt="A Legend of Ice and Fire"
                    width={75}
                    height={100}
                    className="rounded-lg shadow-md"
                  />
                  <div>
                    <h3 className="font-medium text-base text-purple-900">
                      Good Girl's Guide to Murder
                    </h3>
                    <p className="text-blue-600 text-xs mt-1">
                      A girl trying to solve a mystery as her final year project
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Partitioning Book Image */}
          <div className="absolute left-[57%] top-[25%] transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              <div className="absolute -right-3 -top-1 w-[200px] h-[250px] rounded-lg my-3"></div>
              <Image
                src="/newImageBook.jpeg"
                alt={currentBook.title}
                width={300}
                height={250}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>

          {/* Right Section (40%) */}
          <div className="w-[40%] bg-gradient-to-br from-purple-50 to-blue-50 p-12">
            <div className="sticky top-24 space-y-6 pl-32">
              <div className="space-y-4">
                <div>
                  <h2 className="text-3xl font-serif text-purple-900">{currentBook.title}</h2>
                  <p className="text-blue-600 mt-1 text-sm">
                    {currentBook.pages.current} / {currentBook.pages.total} pages
                  </p>
                </div>
                <div className="prose prose-sm prose-purple">
                  <p className="text-gray-700 leading-relaxed">
                    {currentBook.description}
                  </p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-medium text-purple-800">Genres</h3>
                  <p className="text-gray-600">{currentBook.genre}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-medium text-purple-800">Author</h3>
                  <p className="text-gray-600">{currentBook.author}</p>
                </div>
                <div>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-300 text-white font-semibold text-base py-2 px-6 rounded-lg w-full hover:opacity-90 transition-all duration-300">
                    Create Your Own Library
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

