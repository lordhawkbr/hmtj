const express = require("express")
const path = require("path")
const fs = require("fs")
const router = express.Router()
const pages = require("./content")

router.get("/cms", (req, res) => {
    res.render("cms");
});

module.exports = router