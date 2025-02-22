// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { motion } from "framer-motion"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import * as z from "zod"
// import { BookOpen, LogIn, UserPlus } from "lucide-react"
// import Navbar from "../components/Navbar"
// import axios from "axios"

// const signInSchema = z.object({
//   email: z.string().email({ message: "Invalid email address" }),
//   password: z.string().min(6, { message: "Password must be at least 6 characters" }),
// })

// const signUpSchema = z.object({
//   name: z.string().min(2, { message: "Name must be at least 2 characters" }),
//   email: z.string().email({ message: "Invalid email address" }),
//   password: z.string().min(6, { message: "Password must be at least 6 characters" }),
// })

// type SignInValues = z.infer<typeof signInSchema>
// type SignUpValues = z.infer<typeof signUpSchema>

// const AuthPage: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin")
//   const router = useRouter()

//   const signInForm = useForm<SignInValues>({
//     resolver: zodResolver(signInSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   })

//   const signUpForm = useForm<SignUpValues>({
//     resolver: zodResolver(signUpSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//   })

//   const onSignInSubmit = async (values: SignInValues) => {
//     try {
//       const response = await axios.post('/api/profile', values);
     

//       if(response.status === 200) {
//         router.push("/");
//       }

//     } catch (error) {
      
//     }
   
//   }

//   const onSignUpSubmit = async (values: SignUpValues) => {
//     try {
//       const response = await axios.post('/api/signup', values);
  
//       if (response.status === 201) {
//         router.push("/"); 
//       }
  
//     } catch (error) {
//       console.error("Error during sign-up:", error);
//     }
//   };
  

//   return (
//     <>
//     <Navbar/>
//     <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-md w-full"
//       >
//         <div className="text-center mb-8">
//           <BookOpen className="mx-auto h-12 w-12 text-purple-600" />
//           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome to BookBuddy</h2>
//           <p className="mt-2 text-sm text-gray-600">Your personal reading companion</p>
//         </div>
//         <div className="bg-white shadow-md rounded-lg overflow-hidden">
//           <div className="p-6">
//             <h3 className="text-xl font-semibold text-gray-900 mb-4">Authentication</h3>
//             <p className="text-sm text-gray-600 mb-6">Sign in to your account or create a new one.</p>
//             <div className="flex mb-6">
//               <button
//                 className={`flex-1 py-2 text-center ${activeTab === "signin" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"}`}
//                 onClick={() => setActiveTab("signin")}
//               >
//                 Sign In
//               </button>
//               <button
//                 className={`flex-1 py-2 text-center ${activeTab === "signup" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"}`}
//                 onClick={() => setActiveTab("signup")}
//               >
//                 Sign Up
//               </button>
//             </div>
//             {activeTab === "signin" ? (
//               <form onSubmit={signInForm.handleSubmit(onSignInSubmit)} className="space-y-4">
//                 <div>
//                   <label htmlFor="signin-email" className="block text-sm font-medium text-gray-700">
//                     Email
//                   </label>
//                   <input
//                     id="signin-email"
//                     type="email"
//                     {...signInForm.register("email")}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
//                     placeholder="m@example.com"
//                   />
//                   {signInForm.formState.errors.email && (
//                     <p className="mt-1 text-sm text-red-600">{signInForm.formState.errors.email.message}</p>
//                   )}
//                 </div>
//                 <div>
//                   <label htmlFor="signin-password" className="block text-sm font-medium text-gray-700">
//                     Password
//                   </label>
//                   <input
//                     id="signin-password"
//                     type="password"
//                     {...signInForm.register("password")}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
//                   />
//                   {signInForm.formState.errors.password && (
//                     <p className="mt-1 text-sm text-red-600">{signInForm.formState.errors.password.message}</p>
//                   )}
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
//                 >
//                   <LogIn className="mr-2 h-4 w-4" /> Sign In
//                 </button>
//               </form>
//             ) : (
//               <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="space-y-4">
//                 <div>
//                   <label htmlFor="signup-name" className="block text-sm font-medium text-gray-700">
//                     Name
//                   </label>
//                   <input
//                     id="signup-name"
//                     type="text"
//                     {...signUpForm.register("name")}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
//                     placeholder="John Doe"
//                   />
//                   {signUpForm.formState.errors.name && (
//                     <p className="mt-1 text-sm text-red-600">{signUpForm.formState.errors.name.message}</p>
//                   )}
//                 </div>
//                 <div>
//                   <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">
//                     Email
//                   </label>
//                   <input
//                     id="signup-email"
//                     type="email"
//                     {...signUpForm.register("email")}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
//                     placeholder="m@example.com"
//                   />
//                   {signUpForm.formState.errors.email && (
//                     <p className="mt-1 text-sm text-red-600">{signUpForm.formState.errors.email.message}</p>
//                   )}
//                 </div>
//                 <div>
//                   <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">
//                     Password
//                   </label>
//                   <input
//                     id="signup-password"
//                     type="password"
//                     {...signUpForm.register("password")}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
//                   />
//                   {signUpForm.formState.errors.password && (
//                     <p className="mt-1 text-sm text-red-600">{signUpForm.formState.errors.password.message}</p>
//                   )}
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
//                 >
//                   <UserPlus className="mr-2 h-4 w-4" /> Sign Up
//                 </button>
//               </form>
//             )}
//           </div>
//           <div className="px-6 py-4 bg-gray-50 text-center">
//             <p className="text-sm text-gray-600">
//               By signing in or signing up, you agree to our{" "}
//               <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
//                 Terms of Service
//               </a>{" "}
//               and{" "}
//               <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
//                 Privacy Policy
//               </a>
//               .
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//     </>
//   )
// }

