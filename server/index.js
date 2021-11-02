const express = require('express')
const cors = require('cors')

const app = express()

const {getMovies, deleteMovie, createMovie, updateMovie} = require('./controller.js')
// destructuring our functions and connecting it to controller.js file

app.use(cors())
app.use(express.json())



app.get("/api/movies", getMovies)
app.delete("/api/movies/:id", deleteMovie)
// use param because we're referencing that key, or movie!
app.post("/api/movies", createMovie)
// using body because we're creating the key
app.put("/api/movies/:id", updateMovie)
// you can have same params as another one, like .delete



let SERVER_PORT = 4004
app.listen(SERVER_PORT, () => {
    console.log(`Server is up on port ${SERVER_PORT}`)
})






