import React from "react";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[400px] flex flex-col justify-center items-center text-center text-white"
        style={{
          backgroundImage: `url('https://via.placeholder.com/1200x400?text=Weaving+Stories')`,
        }}
      >
        <div className="bg-black/50 absolute inset-0"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl font-bold mb-4">
            Weaving Stories, Preserving Culture
          </h1>
          <p className="max-w-2xl mx-auto mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate('/shop')} className="bg-[#5c1e1e] hover:bg-[#7a2a2a] text-white px-5 py-2 rounded-full">
              Shop Now
            </button>
            <button onClick={() => navigate('/stories')} className="bg-[#5c1e1e] hover:bg-[#7a2a2a] text-white px-5 py-2 rounded-full">
              Explore Stories
            </button>
            <button onClick={() => navigate('/support')} className="bg-[#5c1e1e] hover:bg-[#7a2a2a] text-white px-5 py-2 rounded-full">
              Support Weavers
            </button>
          </div>
        </div>
      </div>

      {/* Product Highlight */}
      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold text-[#5c1e1e] mb-8">
          Product Highlight
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-6">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              className="bg-gray-200 h-64 rounded-lg flex flex-col justify-end items-center p-4"
            >
              {/* Placeholder for image from DB */}
              <button className="bg-[#5c1e1e] hover:bg-[#7a2a2a] text-white px-4 py-2 rounded-full">
                View in Shop
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Explore More */}
      <section className="py-12 border-t text-center">
        <h2 className="text-2xl font-bold text-[#5c1e1e] mb-8">Explore More</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="bg-gray-200 rounded-lg p-6 flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  Icon
                </div>
                <h3 className="font-bold text-lg">Digital Storytelling</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <button className="bg-[#5c1e1e] hover:bg-[#7a2a2a] text-white px-4 py-2 rounded-full">
                Explore Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-lg text-[#5c1e1e] mb-3">Weavist</h4>
            <p className="text-gray-600">Connecting you with indigenous weavers. Quality handcrafts, fair trade.</p>
          </div>

          <div>
            <h5 className="font-semibold mb-3">Quick Links</h5>
            <ul className="space-y-2 text-gray-700">
              <li><a href="/shop" className="hover:underline">Shop</a></li>
              <li><a href="/stories" className="hover:underline">Weaving Stories</a></li>
              <li><a href="/support" className="hover:underline">Support Weavers</a></li>
              <li><a href="/profile" className="hover:underline">My Profile</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-3">Stay in touch</h5>
            <p className="text-gray-600 mb-3">Subscribe for updates and new collections.</p>
            <div className="flex gap-2">
              <input placeholder="Email address" className="border rounded-l px-3 py-2 w-full" />
              <button className="bg-[#5c1e1e] text-white px-4 py-2 rounded-r">Subscribe</button>
            </div>
            <div className="flex gap-3 mt-4">
              <a className="p-2 rounded-full border text-gray-700" aria-label="Website link" title="Website link">
                <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </a>
              <a className="p-2 rounded-full border text-gray-700" aria-label="Facebook" title="Facebook">
                <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12.07C22 6.49 17.52 2 11.94 2S2 6.49 2 12.07C2 17.06 5.66 21.16 10.44 21.88v-6.92H8.08v-2.89h2.36V9.88c0-2.33 1.39-3.61 3.52-3.61 1.02 0 2.09.18 2.09.18v2.3h-1.18c-1.16 0-1.52.72-1.52 1.46v1.76h2.59l-.41 2.89h-2.18v6.92C18.34 21.16 22 17.06 22 12.07z" />
                </svg>
              </a>
              <a className="p-2 rounded-full border text-gray-700" aria-label="Twitter" title="Twitter">
                <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.73 1.05 4.28 4.28 0 00-7.3 3.9A12.14 12.14 0 013 4.79a4.28 4.28 0 001.33 5.71c-.66-.02-1.28-.2-1.82-.5v.05a4.28 4.28 0 003.43 4.19c-.3.08-.62.12-.95.12-.23 0-.46-.02-.68-.06a4.29 4.29 0 004 2.97A8.6 8.6 0 012 19.54a12.13 12.13 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2l-.01-.56A8.7 8.7 0 0022.46 6z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t">
          <div className="container py-4 text-sm text-gray-600">© {new Date().getFullYear()} Weavist · All rights reserved</div>
        </div>
      </footer>
    </div>
  );
}
