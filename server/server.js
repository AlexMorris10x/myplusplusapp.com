if (process.env.NODE_ENV !== "production") {
  console.log("loading dev environments");
  require("dotenv").config();
}
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const dbConnection = require("./db");
const passport = require("./passport");
const app = express();
const PORT = process.env.PORT || 3001;
const helmet = require("helmet");
// const morgan = require("morgan");
// const path = require("path");

// MIDDLEWARE
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
app.use(helmet());

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());

// EXPRESS APP ROUTING
app.use("/auth", require("./routes/user"));
app.use("/todo", require("./routes/todo"));
app.use("/project", require("./routes/project"));

// PRODUCTION ENVIRONMENT
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

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

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../", "build", "index.html"));
//   });
// }

app.use(function(err, req, res, next) {
  console.log("====== ERROR =======");
  console.error(err.stack);
  res.status(500);
});

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
