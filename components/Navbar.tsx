import React from "react";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="bg-blue-950 text-white py-4 px-6 flex justify-between items-center">
      <Link href="/"><h1 className="text-xl font-bold">Todo App</h1></Link>
      <ul className="flex gap-6">
        <li className="hover:text-gray-400 transition-all cursor-pointer">Home</li>
        <li className="hover:text-gray-400 transition-all cursor-pointer">Products</li>
        <li className="hover:text-gray-400 transition-all cursor-pointer">About</li>
        <li className="hover:text-gray-400 transition-all cursor-pointer">Contact</li>
      </ul>
    </nav>
  );
};

export default Navbar;
