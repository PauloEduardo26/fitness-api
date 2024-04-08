const express = require("express");
const userRoutes = require("./src/user/Routes")

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("home")
})

app.use("/user/exercises", userRoutes);

app.listen(port, () => console.log(`Server running in http://localhost:${port}`))