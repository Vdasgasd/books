import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-5xl font-medium mb-8 text-center text-black drop-shadow-lg">
          Basic Book Documentation
        </h1>

        <div className="flex justify-center space-x-6">
          <a href="/login">
            <button className="bg-blue-500 hover:bg-blue-700 text-white  px-8 py-3 rounded-lg">
              Login
            </button>
          </a>
          <a href="/register">
            <button className="bg-green-500 hover:bg-green-700 text-white  px-8 py-3 rounded-lg">
              Register
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
