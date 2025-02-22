'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Book, BookOpen, Bookmark, Users, MessageSquare, Feather, Star, Calendar } from 'lucide-react'
import Navbar from "../../components/Navbar"

// Mock user data (in a real app, this would come from a database)
const userData = {
  username: 'bookworm42',
  name: 'Jane Doe',
  avatar: '/avatars/book-lover.png',
  favoriteGenre: 'Fantasy',
  booksRead: 42,
  currentlyReading: 'The Name of the Wind',
  favoriteQuote: '"So many books, so little time." - Frank Zappa',
  joinDate: 'January 2023',
}

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState('library')

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-8">
        <div className="shadow-2xl rounded-3xl overflow-hidden">
          <div className="p-8  bg-violet-950 text-white">
            <h1 className="text-4xl font-serif mb-2">{userData.name}&apos;s Bookshelf</h1>
            <p className="text-xl">@{userData.username}</p>
          </div>
          <div className="md:flex">
            {/* Left Column: Avatar and Profile Details */}
            <div className="md:w-1/3 p-8 border-r border-gray-200">
              <div className="mb-6 text-center">
                <div className="relative inline-block">
                  <Image
                    src={userData.avatar}
                    alt={userData.name}
                    width={160}
                    height={160}
                    className="rounded-full border-4 border-purple-300"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2">
                    <Star className="w-6 h-6 text-purple-800" />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <ProfileDetail icon={<Book className="text-purple-500" />} label="Favorite Genre" value={userData.favoriteGenre} />
                <ProfileDetail icon={<BookOpen className="text-purple-500" />} label="Books Read" value={userData.booksRead.toString()} />
                <ProfileDetail icon={<Bookmark className="text-purple-500" />} label="Currently Reading" value={userData.currentlyReading} />
                <ProfileDetail icon={<MessageSquare className="text-purple-500" />} label="Favorite Quote" value={userData.favoriteQuote} />
                <ProfileDetail icon={<Calendar className="text-purple-500" />} label="Member Since" value={userData.joinDate} />
              </div>
            </div>
            
            {/* Right Column: Tabs and Content */}
            <div className="md:w-2/3 p-8">
              <div className="mb-8 flex justify-center space-x-4">
                <TabButton active={activeTab === 'library'} onClick={() => setActiveTab('library')}>
                  <Book className="w-5 h-5 mr-2" />
                  My Library
                </TabButton>
                <TabButton active={activeTab === 'activities'} onClick={() => setActiveTab('activities')}>
                  <Feather className="w-5 h-5 mr-2" />
                  Activities
                </TabButton>
                <TabButton active={activeTab === 'bookshelf'} onClick={() => setActiveTab('bookshelf')}>
                  <Bookmark className="w-5 h-5 mr-2" />
                  Bookshelf
                </TabButton>
              </div>

              {activeTab === 'library' && (
                <div className="space-y-6">
                  <VirtualLibrary />
                  <BookQuiz />
                  <WriteStory />
                </div>
              )}

              {activeTab === 'activities' && (
                <div className="space-y-6">
                  <ReadingStats />
                  <RecentActivity />
                </div>
              )}

              {activeTab === 'bookshelf' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <BookCover title="The Hobbit" author="J.R.R. Tolkien" image="/placeholder.svg?height=300&width=200&text=The+Hobbit" />
                  <BookCover title="Pride and Prejudice" author="Jane Austen" image="/placeholder.svg?height=300&width=200&text=Pride+and+Prejudice" />
                  <BookCover title="1984" author="George Orwell" image="/placeholder.svg?height=300&width=200&text=1984" />
                  <BookCover title="To Kill a Mockingbird" author="Harper Lee" image="/placeholder.svg?height=300&width=200&text=To+Kill+a+Mockingbird" />
                  <BookCover title="The Great Gatsby" author="F. Scott Fitzgerald" image="/placeholder.svg?height=300&width=200&text=The+Great+Gatsby" />
                  <BookCover title="Dune" author="Frank Herbert" image="/placeholder.svg?height=300&width=200&text=Dune" />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
    </>
  )
}

