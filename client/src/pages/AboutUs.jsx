import CEOImage from "../assets/ceo.jpg"

export default function AboutUs() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-gray-800 space-y-16">
      {/* Page Header */}
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About Baba Kyrillos Renovations
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Providing top-quality residential renovations across Toronto and the Greater Toronto Area with professionalism, integrity, and a focus on client satisfaction.
        </p>
      </header>

      {/* Why Choose Us Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Why Choose Us
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Fully licensed and insured professional general contractor in Ontario.</li>
          <li>7+ years of experience delivering high-quality renovations for Toronto and GTA homeowners.</li>
          <li>Transparent pricing, clear timelines, and professional project management.</li>
          <li>Commitment to craftsmanship, safety, and attention to detail.</li>
          <li>Emergency renovation services for urgent situations.</li>
        </ul>
      </section>

      {/* Types of Residential Work Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Residential Renovation Services
        </h2>
        <p className="text-gray-700">
          Baba Kyrillos Renovations specializes in transforming homes across Toronto and the GTA. Our services include:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Kitchen renovations and modernizations</li>
          <li>Bathroom remodels, including luxury and accessible designs</li>
          <li>Basement finishing and basement-to-living-space conversions</li>
          <li>Home additions and structural improvements</li>
          <li>Flooring, drywall, framing, and general home improvements</li>
        </ul>
      </section>

      {/* Licensing & Professionalism */}
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Fully Licensed and Professional
        </h2>
        <p className="text-gray-700">
          Baba Kyrillos Renovations is a fully licensed general contractor in Ontario, compliant with all municipal and provincial regulations. Our team is insured, experienced, and dedicated to delivering exceptional residential renovations with integrity and safety at the forefront.
        </p>
      </section>

      {/* CEO Photo + Mission Section */}
      <section className="flex flex-col md:flex-row items-center md:items-start md:space-x-8 space-y-6 md:space-y-0">
        <div className="flex-shrink-0">
          <img
            src={CEOImage}
            alt="CEO of Baba Kyrillos Renovations"
            className="w-64 h-64 object-cover rounded-xl shadow-lg"
          />
        </div>
        <div className="flex-1 text-gray-700 space-y-4">
          <h2 className="text-3xl font-semibold text-gray-900">
            Message from Our CEO
          </h2>
          <p>
            At Baba Kyrillos Renovations, our mission is to transform homes while maintaining the highest standards of quality, professionalism, and integrity. We are committed to exceeding client expectations, building long-term relationships, and ensuring every project is completed on time and on budget.
          </p>
          <p>
            Our goal is simple: to provide Toronto and GTA homeowners with exceptional residential renovations that enhance comfort, functionality, and style. Every decision we make is guided by honesty, transparency, and a dedication to craftsmanship.
          </p>
          <p>
            We take pride in our work, our team, and the trust our clients place in us. Your home is our canvas, and we approach every project with the care and attention it deserves.
          </p>
        </div>
      </section>
    </div>
  )
}