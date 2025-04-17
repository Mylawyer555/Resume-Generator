import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-white">iCRAFT</h2>
          <p className="mt-3 text-sm">
            Build a resume that gets you hired. Choose from expert-designed templates and land your dream job today.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-400 transition">Resume Builder</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Cover Letter</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Templates</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Pricing</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-400 transition">FAQs</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Contact Us</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Help Center</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Subscribe to our Newsletter</h3>
          <p className="text-sm mb-4">Get career tips, resume advice, and special offers directly to your inbox.</p>
          <div className="flex">
            <input type="email" placeholder="Enter your email" className="px-4 py-2 w-full rounded-l-md border-none outline-none text-gray-900" />
            <button className="bg-yellow-500 px-4 py-2 rounded-r-md text-white hover:bg-yellow-600 transition">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
        <p>© {new Date().getFullYear()} iCRAFT. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
