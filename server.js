const express = require('express')
const path = require('path')
const cors = require('cors')
const axios = require('axios')
const PORT = process.env.PORT || 8000
const API_URL = 'https://dynasty-api.herokuapp.com' || 'http://localhost:5000'

const app = express()

// Middlewares | Functions
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// View | Template Engine 
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Configuration | Headers
const config = {
    headers: {
        'Accept': 'application/json'
    }
}

// Routes
app.get("/", async(req, res) => {
    try {
        let blogsFetched = await axios(`${API_URL}/api/blogs`, config)
        const blogs = blogsFetched.data
        res.render('index', {
            blogs: blogs
        })
    } catch (error) {
        console.log(error)
    }
})

app.get("/about", (req, res) => {
    try {
        res.render('about')
    } catch (error) {
        console.log(error.message)
    }
})

app.get("/contact", (req, res) => {
    try {
        res.render('contact')
    } catch (error) {
        console.log(error.message)
    }
})

app.get("/:id", async(req, res) => {
    try {
        let {
            id
        } = req.params
        let blog_Fetched = await axios(`${API_URL}/api/blogs/${id}`, config)
        const blog = blog_Fetched.data
        console.log(blog.title)
        res.render('post', {
            blog: blog
        })
    } catch (error) {
        console.log(error.message)
    }
})

app.listen(PORT, () => {
    console.log(`____________________________________________`)
    console.log(`Client services initiated on port: ${PORT}`)
    console.log(`____________________________________________`)
})
