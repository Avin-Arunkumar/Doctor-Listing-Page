import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
        © {new Date().getFullYear()} Doctor Listing App
      </div>
    </footer>
  );
}

export default Footer;
