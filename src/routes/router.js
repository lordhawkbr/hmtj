const express = require("express")
const router = express.Router()
const conteudo = require("./content")

router.get("/", (req, res) => {
    res.render("main")
})

router.get("/posts/:id", (req, res, next) => {
    const postId = req.params.id;
    const post = conteudo.find(item => item.id === postId);  // Encontrar o post correspondente

    if (post) {
        res.render("post", { post });
    } else {
        res.status(404).send("Post não encontrado");
    }
})

module.exports = router