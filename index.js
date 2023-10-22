const express = require("express")
const bodParser = require("body-parser")
const mongoose = require('mongoose')
const crypto = require("crypto")
const nodemailer = require("nodemailer")

const app = express()
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodParser.urlencoded({extended:false}));
app.use(bodParser.json());
app.set('view engine', 'ejs');


const jwt = require("jsonwebtoken");

mongoose.connect("mongodb+srv://wattoo:wattoo@cluster0.urc66im.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connect to mongoDB")
}).catch((err)=> {
    console.log("Error connecting to mongoDB", err)
})



// Define a Todo schema and model (in a separate file)
const Todo = require('./model');

// Routes (in a separate file)
const todoRoutes = require('./api');
app.use('/todos', todoRoutes);





app.listen(port, () => {
  console.log("Server is running on port 8000")
})

