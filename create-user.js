// User creation logic

const form = document.getElementById('new-user-form')
const baseURL = `https://megaphone-server-1.onrender.com`
const statusMessage = document.getElementById('status-message')

form.addEventListener("submit", async (event) => {
    event.preventDefault() // prevents the default event

    const username = form.elements.username.value // because the input has a name
    const password = form.elements.password.value

    const response = await fetch (`${baseURL}/users`, {
        method: 'POST', 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: username,
            password: password
        })
    })

    if (!response.ok) {
        console.log("Failed to create user.")
        statusMessage.innerText = `User could not be created.`
        return false
    }

    const user = await response.json()
    statusMessage.innerText = `User ${username} successfully created.`
    form.reset()
})