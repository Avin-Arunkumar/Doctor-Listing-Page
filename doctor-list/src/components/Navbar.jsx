import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto">
        <Link to="/" className="text-xl font-bold">
          Doctor Listing
        </Link>
      </div>
    </nav>
  );
}
