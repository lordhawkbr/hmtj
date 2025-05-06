const express = require("express")
const router = express.Router()
const pages = require("./content")

router.get("/", (req, res) => {
    res.render("main")
})

router.get("/page/:id", (req, res, next) => {
    const pageId = req.params.id;
    const page = pages.find(item => item.pageId === pageId);
    if (page) {
        res.render("page", { page });
    } else {
        res.status(404).send("page não encontrado");
    }
})

router.get("/unidades/:id", (req, res, next) => {
    const pageId = req.params.id;
    // const page = pageId ? pages.find(item => item.pageId === pageId) : false
    res.render(pageId != 0 ? "unidade" : "unidades");
})

router.get("/processo_seletivo/:id", (req, res, next) => {
    const pageId = req.params.id;
    // const page = pageId ? pages.find(item => item.pageId === pageId) : false
    res.render("processo_seletivo", {result: pages.processo_seletivo});
})

router.get("/especialidade/:id", (req, res, next) => {
    const especialidade = req.params.id;
    const page = pages.especialidades.find(item => item.pageId === especialidade);
    const randompages = pages.especialidades.sort(() => 0.5 - Math.random()).slice(0, 5).map(item => ({ title: item.title, pageId: item.pageId }));

    if (page) {
        res.render("especialidade", { page, randompages, especialidade });
    } else {
        res.status(404).send("page não encontrado");
    }
})

module.exports = router