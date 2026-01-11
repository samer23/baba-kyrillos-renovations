import { Routes, Route, BrowserRouter, HashRouter } from "react-router-dom"

// Import components
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"

// Import pages
import Home from './pages/Home.jsx'
import AboutUs from './pages/AboutUs.jsx'
import ContactUs from './pages/ContactUs.jsx'
import Faq from './pages/Faq.jsx'
import Projects from './pages/Projects.jsx'
import Services from './pages/Services.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsOfService from './pages/TermsOfService.jsx'
import NotFound from "./pages/NotFound.jsx"
import AdminLogin from "./pages/AdminLogin.jsx"
import AdminProjects from "./pages/AdminProjects.jsx"

function App() {
  return (
    <HashRouter>
      {/* App wrapper */}
      <div className="flex min-h-screen flex-col">
        <Header />

        {/* Main content grows to fill space */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/projects" element={<AdminProjects />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </HashRouter>
  )
}

export default App