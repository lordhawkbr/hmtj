const express = require("express")
const path = require("path")
const app = express()
const routers = require("./src/routes/router.js")
const cms = require("./src/routes/cms.js")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", [routers, cms])

app.listen(8080)