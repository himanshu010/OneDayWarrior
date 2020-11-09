const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const hbs = require("hbs");
const path = require("path");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT;
console.log(port);
//defining paths for handlebars
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
// const imagesPath = path.join(viewPath, "images");
// const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars
app.set("view engine", "hbs");
app.set("views", viewPath);
// hbs.registerPartials(partialsPath);

//seting up static files. So that
//we don't have to give location
//of whole file present in public folder
app.use(express.static(publicDirectoryPath));
// app.use(express.static(imagesPath));
app.use(express.urlencoded());
app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.get("/", async (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log("Server listening on " + port);
});

// const bcrypt = require("bcryptjs");

// const myfunction = async () => {
//   const password = "Red1234@322";
//   const hashedPassword = await bcrypt.hash(password, 8);
//   console.log(password);
//   console.log(hashedPassword);

//   const isMatch = await bcrypt.compare("Red1234@322", hashedPassword);
//   console.log(isMatch);
// };

// myfunction();
