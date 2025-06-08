const express = require("express")
const path = require("path")
const app = express()
const routers = require("./src/routes/router.js")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", [routers])
// app.use("/", postRouters)

app.listen(8080)