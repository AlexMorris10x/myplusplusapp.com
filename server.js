// Loading evnironmental variables here
if (process.env.NODE_ENV !== "production") {
  console.log("loading dev environments");
  require("dotenv").config();
}
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
// const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const dbConnection = require("./db");
// loads our connection to the mongo database
const passport = require("./passport");
const app = express();
const PORT = process.env.PORT || 8080;
// const path = require("path");

// ===== Middleware ====
// app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.APP_SECRET || "mysupersecretsecret",
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false
  })
);

// ===== Passport ====
app.use(passport.initialize());
app.use(passport.session()); // will call the deserializeUser

/* Express app ROUTING */
app.use("/auth", require("./auth"));
app.use("/todo", require("./todo"));
app.use("/project", require("./project"));

// // ==== if its production environment!
// if (process.env.NODE_ENV === "production") {
//   const path = require("path");
//   console.log("YOU ARE IN THE PRODUCTION ENV");
//   app.use(
//     "/static",
//     express.static(path.join(__dirname, "client/build/static"))
//   );
//   app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "client/build"));
//   });
// }

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    // relative path
  });
}

// ==== if its production environment!
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../", "build", "index.html"));
//   });
// }

// ====== Error handler ====
app.use(function(err, req, res, next) {
  console.log("====== ERROR =======");
  console.error(err.stack);
  res.status(500);
});
// ==== Starting Server =====
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
