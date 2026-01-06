export default async function SubmitEmail (event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    formData.append("access_key", "7f93fc0b-33f6-4b54-ba81-67a98ef1459f")

    const object = Object.fromEntries(formData)
    const json = JSON.stringify(object)

    const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: json
    })

    // Parse JSON from the response
    const data = await res.json()

    if (data.success) {
        console.log("Success", data)
        alert("Your message has been sent successfully!")
    } else {
        console.error("Error submitting form", data)
    }

    // Reset the form
    event.target.reset()
}