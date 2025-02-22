// 'use client'

// import { useState } from 'react'
// import Image from 'next/image'
// import Navbar from '../components/Navbar'
// import Avatar from '../components/Avatar'
// import { Book, Bookmark, Feather, Library } from 'lucide-react'

// export default function ProfilePage() {
//   const [formData, setFormData] = useState({
//     name: '',
//     gender: '',
//     age: '',
//     favoriteGenre: '',
//     booksPerYear: '',
//     favoriteBook: '',
//     avatar: '/avatars/book-lover.png',
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//   }

//   const handleAvatarSelect = (avatar: string) => {
//     setFormData(prev => ({ ...prev, avatar }))
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     console.log(formData)
//     // Here you would typically send the data to your backend
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
//       <Navbar />
//       <main className="ml-16 p-8 flex justify-center items-center min-h-screen">
//         <div className="w-full max-w-5xl bg-white bg-opacity-80 backdrop-blur-md rounded-3xl shadow-2xl p-12 relative overflow-hidden">
//           <h1 className="text-5xl font-serif text-purple-900 mb-8 text-center">Your Reading Journey</h1>
//           <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
//             <div className="mb-10">
//               <h2 className="text-3xl font-serif text-purple-800 mb-6 text-center">Choose Your Avatar</h2>
//               <Avatar selected={formData.avatar} onSelect={handleAvatarSelect} />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div className="relative">
//                 <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 pl-12 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   required
//                 />
//                 <Feather className="absolute left-4 top-11 text-gray-400" size={24} />
//               </div>
//               <div className="relative">
//                 <label htmlFor="gender" className="block text-lg font-medium text-gray-700 mb-2">Gender</label>
//                 <select
//                   id="gender"
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 pl-12 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   required
//                 >
//                   <option value="">Select gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//                 <Book className="absolute left-4 top-11 text-gray-400" size={24} />
//               </div>
//               <div className="relative">
//                 <label htmlFor="age" className="block text-lg font-medium text-gray-700 mb-2">Age</label>
//                 <input
//                   type="number"
//                   id="age"
//                   name="age"
//                   value={formData.age}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 pl-12 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   required
//                 />
//                 <Bookmark className="absolute left-4 top-11 text-gray-400" size={24} />
//               </div>
//               <div className="relative">
//                 <label htmlFor="favoriteGenre" className="block text-lg font-medium text-gray-700 mb-2">Favorite Genre</label>
//                 <input
//                   type="text"
//                   id="favoriteGenre"
//                   name="favoriteGenre"
//                   value={formData.favoriteGenre}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 pl-12 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   required
//                 />
//                 <Library className="absolute left-4 top-11 text-gray-400" size={24} />
//               </div>
//               <div className="relative">
//                 <label htmlFor="booksPerYear" className="block text-lg font-medium text-gray-700 mb-2">Books Read Per Year</label>
//                 <input
//                   type="number"
//                   id="booksPerYear"
//                   name="booksPerYear"
//                   value={formData.booksPerYear}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 pl-12 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   required
//                 />
//                 <Book className="absolute left-4 top-11 text-gray-400" size={24} />
//               </div>
//               <div className="relative">
//                 <label htmlFor="favoriteBook" className="block text-lg font-medium text-gray-700 mb-2">Favorite Book</label>
//                 <input
//                   type="text"
//                   id="favoriteBook"
//                   name="favoriteBook"
//                   value={formData.favoriteBook}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 pl-12 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   required
//                 />
//                 <Bookmark className="absolute left-4 top-11 text-gray-400" size={24} />
//               </div>
//             </div>
//             <div className="flex justify-center mt-10">
//               <button
//                 type="submit"
//                 className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xl font-semibold rounded-full shadow-md hover:opacity-90 transition-opacity"
//               >
//                 Begin Your Reading Adventure
//               </button>
//             </div>
//           </form>
          
//           {/* Decorative Elements */}
//           <div className="absolute top-0 right-0 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
//           <div className="absolute top-0 -left-4 w-88 h-88 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
//           <div className="absolute -bottom-8 left-20 w-88 h-88 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          
//           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//             <Book size={400} className="text-purple-100 opacity-20" />
//           </div>

//           {/* Book-themed decorative elements */}
//           <div className="absolute top-6 left-6 transform -rotate-12">
//             <Image src="/Book2.jpg" alt="Decorative Book" width={120} height={140}  className="blur-[3px]"/>
//           </div>
//           <div className="absolute bottom-6 right-6 transform rotate-6">
//             <Image src="/Book1.jpg" alt="Decorative Book" width={100} height={120}  className="blur-[3px]"/>
//           </div>
//           <div className="absolute bottom-2 left-6 transform -rotate-6">
//             <Image src="/Book5.jpg" alt="Decorative Book" width={100} height={120}  className="blur-[3px]"/>
//           </div>
//           <div className="absolute top-1/4 right-10 transform rotate-45">
//             <Feather size={50} className="text-purple-300 opacity-50" />
//           </div>
//           <div className="absolute bottom-1/4 left-10 transform -rotate-12">
//             <Bookmark size={50} className="text-blue-300 opacity-50" />
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Navbar from "../components/Navbar"
import Avatar from "../components/Avatar"
import { Book, Bookmark, Feather, Library } from "lucide-react"
import axios from "axios"

