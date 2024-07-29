const cookieParser = require("cookie-parser");
const dbgr = require("debug")("development: main_app");
const path = require("path");

const express = require("express");
const app = express();

const db = require("./config/mongooseConnection");

const productsRouter = require("./routes/productsRouter");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(port, function () {
  dbgr(`Server is listening on port ${port}`);
});
