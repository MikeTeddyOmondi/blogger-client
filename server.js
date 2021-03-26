const express = require('express')
const path = require('path')
const cors = require('cors')
const PORT = process.env.PORT || 8080

const app = express()

// Middlewares | Functions
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
    console.log(`__________________________`)
    console.log(`Server listening: ${PORT}`)
    console.log(`__________________________`)
})