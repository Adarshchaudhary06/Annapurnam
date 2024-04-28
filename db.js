const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const App = require('express')();
var http = require('http').Server(App);


const PORT = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://22mc3002:nq1ilpDuIr8n9Iiy@cluster0.pyk5vji.mongodb.net/7");
        console.log(`Connected to MongoDB`);
    } catch (error) {
        console.log(`Error in MongoDB ${error}`);
    }
};

connectDB();


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    Password: String
});


const user = mongoose.model("user", userSchema);


const foodSchema = new mongoose.Schema({
    name: String,
    ingredients: String,
    instructions: String
});
const food = mongoose.model("food", foodSchema);

app.post('/submitted', async(req,res)=>{
    let { name, ingredients, instructions, img} = req.body;
    console.log(name);
    const Recipe1 = new food({
        name: name,
        ingredients: ingredients,
        instructions: instructions
    });
    Recipe1.save();
    res.redirect("/submit")
});
app.get('/', (req, res) => {
    res.render("index");
});

app.get('/404', (req, res) => {
    res.render("404");
});


app.get('/about', (req, res) => {
    res.render("about");
});
app.get("/contact", (req, res) => {
    res.render("contact");
});
app.get("/contractor", (req, res) => {
    res.render("contractor");
});
app.get("/contributer", (ref, res) => {
    res.render("contributer");
});
app.get("/gallery", (req, res) => {
    res.render("gallery");
});
app.get("/icons", (req, res) => {
    res.render("icons");
});
app.get("/index", (req, res) => {
    res.render("index");
});
app.get("/login", (req, res) => {
    res.render("login");
});
app.get("/services", (req, res) => {
    res.render("services");
});
app.get("/signup", (req, res) => {
    res.render("signup");
});
app.get("/submit", (req, res) => {
    res.render("submit");
});
app.get("/typography", (req, res) => {
    res.render("typography");
});

app.get("/logout",(req,res)=>{
    res.render("login");
});

app.get("/Sign", (req, res) => {
    res.render("login", { user: req.user });
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.redirect("/");
    });
});

app.post("/Sign", async (req, res) => {
    let { name, email, password } = req.body;
    let user_email = await user.findOne({ email: email });
    if (user_email) {
        res.send("Email Id is already registered");
    } else {
        const User1 = new user({
            name: name,
            email: email,
            Password: password
        });
        User1.save();
    }
    EL = email;
    res.redirect("/home")
});



app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const foundUser = await user.findOne({ email: email });
    if (foundUser) {
        res.redirect("/home");
    } else {
        res.send("Invalid Credentials");
    }

    EL = email;
});

app.listen(PORT, () => {
    console.log(`Server Running on mode on port ${PORT}`);
});