import { useState } from "react"
import { useLocation, Link } from "react-router-dom"

import logo from '../assets/logo.png'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    // { name: "Services", href: "/services" },
    { name: "FAQ", href: "/faq" },
    { name: "Projects", href: "/projects" },
    { name: "Contact Us", href: "/contact-us" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-gray-300 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-28 items-center py-6 lg:py-10 justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Solnik & Solnik" className="h-32 sm:h-36 md:h-44 lg:h-52 xl:h-50 w-auto object-contain mt-2"/>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 font-medium">
            <nav className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href} className={`transition ${location.pathname === link.href ? "text-yellow-500 border-b-2 border-yellow-500" : "text-white hover:text-yellow-500"}`}>{link.name}
                </Link>
              ))}
            </nav>

            {/* Contact Info */}
            <div className="ml-10 flex flex-col gap-1 text-sm">
              <a href="tel:+16475755272" className="flex items-center gap-2 text-white hover:text-yellow-500">
                {/* Phone SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1C10.07 22 2 13.93 2 3.5a1 1 0 0 1 1-1H6.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.01l-2.2 2.21z" />
                </svg>
                (647) 575-5272
              </a>

              <a href="mailto:jacobbeshara@outlook.com" className="flex items-center gap-2 text-white hover:text-yellow-500">
                {/* Mail SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                jacobbeshara@outlook.com
              </a>
            </div>
          </div>

          {/* Mobile Toggle Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 rounded-md text-white hover:bg-gray-800" aria-label="Toggle menu">
            {isOpen ? (
              /* Close (X) SVG */
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              /* Hamburger SVG */
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-white border-t border-gray-200 px-6 py-6 space-y-4 text-center font-medium">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} onClick={() => setIsOpen(false)} className={`block transition ${location.pathname === link.href ? "text-yellow-500" : "text-black hover:text-yellow-500"}`}>
                  {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Contact */}
          <div className="pt-4 border-t space-y-3 text-sm">
            <a href="tel:+16475755272" className="flex justify-center items-center gap-2 text-black">
              {/* Phone SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1C10.07 22 2 13.93 2 3.5a1 1 0 0 1 1-1H6.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.01l-2.2 2.21z" />
              </svg>
              (647) 575-5272
            </a>
            <a href="mailto:jacobbeshara@outlook.com" className="flex justify-center items-center gap-2 text-black">
              {/* Mail SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              jacobbeshara@outlook.com
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}