import React from "react";

export default function Footer() {
  return (
    <footer className="mt-8 border-t p-4 text-center text-xs text-gray-500">
      © {new Date().getFullYear()} Portfolio
    </footer>
  );
}
