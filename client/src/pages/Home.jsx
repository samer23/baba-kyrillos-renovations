import KitchenImage from "../assets/kitchen.jpg"
import BathroomImage from "../assets/bathroom.jpg"
import BasementImage from "../assets/basement.jpg"
import AdditionImage from "../assets/addition.jpg"

export default function Home() {
  const services = [
    {
      title: "Kitchen Renovations",
      description:
        "Modernize and transform your kitchen with expert design and quality craftsmanship, tailored for Toronto and GTA homes.",
      image: KitchenImage,
    },
    {
      title: "Bathroom Remodels",
      description:
        "Upgrade your bathroom with functional layouts, luxury finishes, and accessible designs.",
      image: BathroomImage,
    },
    {
      title: "Basement Finishing",
      description:
        "Convert your basement into a comfortable living space, home office, or entertainment area.",
      image: BasementImage,
    },
    {
      title: "Home Additions & Structural Work",
      description:
        "Expand your home safely and efficiently with licensed general contractor expertise.",
      image: AdditionImage,
    },
  ]

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-5xl font-bold leading-tight">
              Baba Kyrillos Renovations
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              Transforming homes across Toronto and the GTA with professional
              residential renovations. Fully licensed, insured, and dedicated
              to quality and integrity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <a
                href="/contact-us"
                className="bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition"
              >
                Request a Free Estimate
              </a>
              <a
                href="tel:6475755272"
                className="border border-yellow-500 text-yellow-500 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition"
              >
                Call 647-575-5272
              </a>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 md:ml-6">
            <img
              src={KitchenImage}
              alt="Renovated kitchen"
              className="rounded-xl shadow-lg w-full h-60 sm:h-72 md:h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-6xl mx-auto px-4 space-y-12">
        <h2 className="text-4xl font-bold text-gray-900 text-center">
          Our Residential Renovation Services
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto">
          Baba Kyrillos Renovations specializes in high-quality residential
          renovation projects across Toronto and the GTA. From concept to
          completion, we deliver craftsmanship and professionalism on every job.
        </p>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 mt-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-700">{service.description}</p>
                <a
                  href="/contact-us"
                  className="inline-block text-yellow-500 font-semibold hover:underline"
                >
                  Request a Free Estimate
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}