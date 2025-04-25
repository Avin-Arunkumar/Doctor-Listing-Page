import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-200 text-center p-4 mt-auto">
      <p>© {new Date().getFullYear()} Doctor Listing Page</p>
    </footer>
  );
}