// export default AuthPage

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { BookOpen, LogIn, UserPlus } from "lucide-react"
import Navbar from "../components/Navbar"
import axios from "axios"

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

type SignInValues = z.infer<typeof signInSchema>
type SignUpValues = z.infer<typeof signUpSchema>

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin")
  const router = useRouter()

  // // Check if the user is already logged in
  // useEffect(() => {
  //   const token = localStorage.getItem("authToken") // Or use cookies
  //   if (token) {
  //     router.push("/") // Redirect to home page if logged in
  //   }
  // }, [router])

  const signInForm = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const signUpForm = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSignInSubmit = async (values: SignInValues) => {
    try {
      const response = await axios.post("/api/signin", values)

      if (response.status === 200) {
        // Store the authentication token
        localStorage.setItem("authToken", response.data.token) // Adjust based on your API response
        router.push("/") // Redirect to home page after successful sign-in
      }
    } catch (error) {
      console.error("Error during sign-in:", error)
    }
  }

  const onSignUpSubmit = async (values: SignUpValues) => {
    try {
      const response = await axios.post("/api/profile", values)

      if (response.status === 201) {
        // Store the authentication token
        localStorage.setItem("authToken", response.data.token) // Adjust based on your API response
        router.push("/") // Redirect to home page after successful sign-up
      }
    } catch (error) {
      console.error("Error during sign-up:", error)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <div className="text-center mb-8">
            <BookOpen className="mx-auto h-12 w-12 text-purple-600" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome to BookBuddy</h2>
            <p className="mt-2 text-sm text-gray-600">Your personal reading companion</p>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Authentication</h3>
              <p className="text-sm text-gray-600 mb-6">Sign in to your account or create a new one.</p>
              <div className="flex mb-6">
                <button
                  className={`flex-1 py-2 text-center ${activeTab === "signin" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"}`}
                  onClick={() => setActiveTab("signin")}
                >
                  Sign In
                </button>
                <button
                  className={`flex-1 py-2 text-center ${activeTab === "signup" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"}`}
                  onClick={() => setActiveTab("signup")}
                >
                  Sign Up
                </button>
              </div>
              {activeTab === "signin" ? (
                <form onSubmit={signInForm.handleSubmit(onSignInSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="signin-email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      id="signin-email"
                      type="email"
                      {...signInForm.register("email")}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      placeholder="m@example.com"
                    />
                    {signInForm.formState.errors.email && (
                      <p className="mt-1 text-sm text-red-600">{signInForm.formState.errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="signin-password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      id="signin-password"
                      type="password"
                      {...signInForm.register("password")}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    />
                    {signInForm.formState.errors.password && (
                      <p className="mt-1 text-sm text-red-600">{signInForm.formState.errors.password.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    <LogIn className="mr-2 h-4 w-4" /> Sign In
                  </button>
                </form>
              ) : (
                <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="signup-name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      id="signup-name"
                      type="text"
                      {...signUpForm.register("name")}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      placeholder="John Doe"
                    />
                    {signUpForm.formState.errors.name && (
                      <p className="mt-1 text-sm text-red-600">{signUpForm.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      id="signup-email"
                      type="email"
                      {...signUpForm.register("email")}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      placeholder="m@example.com"
                    />
                    {signUpForm.formState.errors.email && (
                      <p className="mt-1 text-sm text-red-600">{signUpForm.formState.errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      id="signup-password"
                      type="password"
                      {...signUpForm.register("password")}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    />
                    {signUpForm.formState.errors.password && (
                      <p className="mt-1 text-sm text-red-600">{signUpForm.formState.errors.password.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                  </button>
                </form>
              )}
            </div>
            <div className="px-6 py-4 bg-gray-50 text-center">
              <p className="text-sm text-gray-600">
                By signing in or signing up, you agree to our{" "}
                <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default AuthPage