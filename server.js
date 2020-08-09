const express = require("express")
const db = require("./database")

const server = express();
server.use(express.json())

server.post("/api/users", (req, res) => {
    try{
    if(!req.body.name || !req.body.bio){
        res.status(404).json({
            errorMessage: "Please provide name and bio for the user."
        })
    } else{
    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio
    })
    res.status(201).json(newUser)
    }
    }
    catch{
        res.status(500).json({
            errorMessage: "There was an error while saving the user to the database"
        })
    }
})

server.get("/api/users", (req, res) => {
    //return an array of users
    try{
    const users = db.getUsers();
    res.json(users)
    }
    catch{
        res.status(500).json({
            errorMessage: "The users information could not be retrieved."
        })
    }
})

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const user = db.getUserById(id);
    try{
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    }
    catch{
        res.status(500).json({
            errorMessage: "The user information could not be retrieved." 
        })
    }
})

server.delete("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)
    try{
    if (user) {
        db.deleteUser(req.params.id)
        res.status(204).end()
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    }
    }
    catch{
        res.status(500).json({
            errorMessage: "The user could not be removed"
        })
    }

})

server.put("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)
    try {
        // throw new Error("error")

        if(!req.body.name || !req.body.bio){
            res.status(400).json({
                errorMessage: "Please provide name and bio for the user."
            })
    
        } else if(user) {
            const modUser = db.updateUser(req.params.id, req.body)

            res.status(200).json(modUser)
        } else {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        }

    } catch{
        res.status(500).json({
            errorMessage: "The user information could not be modified."
        })
    }
})

server.listen(8080, () => {
    console.log("Server started on port 8080")
})