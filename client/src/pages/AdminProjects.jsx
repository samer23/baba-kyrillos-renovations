import { useEffect, useState, useRef, useCallback } from "react"

// Utility function to fetch projects
import fetchAdminProjects from "../utils/fetchAdminprojects"

export default function AdminProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [title, setTitle] = useState("")
  const [progress, setProgress] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [addNewProject, setAddNewProject] = useState("Add New Project")
  const [AddProject, setAddProject] = useState("Add Project")
  const [editProjectId, setEditProjectId] = useState(null)
  const [currProjInEdit, setCurrProjInEdit] = useState(null)
  const [disableEdit, setDisableEdit] = useState(false)

  // File ref for resetting file input
  const fileInputRef = useRef(null)

  // API URL from environment variables
  const API_URL = import.meta.env.VITE_API_URL

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true)
      setError("")

      const { success, projects, message } = await fetchAdminProjects(API_URL)

      if (!success) {
        throw new Error(message)
      }

      setProjects(projects)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [API_URL])

  // Getting the projects
  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  // Handle new project creation
  const handleAddSaveProject = async (e) => {
    e.preventDefault()

    if (editMode) {
      if (!progress || !title || !location || !description) return  
    } else {
      if (!image || !progress || !title || !location || !description) return
    }

    const formData = new FormData()
    formData.append("progress", progress)
    formData.append("title", title)
    formData.append("location", location)
    formData.append("description", description)
    formData.append("image", image)

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
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
        setImage(null)
        fileInputRef.current.value = null
        loadProjects()
        setDisableEdit(false)
        setCurrProjInEdit(null)
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
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
      const data = await res.json()
      
      if (!res.ok) {
        setError(data.message || "Failed to delete project")
      } else {
        loadProjects()
      }
    } catch {
      setError("Server error while deleting project")
    }
  }

  // Handle project editing
  const handleEdit = (_id) => {

    // If already in edit mode for the same project, reset the form
    if (_id === null) {
      // Reset the form fields
      setProgress("")
      setTitle("")
      setLocation("")
      setDescription("")

      // Remove the project ID being edited
      setEditProjectId(null)

      // Turn off edit mode
      setEditMode(false)

      // Change Add New Project to Add New Project
      setAddNewProject("Add New Project")

      // Change Add Project to Add Project
      setAddProject("Add Project")

      // Set current project in edit
      setCurrProjInEdit(null)

      // Enable buttons while not in edit mode
      setDisableEdit(false)

    } else {
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

      // Set current project in edit
      setCurrProjInEdit(projectToEdit.title)

      // Disable buttons while in edit mode
      setDisableEdit(true)
    }
  }

  // Handle log out
  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST"
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
          {currProjInEdit && <p className="text-sm text-gray-600 mb-2">Currently editing: <span className="font-medium">{currProjInEdit}</span></p>}
          {editMode && <button onClick={() => handleEdit(null)} className="text-md text-yellow-600">Cancel Edit</button>}
          {/* <input type="text" placeholder="Project Progress" value={progress} onChange={(e) => setProgress(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required/> */}
          <select value={progress} onChange={(e) => setProgress(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required>
            <option value="">Select progress</option>
            <option value="Planning Phase">Planning</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <input type="text" placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required/>
          <input type="text" placeholder="Project Location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required/>
          <textarea placeholder="Project Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required/>
          {editMode && <p className="text-sm text-gray-600 mb-2">If not updating project image, leave the "Choose Files" section blank</p>}
          {!editMode && <input type="file" ref={fileInputRef} multiple onChange={(e) => setImage(e.target.files[0])} className="w-full" required/>}
          {editMode && <input type="file" ref={fileInputRef} multiple onChange={(e) => setImage(e.target.files[0])} className="w-full"/>}
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">{AddProject}</button>
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
              <div key={project._id} className="bg-gray-200 rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
                <img src={`${API_URL}/uploads/${project.imagePath}`} alt={project.title} className="h-44 w-full object-contain bg-gray-200"/>

                <div className="p-5">
                  {/* Progress Badge */}
                  <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">{project.progress}</span>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 leading-tight mb-1">{project.title}</h3>

                  {/* Location */}
                  <p className="text-sm text-gray-500 mb-3">📍 {project.location}</p>

                  {/* Description */}
                  <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">{project.description}</p>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => handleEdit(project._id)} className={`${disableEdit ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"} flex-1 text-white text-sm py-2 rounded-lg transition`} disabled={disableEdit}>Edit</button>
                    <button onClick={() => handleDelete(project._id)} className={`${disableEdit ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"} flex-1 text-white text-sm py-2 rounded-lg transition`} disabled={disableEdit}>Delete</button>
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