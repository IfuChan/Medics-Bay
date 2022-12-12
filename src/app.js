require('dotenv').config();

const express = require("express");
const cookieParser = require("cookie-parser");
const hbs = require("hbs")
const morgan = require("morgan");

const routes = require("./routes");
const { isAuthenticated } = require("./middleware/auth.middleware");

require("./db/conn");
const app = express();

//get user details in json(2), for cookies(3rd)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Path setting for Image, css and js
app.use('/static', express.static("public"));

//template engine (hbs)
app.set('view engine', 'hbs')
app.set("views", "views")
hbs.registerPartials("views/partials");

app.use(morgan("dev"));
app.use('/', isAuthenticated, routes);

app.listen(process.env.PORT | 3000, () => {
    console.log("Server Start");
});