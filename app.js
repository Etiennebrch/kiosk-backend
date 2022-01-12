require("./models/db");

var fileUpload = require("express-fileupload");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var companiesRouter = require("./routes/companies");
var offersRouter = require("./routes/offers");
var conversationsRouter = require("./routes/conversations");
var rechercheRouter = require("./routes/recherche");
var quotationsRouter = require ("./routes/quotations")
var ratingsRouter = require("./routes/ratings")

var app = express();

app.use(fileUpload());

app.use(logger("dev"));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit:50000 }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/companies", companiesRouter);
app.use("/offers", offersRouter);
app.use("/conversations", conversationsRouter);
app.use("/recherche", rechercheRouter);
app.use("/quotations", quotationsRouter);
app.use("/ratings", ratingsRouter);
module.exports = app;
