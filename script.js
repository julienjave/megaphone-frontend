const form = document.getElementById("new-post-form")
// const baseURL = `http://localhost:3000`
const baseURL = `https://megaphone-server-1.onrender.com`

const getPosts = async () => {
    const response = await fetch(`${baseURL}/posts`)
    const posts = await response.json()

    addPostsToPage(posts)
    return posts
}

const addPostsToPage = (posts) => {
    const allPosts = document.getElementById("all-posts")
    allPosts.innerHTML = ""

    posts.reverse().forEach(post => {
        const newListItem = document.createElement("li")
        newListItem.className = "post"
        const postBody = document.createElement("p")
        postBody.className = "post-body"
        const postMeta = document.createElement("div")
        postMeta.className = "post-meta"
        const usernameLabel = document.createElement("p")
        const timeLabel = document.createElement("p")
        const deleteButton = document.createElement("a")
        deleteButton.className = "delete-button"
        deleteButton.innerText = "❌"

        const secondsSincePosted = Math.round((Date.now() - post.timecreated) / 1000)
        
        let unitOfTime = "second"
        let numberOfUnits = secondsSincePosted

        if (numberOfUnits >= 60) {
            unitOfTime = `minute`
            numberOfUnits = Math.round(numberOfUnits / 60)
        }

        if (numberOfUnits >= 60) {
            unitOfTime = `hour`
            numberOfUnits = Math.round(numberOfUnits / 60)
        }

        if (numberOfUnits >= 24) {
            unitOfTime = `day`
            numberOfUnits = Math.round(numberOfUnits / 60)
        }

        postBody.innerText = post.body
        usernameLabel.innerText = post.author
        timeLabel.innerText = `posted ${numberOfUnits} ${unitOfTime}${numberOfUnits !== 1 ? "s" : ""} ago`

        postMeta.appendChild(usernameLabel)
        postMeta.appendChild(timeLabel)
        postMeta.appendChild(deleteButton)

        deleteButton.addEventListener("click", async () => {
            await fetch(
                `${baseURL}/posts/${post._id}`,
                { method: "DELETE" }
            )

            getPosts()
        })

        newListItem.appendChild(postBody)
        newListItem.appendChild(postMeta)

        allPosts.appendChild(newListItem)
    })
}

getPosts()

form.addEventListener("submit", async (event) => {
    event.preventDefault()

    await fetch(
        `${baseURL}/posts`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                body: form.elements.body.value,
                author: form.elements.user.value
            })
        }
    ).then((response) => {
        return response.json()
    })

    getPosts()
    form.reset()
})