function ProfileDetail({ icon, label, value }) {
  return (
    <div className="flex items-center space-x-3">
      {icon}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-lg text-gray-800">{value}</p>
      </div>
    </div>
  )
}

function TabButton({ children, active, onClick }) {
  return (
    <button
      className={`flex items-center px-4 py-2 rounded-full font-medium ${
        active
          ? 'bg-purple-600 text-white'
          : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function VirtualLibrary() {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-2xl font-serif mb-4 text-purple-800">Create Your Virtual Library</h3>
      <p className="mb-4 text-purple-700">Curate your personal collection of literary treasures.</p>
      <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors duration-300">
        Start Building
      </button>
    </div>
  )
}

function BookQuiz() {
  return (
    <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-2xl font-serif mb-4 text-purple-800">Discover Your Book Character</h3>
      <p className="mb-4 text-purple-700">Take our quiz and find out which literary character you most resemble!</p>
      <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors duration-300">
        Start Quiz
      </button>
    </div>
  )
}

function WriteStory() {
  return (
    <div className="bg-gradient-to-r from-indigo-100 to-blue-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-2xl font-serif mb-4 text-purple-800">Write Your Story</h3>
      <p className="mb-4 text-purple-700">Begin your journey as an author and share your stories with the world.</p>
      <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors duration-300">
        Start Writing
      </button>
    </div>
  )
}

function ReadingStats() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-2xl font-serif mb-6 text-purple-800">Your Reading Journey</h3>
      <div className="flex justify-between">
        <Stat icon={<BookOpen className="w-8 h-8 text-purple-500" />} value="42" label="Books Read" />
        <Stat icon={<Feather className="w-8 h-8 text-blue-500" />} value="12" label="Reviews Written" />
        <Stat icon={<Users className="w-8 h-8 text-pink-500" />} value="5" label="Book Clubs" />
      </div>
    </div>
  )
}

function Stat({ icon, value, label }) {
  return (
    <div className="text-center">
      <div className="inline-block p-4 bg-purple-100 rounded-full mb-2">{icon}</div>
      <p className="text-2xl font-bold text-purple-800">{value}</p>
      <p className="text-sm text-purple-600">{label}</p>
    </div>
  )
}

function RecentActivity() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-2xl font-serif mb-6 text-purple-800">Recent Activity</h3>
      <ul className="space-y-4">
        <ActivityItem
          icon={<BookOpen className="w-5 h-5 text-purple-500" />}
          text="Finished reading 'The Name of the Wind'"
          time="2 days ago"
        />
        <ActivityItem
          icon={<Feather className="w-5 h-5 text-blue-500" />}
          text="Wrote a review for 'Dune'"
          time="1 week ago"
        />
        <ActivityItem
          icon={<Users className="w-5 h-5 text-pink-500" />}
          text="Joined 'Sci-Fi Enthusiasts' book club"
          time="2 weeks ago"
        />
      </ul>
    </div>
  )
}

function ActivityItem({ icon, text, time }) {
  return (
    <li className="flex items-center space-x-3">
      <div className="bg-purple-100 p-2 rounded-full">{icon}</div>
      <div>
        <p className="text-purple-800">{text}</p>
        <p className="text-sm text-purple-500">{time}</p>
      </div>
    </li>
  )
}

function BookCover({ title, author, image }) {
  return (
    <div className="relative group">
      <div className="aspect-w-2 aspect-h-3 rounded-lg overflow-hidden shadow-md">
        <Image src={image} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="absolute inset-0 bg-purple-900 bg-opacity-60 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="p-4 text-white">
          <h4 className="text-lg font-semibold">{title}</h4>
          <p className="text-sm">{author}</p>
        </div>
      </div>
    </div>
  )
}

