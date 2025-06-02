const express = require("express")
const router = express.Router()

router.get("/post/create", (req, res) => {
    res.render("cms/body")
})

module.exports = router