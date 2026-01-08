import { useEffect, useState } from "react"

export default function AdminProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [title, setTitle] = useState("")
  const [progress, setProgress] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [addNewProject, setAddNewProject] = useState("Add New Project")
  const [AddProject, setAddProject] = useState("Add Project")
  const [editProjectId, setEditProjectId] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL

  // Fetch all projects
  const fetchProjects = async () => {
    setLoading(true)
    setError("")

    try {
      const res = await fetch(`${API_URL}/admin/get-projects`, {
        method: "GET",
        credentials: "include"
      })
      const data = await res.json()
      console.log('data: ', data)

      if (!res.ok) {
        setError(data.message || "Failed to fetch projects")
      }
      else {
        setProjects(data.projects)
      }
    } catch {
      setError("Server error while fetching projects")
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  // Handle new project creation
  const handleAddSaveProject = async (e) => {
    e.preventDefault()

    if (!progress || !title || !location || !description) return

    const formData = new FormData()
    formData.append("progress", progress)
    formData.append("title", title)
    formData.append("location", location)
    formData.append("description", description)

    for (const img of images) {
      formData.append("images", img)
    }

    try {
      // Create a variable to hold the action type
      let action = ""
      let method = "POST"

      // Check if the form is in edit mode or add mode
      if (editMode) {
        // Edit a project
        action = "update-project"

        // Set method to PUT
        method = "PUT"

        // Add the _id to the form data
        formData.append("_id", editProjectId)

        // Reset the edit project ID
        setEditProjectId(null)

        // Turn off edit mode
        setEditMode(false)
      } else {
        // Add new project
        action = "add-project"
      }

      const res = await fetch(`${API_URL}/admin/${action}`, {
        method: method,
        credentials: "include",
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Failed to update project")
      } else {
        setTitle("")
        setProgress("")
        setLocation("")
        setDescription("")
        setImages([])
        fetchProjects()
      }
    } catch {
      setError("Server error while adding project")
    }
  }

  // Handle project deletion
  const handleDelete = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return

    try {
      const res = await fetch(`${API_URL}/admin/remove-project/${_id}`, {
        method: "DELETE",
        credentials: "include",
      })
      const data = await res.json()
      
      if (!res.ok) {
        setError(data.message || "Failed to delete project")
      } else {
        fetchProjects()
      }
    } catch {
      setError("Server error while deleting project")
    }
  }

  // Handle project editing
  const handleEdit = (_id) => {

    // Get the project to be edited
    const projectToEdit = projects.find((proj) => proj._id === _id)
    if (!projectToEdit) return

    // Load the existing project data into the form for editing
    setProgress(projectToEdit.progress)
    setTitle(projectToEdit.title)
    setLocation(projectToEdit.location)
    setDescription(projectToEdit.description)

    // Store the project ID being edited
    setEditProjectId(_id)

    // Set edit mode
    setEditMode(true)

    // Change Add New Project to Edit Project
    setAddNewProject("Edit Project")

    // Change Add Project to Save Changes
    setAddProject("Save Changes")
  }

  // Handle log out
  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      })
      window.location.href = "/admin/login"
    } catch {
      setError("Server error while logging out")
    }
  }

  return (
    <>
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      {!error && <div className="min-h-screen p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Admin Projects Dashboard</h1>
        <button onClick={handleLogout} className="mb-6 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">Logout</button>

        {/* Add Project Form */}
        <form onSubmit={handleAddSaveProject} className="mb-8 bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-xl font-semibold mb-2">{addNewProject}</h2>
          <input
            type="text"
            placeholder="Project Progress"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Project Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
            {AddProject}
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
              <div
                key={project._id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
              >
                {project.images && project.images.length > 0 && (
                  <img
                    src={`${API_URL}${project.images[0]}`}
                    alt={project.title}
                    className="h-44 w-full object-cover"
                  />
                )}

                <div className="p-5">
                  {/* Progress Badge */}
                  <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                    {project.progress}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 leading-tight mb-1">
                    {project.title}
                  </h3>

                  {/* Location */}
                  <p className="text-sm text-gray-500 mb-3">
                    📍 {project.location}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(project._id)}
                      className="flex-1 bg-yellow-500 text-white text-sm py-2 rounded-lg hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(project._id)}
                      className="flex-1 bg-red-600 text-white text-sm py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>}
    </>
  )
}