// Define Zod schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  gender: z.enum(["male", "female", "other"], { required_error: "Please select a gender" }),
  age: z.number().min(1, "Age must be at least 1").max(120, "Age must be less than 120"),
  favoriteGenre: z.string().min(1, "Favorite genre is required"),
  booksPerYear: z.number().min(0, "Books per year must be 0 or more"),
  favoriteBook: z.string().min(1, "Favorite book is required"),
  avatar: z.string(),
})

type FormData = z.infer<typeof formSchema>

export default function ProfilePage() {
  const [avatar, setAvatar] = useState("/avatars/book-lover.png")

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: "/avatars/book-lover.png",
    },
  })

  const handleAvatarSelect = (selectedAvatar: string) => {
    setAvatar(selectedAvatar)
    setValue("avatar", selectedAvatar)
  }

  const onSubmit = async (data: FormData) => {
    
    try {
      const response = await axios.patch("/api/profile", data)
      if(response.status === 200) {
        window.location.href = "/profile/user";
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
      <Navbar />
      <main className="ml-16 p-8 flex justify-center items-center min-h-screen">
        <div className="w-full max-w-5xl bg-white bg-opacity-80 backdrop-blur-md rounded-3xl shadow-2xl p-12 relative overflow-hidden">
          <h1 className="text-5xl font-serif text-purple-900 mb-8 text-center">Your Reading Journey</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
            <div className="mb-10">
              <h2 className="text-3xl font-serif text-purple-800 mb-6 text-center">Choose Your Avatar</h2>
              <Avatar selected={avatar} onSelect={handleAvatarSelect} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative">
                <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  {...register("name")}
                  className="w-full px-4 py-3 pl-12 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Feather className="absolute left-4 top-11 text-gray-400" size={24} />
                {errors.name && <p className="mt-1 text-red-500">{errors.name.message}</p>}
              </div>
              <div className="relative">
                <label htmlFor="gender" className="block text-lg font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  {...register("gender")}
                  className="w-full px-4 py-3 pl-12 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <Book className="absolute left-4 top-11 text-gray-400" size={24} />
                {errors.gender && <p className="mt-1 text-red-500">{errors.gender.message}</p>}
              </div>
              <div className="relative">
                <label htmlFor="age" className="block text-lg font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  {...register("age", { valueAsNumber: true })}
                  type="number"
                  className="w-full px-4 py-3 pl-12 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Bookmark className="absolute left-4 top-11 text-gray-400" size={24} />
                {errors.age && <p className="mt-1 text-red-500">{errors.age.message}</p>}
              </div>
              <div className="relative">
                <label htmlFor="favoriteGenre" className="block text-lg font-medium text-gray-700 mb-2">
                  Favorite Genre
                </label>
                <input
                  {...register("favoriteGenre")}
                  className="w-full px-4 py-3 pl-12 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Library className="absolute left-4 top-11 text-gray-400" size={24} />
                {errors.favoriteGenre && <p className="mt-1 text-red-500">{errors.favoriteGenre.message}</p>}
              </div>
              <div className="relative">
                <label htmlFor="booksPerYear" className="block text-lg font-medium text-gray-700 mb-2">
                  Books Read Per Year
                </label>
                <input
                  {...register("booksPerYear", { valueAsNumber: true })}
                  type="number"
                  className="w-full px-4 py-3 pl-12 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Book className="absolute left-4 top-11 text-gray-400" size={24} />
                {errors.booksPerYear && <p className="mt-1 text-red-500">{errors.booksPerYear.message}</p>}
              </div>
              <div className="relative">
                <label htmlFor="favoriteBook" className="block text-lg font-medium text-gray-700 mb-2">
                  Favorite Book
                </label>
                <input
                  {...register("favoriteBook")}
                  className="w-full px-4 py-3 pl-12 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Bookmark className="absolute left-4 top-11 text-gray-400" size={24} />
                {errors.favoriteBook && <p className="mt-1 text-red-500">{errors.favoriteBook.message}</p>}
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xl font-semibold rounded-full shadow-md hover:opacity-90 transition-opacity"
              >
                Begin Your Reading Adventure
              </button>
            </div>
          </form>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -left-4 w-88 h-88 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-88 h-88 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Book size={400} className="text-purple-100 opacity-20" />
          </div>

          {/* Book-themed decorative elements */}
          <div className="absolute top-6 left-6 transform -rotate-12">
            <Image src="/Book2.jpg" alt="Decorative Book" width={120} height={140} className="blur-[3px]" />
          </div>
          <div className="absolute bottom-6 right-6 transform rotate-6">
            <Image src="/Book1.jpg" alt="Decorative Book" width={100} height={120} className="blur-[3px]" />
          </div>
          <div className="absolute bottom-2 left-6 transform -rotate-6">
            <Image src="/Book5.jpg" alt="Decorative Book" width={100} height={120} className="blur-[3px]" />
          </div>
          <div className="absolute top-1/4 right-10 transform rotate-45">
            <Feather size={50} className="text-purple-300 opacity-50" />
          </div>
          <div className="absolute bottom-1/4 left-10 transform -rotate-12">
            <Bookmark size={50} className="text-blue-300 opacity-50" />
          </div>
        </div>
      </main>
    </div>
  )
}

