require("dotenv").config();

const dbgr = require("debug")("development: main_app");
const cookieParser = require("cookie-parser");
const path = require("path");

const expressSession = require("express-session");
const flash = require("connect-flash");

const express = require("express");
const app = express();

const productsRouter = require("./routes/productsRouter");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const indexRouter = require("./routes/index");

const db = require("./config/mongooseConnection");

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(flash());

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/owners", ownersRouter);
app.use("/products", productsRouter);

app.listen(port, function () {
  dbgr(`Server is listening on port ${port}`);
});
