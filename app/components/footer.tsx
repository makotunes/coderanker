import { Link } from "@remix-run/react";
import { Building } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
            <img
                src="/coderanker.logo.png"
                alt="Code Ranker Logo"
                className="w-8 h-8 rounded-lg object-contain bg-gradient-to-br"
              />
              <h3 className="text-xl font-bold">
                <Link
                  to="/"
                  className="text-2xl font-bold"
                  style={{ color: "#5874A8" }}
                >
                  Code Ranker
                </Link>
              </h3>
            </div>
            <p className="text-gray-400">
              In the AI era, we realize a new style of engineering organization where technological innovation and human growth go hand in hand.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Organization</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="https://www.versefactory.ai" className="hover:text-white">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/docs" className="hover:text-white">Guidelines</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              {/* <li><Link to="/help" className="hover:text-white">Help</Link></li> */}
            </ul>
          </div>
          {/* <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/privacy" className="hover:text-white">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms of Use</Link></li>
              <li><Link to="/security" className="hover:text-white">Security</Link></li>
            </ul>
          </div> */}
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Versefactory.AI, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 