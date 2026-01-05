import KitchenImage from "../assets/kitchen.jpg"
import BathroomImage from "../assets/bathroom.jpg"
import BasementImage from "../assets/basement.jpg"
import AdditionImage from "../assets/addition.jpg"

export default function Projects() {
  const projects = [
    {
      title: "Full Kitchen Renovation",
      location: "North York, ON",
      status: "In Progress",
      description:
        "Complete kitchen remodel including cabinetry, electrical, plumbing, and premium finishes.",
      image: KitchenImage,
    },
    {
      title: "Basement Finishing",
      location: "Vaughan, ON",
      status: "Near Completion",
      description:
        "Basement conversion into a modern living space with bathroom and custom lighting.",
      image: BasementImage,
    },
    {
      title: "Bathroom Remodel",
      location: "Scarborough, ON",
      status: "In Progress",
      description:
        "Full bathroom renovation featuring walk-in shower, tile work, and upgraded fixtures.",
      image: BathroomImage,
    },
    {
      title: "Home Addition",
      location: "Mississauga, ON",
      status: "Planning Phase",
      description:
        "Structural home addition including permits, foundation work, and framing.",
      image: AdditionImage,
    },
  ]

  const statusColors = {
    "Planning Phase": "bg-gray-200 text-gray-800",
    "In Progress": "bg-yellow-500 text-gray-900",
    "Near Completion": "bg-green-500 text-white",
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Current Projects
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A look at the renovation and construction projects we are currently
          working on across Toronto and the GTA.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            {/* Image */}
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-56 object-cover"
            />

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Status */}
              <span
                className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${statusColors[project.status]}`}
              >
                {project.status}
              </span>

              <h3 className="text-2xl font-semibold text-gray-900">
                {project.title}
              </h3>

              <p className="text-sm text-gray-500">{project.location}</p>

              <p className="text-gray-700 leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}