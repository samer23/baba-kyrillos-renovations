import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        
        {/* Top section */}
        <div className="grid gap-8 md:grid-cols-3">

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-white">Follow Us</h4>
            <div className="mt-3 flex space-x-4">
              {/* <a href="" target="_blank" className="social-icon" aria-label="Twitter">
                <svg className="text-blue-900 hover:text-yellow-500 transition h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.5 3.5a1 1 0 0 0-1.414 0L12 11.586 3.914 3.5a1 1 0 1 0-1.414 1.414L10.586 13l-8.086 8.086a1 1 0 1 0 1.414 1.414L12 14.414l8.086 8.086a1 1 0 0 0 1.414-1.414L13.414 13l8.086-8.086a1 1 0 0 0 0-1.414z"/>
                </svg>
              </a>
              <a href="" className="social-icon" target="_blank" aria-label="linkedIn">
                <svg className="text-blue-900 hover:text-yellow-500 transition h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.5c0-1.38-.03-3.16-1.92-3.16-1.92 0-2.21 1.5-2.21 3.06v5.6h-3v-10h2.88v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6v5.6z"/>
                </svg>
              </a> */}
              <a href="https://www.instagram.com/jacobbeshara/?hl=af" target="_blank" rel="noopener noreferrer">
                <svg className="text-white hover:text-yellow-500 transition h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.31.975.975 1.248 2.242 1.31 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608-.058-1.266-.069-1.646-.069-4.85s.012-3.584.07-4.85c.062-1.366.336-2.633 1.31-3.608.975-.975 2.242-1.248 3.608-1.31 1.266-.058 1.646-.069 4.85-.069zm0-2.163c-3.259 0-3.667.013-4.947.072-1.513.07-2.861.354-3.91 1.404-1.048 1.048-1.334 2.396-1.404 3.91-.059 1.28-.072 1.688-.072 4.947s.013 3.667.072 4.947c.07 1.513.354 2.861 1.404 3.91 1.048 1.048 2.396 1.334 3.91 1.404 1.28.059 1.688.072 4.947.072s3.667-.013 4.947-.072c1.513-.07 2.861-.354 3.91-1.404 1.048-1.048 1.334-2.396 1.404-3.91.059-1.28.072-1.688.072-4.947s-.013-3.667-.072-4.947c-.07-1.513-.354-2.861-1.404-3.91-1.048-1.048-2.396-1.334-3.91-1.404-1.28-.059-1.688-.072-4.947-.072zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.879 1.44 1.44 0 0 0 0-2.879z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <ul className="mt-3 space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-white hover:text-yellow-500 transition footer-link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-white hover:text-yellow-500 transition footer-link">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Bottom */}
          <div className="pt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Baba Kyrillos Renovations Inc. All rights reserved.
            Website by <a href="https://www.linkedin.com/in/samerharten/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-yellow-500 transition">Samer Harten</a>.
          </div>
        </div>
      </div>
    </footer>
  )
}