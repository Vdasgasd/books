import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Basic Book Documentation",
  description: "Book documentation with some CRUD",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="csrf-token" content="{{ csrf_token() }}" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
