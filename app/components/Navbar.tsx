import Link from 'next/link';
import { Home, Book, Search, User,MessageCircle, LogIn } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed left-0 top-0 h-full w-20 bg-violet-950 flex flex-col items-center py-2">
      <div className="mt-auto mb-auto flex flex-col items-center gap-8">
        <Link href="/" className="text-white hover:text-gray-300">
          <Home size={24} />
        </Link>
        <Link href="/books" className="text-white hover:text-gray-300">
          <Book size={24} />
        </Link>
        <Link href="/search" className="text-white hover:text-gray-300">
          <Search size={24} />
        </Link>
        <Link href="/profile" className="text-white hover:text-gray-300">
          <User size={24} />
        </Link>
        <Link href="/chatbot" className="text-white hover:text-gray-300">
        <MessageCircle size={24} />
        </Link>
        <Link href="/auth" className="text-white hover:text-gray-300">
        <LogIn size={24} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

