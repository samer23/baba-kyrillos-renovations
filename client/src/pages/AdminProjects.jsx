import { useEffect, useState } from "react"

export default function AdminProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])

  const API_URL = import.meta.env.VITE_API_URL

  // Fetch all projects
  const fetchProjects = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`${API_URL}/api/projects`, {
        credentials: "include",
      })
      const data = await res.json()
      if (!res.ok) setError(data.message || "Failed to fetch projects")
      else setProjects(data)
    } catch {
      setError("Server error while fetching projects")
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  // Handle new project creation
  const handleAddProject = async (e) => {
    e.preventDefault()
    if (!title || !description) return

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    for (const img of images) {
      formData.append("images", img)
    }

    try {
      const res = await fetch(`${API_URL}/api/projects`, {
        method: "POST",
        credentials: "include",
        body: formData,
      })

      const data = await res.json()
      if (!res.ok) setError(data.message || "Failed to add project")
      else {
        setTitle("")
        setDescription("")
        setImages([])
        fetchProjects()
      }
    } catch {
      setError("Server error while adding project")
    }
  }

  // Handle project deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return

    try {
      const res = await fetch(`${API_URL}/api/projects/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
      const data = await res.json()
      if (!res.ok) setError(data.message || "Failed to delete project")
      else fetchProjects()
    } catch {
      setError("Server error while deleting project")
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Projects Dashboard</h1>

      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}

      {/* Add Project Form */}
      <form
        onSubmit={handleAddProject}
        className="mb-8 bg-white p-6 rounded-xl shadow space-y-4"
      >
        <h2 className="text-xl font-semibold mb-2">Add New Project</h2>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="file"
          multiple
          onChange={(e) => setImages(Array.from(e.target.files))}
          className="w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Add Project
        </button>
      </form>

      {/* Projects List */}
      <h2 className="text-2xl font-semibold mb-4">Current Projects</h2>
      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project._id} className="bg-white p-4 rounded-xl shadow">
              {project.images && project.images.length > 0 && (
                <img
                  src={`${API_URL}${project.images[0]}`}
                  alt={project.title}
                  className="h-40 w-full object-cover rounded mb-2"
                />
              )}
              <h3 className="font-bold text-lg">{project.title}</h3>
              <p className="text-gray-600 mb-2">{project.description}</p>
              <div className="flex gap-2 mt-2">
                {/* Edit button (optional, implement editing later) */}
                <button
                  className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(project._id)}
                  className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}