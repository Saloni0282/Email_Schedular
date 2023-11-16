const express = require('express');

require("dotenv").config();
const app = express();
app.use(express.json());
const bodyParser = require('body-parser');

const { connection } = require("./config/db")
const { Router } = require("./routes/user.routes")

app.use(bodyParser.json());

app.get("/", (req, res) => { 
    res.send("Welcome To EmailScheduler!!!!");
})

app.use("/",Router)


const port = process.env.port || 8080;
app.listen(port, async() => { 
    try {
        await connection;
        console.log('Connection established');
    } catch (error) {
        console.log("Connection error");
    }
    console.log(`Server is running on port ${port}`);
})