require("dotenv").config();
const express = require("express");
const appServer = express();
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 7900;
const flash = require('connect-flash')
const categoryRoute=require('./router/categoryRouter');
const productRoute=require('./router/productRouter');

const session=require('express-session');       

appServer.set("view engine", "ejs");
appServer.set("views", "view");
appServer.use(
  express.urlencoded({
    extended: true,
  })
);

appServer.use(express.static(path.join(__dirname, "public")));
appServer.use(flash())
appServer.use(session({
	secret:'project-secret-key',
	resave:false,
	saveUninitialized:false}))  

appServer.use(categoryRoute);
appServer.use(productRoute);

appServer.use((req, res) => {
  res.send("<h1>PAGE  NOT FOUND!! Please recheck.</h1>");
});

mongoose
  .connect(process.env.DB_URL)
  .then((res) => {
    console.log("Database connected");
    appServer.listen(PORT, () => {
      console.log(`Server running at  http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log("Error to connect database", err));
