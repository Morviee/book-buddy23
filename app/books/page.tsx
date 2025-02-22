import Navbar from "../components/Navbar";
import Image from "next/image";
import Link from "next/link";

const genres = [
  {
    name: "Fantasy",
    description: "Explore magical worlds and epic adventures.",
    image: "/Fantasy.jpg",
  },
  {
    name: "Mystery",
    description: "Dive into thrilling suspense and solve intriguing puzzles.",
    image: "/Mystery.jpg",
  },
  {
    name: "Romance",
    description: "Heartwarming tales of love and relationships.",
    image: "/Romance.jpg",
  },
  {
    name: "Sci-Fi",
    description: "Futuristic worlds and mind-bending technology.",
    image: "/sifi.png",
  },
  {
    name: "Horror",
    description: "Experience spine-chilling tales of fear and terror.",
    image: "/Horror.jpg",
  },
  {
    name: "Adventure",
    description: "Embark on journeys full of excitement and discovery.",
    image: "/Adventure.jpg",
  },
] as const;

const createSlug = (genreName: string) => {
  return genreName.toLowerCase().replace(/\s+/g, "-");
};

export default function Books() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 overflow-hidden relative">
      <Navbar />
      <main className="ml-16 p-8 flex flex-col items-center justify-center min-h-screen relative z-10">
        <h1 className="text-5xl font-serif text-purple-900 mb-8 text-center">
          Pick your genre and dive into it
        </h1>
        <p className="text-xl text-blue-800 mb-12 text-center max-w-2xl">
          Choose the genre and pick the book which matches your mood
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {genres.map((genre) => (
            <div
              key={genre.name}
              className="bg-white shadow-md rounded-lg p-6 hover:scale-105 transition-transform duration-300"
            >
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={genre.image}
                  alt={`${genre.name} Image`}
                  fill
                  className="rounded-t-lg object-cover"
                  priority
                />
              </div>
              <h3 className="text-lg font-bold text-purple-900 mb-2 text-center">{genre.name}</h3>
              <p className="text-sm text-gray-700 mb-4 text-center">{genre.description}</p>
              <div className="flex justify-center">
                <Link 
                  href={`/books/${createSlug(genre.name)}`}
                  className="bg-purple-700 text-white font-semibold px-5 py-2 rounded-full shadow-md hover:bg-purple-800 transition-colors duration-300"
                >
                  Explore →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}