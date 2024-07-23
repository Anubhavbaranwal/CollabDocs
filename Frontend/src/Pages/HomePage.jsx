import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">CollabDocs</h1>
          <div>
            <Link href="/login" className="mr-4 hover:underline">Login</Link>
            <Link href="/signup" className="hover:underline">Sign Up</Link>
          </div>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to CollabDocs</h2>
          <p className="text-lg mb-8">
            Collaborate on documents in real-time with your team. Create, edit, and manage your documents seamlessly.
          </p>
          <div>
            <Link to="/document/create" className="bg-blue-600 text-white px-4 py-2 rounded mr-4 hover:bg-blue-700">
              Create New Document
            </Link>
            <Link to="/login" className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white">
              Login
            </Link>
          </div>
        </div>
      </main>
      <footer className="bg-blue-600 text-white text-center p-4">
        © 2024 CollabDocs
      </footer>
    </div>
  );
}

export default Homepage;
