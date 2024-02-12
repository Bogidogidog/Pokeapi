const express = require('express');
const usersRouter = require("./router/routerUsers")
const cors = require('cors');
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.text())
app.use(cors());

app.get("/", (req, res) => {
    res.send("hello world")
})
app.use("/api/users", usersRouter)

app.listen(port,()=> {
    console.log(`listening on port ${port}`)
})