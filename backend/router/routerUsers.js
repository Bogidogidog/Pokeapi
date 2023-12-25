const usersRouter = require("express").Router();
const {v4: uuidv4}= require("uuid")
const fileReader = require("../util/fileReader");
const path = require("path");
const fileWriter = require("../util/fileWriter");

let localUsers = 
    JSON.parse(fileReader(path.join(__dirname, "../db/users.json"))) ?? [];

/*
users.{
    id,
    name,
    username,
    age,
    gender,
    password,
    pokedex,
    pokemons
}
*/

usersRouter.post("/login", async (req, res) => {
    const user = localUsers.find(
        (user)=>
            user.username === req.body.username &&
            user.password === req.body.password
    );
    if (user) {
        res.json(user)
    }else {
        res.status(401).json({message:"Invalid username or password"})
    }
})

usersRouter.post("/register", async (req, res) => {
	const user = {
		id: uuidv4(),
		name: req.body.name,
        username: req.body.username,
        age: req.body.age,
        gender: req.body.gender,
		password: req.body.password,
        pokedex: [],
        pokemons: [],
	};
	localUsers.push(user);
	fileWriter(
		path.join(__dirname, "../db/users.json"),
		JSON.stringify(localUsers, null, 2)
	);

	res.json(user);
});

usersRouter.get("/:id/profile", (req, res) => {
	const user = localUsers.find((user) => user.id === req.params.id);
	
	if (user) {
		res.json(user);
	} else {
		res.status(404).json({ message: "User not found" });
	}
});

usersRouter.post("/:id/pokedex", (req, res) => {
    const userIndex = localUsers.findIndex((user) => user.id === req.params.id);
    if(userIndex !== -1){
        localUsers[userIndex].pokedex.push(req.body);
        fileWriter(
            path.join(__dirname,"../db/users.json"),
            JSON.stringify(localUsers, null, 2)
        );
        res.json(localUsers[userIndex])   
    } else {
        res.status(404).json({ message: "user not found"})
    }
})

usersRouter.post("/:id/pokemons", (req, res) => {
    const userIndex = localUsers.findIndex((user) => user.id === req.params.id);
    if(userIndex !== -1){
        localUsers[userIndex].pokemons.push(req.body);
        fileWriter(
            path.join(__dirname,"../db/users.json"),
            JSON.stringify(localUsers, null, 2)
        );
        res.json(localUsers[userIndex])   
    } else {
        res.status(404).json({ message: "user not found"})
    }
})

module.exports = usersRouter