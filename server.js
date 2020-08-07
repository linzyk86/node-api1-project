const express = require("express")
const db = require("./database")

const server = express();

server.post("/api/users", (req, res)=>{
    const newUser = db.createUser({
        name: "Chloe White",
        bio: "I'm a dog. Woof."
    })
    res.status(201).json(newUser)
})

server.get("/api/users", (req, res)=>{
    //return an array of users
    const users = db.getUsers();
    res.json(users)

})

server.get("/api/users/:id", (req, res)=>{
    const id = req.params.id;
    const user = db.getUserById(id);
    if(user){
        res.json(user)
    }else {
        res.status(404).json({message: 'User not found'})
    }
})

server.delete("/api/users/:id", (req, res)=>{
    const user = db.getUserById(req.params.id)
    if(user){
        db.deleteUser(req.params.id)
    } else {
        res.status(404).json({
            message: "User not found"
        })
    }
    res.status(204).end()
})

server.put("/api/users/:id", (req, res)=>{
    const user = db.getUserById(req.params.id)
    if(user){
        db.updateUser(req.params.id)
    }else{
        res.status(404).json({
            message: "User not found"
        })
    }
    res.status(204).end()
})

server.listen(8080, ()=>{
    console.log("Server started on port 8080")
})