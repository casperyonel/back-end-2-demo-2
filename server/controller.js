const movies = require('./db.json')
let globalID = 11
// we start with 11, since it's the next object container in the db.json

module.exports = {
    getMovies: (req, res) => {
        res.status(200).send(movies)
    },
    deleteMovie: (req, res) => {
        let index = movies.findIndex(elem => elem.id === +req.params.id)
        // jumping into db.json, and finding the movie, or index, and comparing the id of each index to the id of what was passed in (req.params.id) 
        // and then + makes sure what was passed in was a number.
        movies.splice(index, 1)
        // Deletes that movie
        res.status(200).send(movies)
        // we send it back so that we get an updated list of movies on our homepage
    },
    createMovie: (req, res) => {
        let {title, rating, imageURL} = req.body
        // we went to front end to see how they're sending us the object, ID is missing because the user isn't going to supply us the ID. 
        // these need to be the same as what the frontend is sending us!!!
        let newMovie = {
            id: globalID,
            title, 
            rating, 
            imageURL
            // this is making a key with its value assigned to it. Same thing as title: title, etc.
         }    
    movies.push(newMovie)
    res.status(200).send(movies)
    // sending all of the movies back to the frontend, not just newMovie, because movies ALREADY contains that!
    globalID++
    // increments our global ID, so no longer 11, now 12. In real world access greatest ID via database
    }, 
    updateMovie: (req, res) => {
        let {id} = req.params
        // this is due to baseURL / ID
        let {type} = req.body
        // based on main.js and how it's supplied
        //line 12 on mian.js, takes a id and type (which will be a body)
        let index = movies.findIndex(elem => elem.id === +id)
        // Going to check every object.id in our movies database to find it and set it to index var
        // Diff than earlier because we didn't destructure
        console.log(index)

        if (movies[index].rating === 5 && type === "plus") {
            res.status(400).send("Cannot go above 5")
        } else if (movies[index].rating === 0 && type === "minus") {
            res.status(400).send("Cannot go below 0")
        } else if (type === "plus") {
            movies[index].rating++
            res.status(200).send(movies)
        } else if (type === "minus") {
            movies[index].rating--
            res.status(200).send(movies)
        } 
        // .rating coming from database, type is plus or minus button, if we click it the front end sends "plus", minus clicked it sends "minus"
        // If at zero shoulnd't be able to go below zero, if above 5 shouldn't be able to go above for hwne they click those buttons + -, these are our EDGE CASES

        }
}