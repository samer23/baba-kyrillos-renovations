/* Structure of data.projects:
[
    {
        title: "Full Kitchen Renovation",
        location: "North York, ON",
        progress: "In Progress",
        description:
        "Complete kitchen remodel including cabinetry, electrical, plumbing, and premium finishes.",
        imagePath: KitchenImage
    },
    ...
]
*/

export default async function fetchProjects(API_URL) {
    try {
        const res = await fetch(`${API_URL}/projects/get-projects`, {
            method: "GET",
            credentials: "include"
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