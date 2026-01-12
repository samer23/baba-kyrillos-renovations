export default async function fetchAdminProjects(API_URL) {
    try {
        const res = await fetch(`${API_URL}/admin/get-projects`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })

        const data = await res.json()

        if (!res.ok) {
            return {success: false, projects: [], message: data.message || "Failed to fetch projects"}
        }
        else {
            return {success: true, projects: data.projects, message: data.message || "Projects fetched successfully"}
        }
    } catch {
        return {success: false, projects: [], message: "Server error while fetching projects"}
    }
}