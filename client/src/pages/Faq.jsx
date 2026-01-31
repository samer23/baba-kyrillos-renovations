import { useState } from "react"
import { Link } from "react-router-dom"

const faqs = [
  {
    question: "What renovation services do you offer in Toronto and the GTA?",
    answer:
      "Baba Kyrillos Renovations provides residential renovation services throughout Toronto and the Greater Toronto Area (GTA), including kitchen renovations, bathroom remodels, basement finishing, home additions, structural work, flooring, drywall, and general home improvements.",
  },
  {
    question: "Do you offer free renovation estimates in Toronto?",
    answer:
      "Yes. We offer free initial consultations and renovation estimates across Toronto and the GTA. All estimates are non-binding and may change based on site conditions, material selections, permit requirements, and project scope.",
  },
  {
    question: "Are you licensed and insured to work in Ontario?",
    answer:
      "Yes. Baba Kyrillos Renovations is fully licensed and insured to operate in Ontario and complies with provincial and municipal regulations. Proof of insurance is available upon request.",
  },
  {
    question: "Do you handle building permits in Toronto?",
    answer:
      "Yes. When required, we handle building permits through the City of Toronto or the appropriate GTA municipality. Permit requirements depend on the type of work, such as structural changes, basement renovations, or home additions.",
  },
  {
    question: "How long does a typical renovation take?",
    answer:
      "Timelines vary depending on the scope of work, permit approvals, inspections, and material availability. We provide an estimated timeline before work begins and keep you informed throughout the renovation.",
  },
  {
    question: "Do you provide written contracts?",
    answer:
      "Yes. All renovation projects are governed by a written contract outlining the scope of work, pricing, payment schedule, and estimated timeline, in accordance with Ontario consumer protection standards.",
  },
  {
    question: "How do payments work?",
    answer:
      "Payment schedules are clearly outlined in the contract and typically include an initial deposit followed by progress payments. Final payment is due upon substantial completion of the project.",
  },
  {
    question: "Can changes be made after the renovation starts?",
    answer:
      "Yes. Any changes are handled through written change orders. Changes to scope or materials may affect pricing and timelines and must be approved before additional work is performed.",
  },
  {
    question: "Do you offer emergency renovation or repair services?",
    answer:
      "Yes. Baba Kyrillos Renovations offers emergency renovation and repair services across Toronto and the GTA for urgent issues such as water damage, structural concerns, or time-sensitive repairs. Please call us directly for immediate assistance.",
  },
  {
    question: "How do I get started?",
    answer:
      "You can get started by contacting us through our website or calling us directly at 647-575-5272 to request a free estimate.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // FAQ Schema for Google
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  }

  return (
    <>
      {/* FAQ SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="text-center max-w-4xl mx-auto px-4 py-16 text-gray-800">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Renovation FAQs – Toronto & GTA
        </h1>
        <p className="text-gray-600 mb-10">
          Answers to common questions about residential renovations in Toronto
          and the Greater Toronto Area. Emergency services are available.
        </p>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center text-left px-5 py-4 bg-white hover:bg-gray-50 focus:outline-none"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-gray-900">
                  {faq.question}
                </span>
                <span className="ml-4 text-xl font-bold text-gray-500">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-5 pb-4 text-gray-700">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden sm:block mt-16 bg-gray-900 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Serving Toronto & the GTA
          </h2>
          <p className="text-gray-300 mb-6">
            Request a free renovation estimate or contact us for emergency
            repairs.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/contact-us" className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">Request a Free Estimate</Link>
            <a
              href="tel:6475755272"
              className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition"
            >
              Call 647-575-5272
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 bg-gray-900 text-white px-4 py-3 flex gap-3 z-50">
        <a
          href="tel:6475755272"
          className="flex-1 text-center bg-white text-gray-900 font-semibold py-2 rounded-lg"
        >
          Call Now
        </a>
        <Link to="/contact-us" className="flex-1 text-center border border-white font-semibold py-2 rounded-lg">Free Estimate</Link>
      </div>
    </>
  )
}