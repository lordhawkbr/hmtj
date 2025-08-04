const express = require("express")
const path = require("path")
const fs = require("fs")
const router = express.Router()
const pages = require("./content")

router.get("/unidade/:id?", (req, res) => {
    const unidadeId = parseInt(req.params.id);
    const unidadeData = pages.unidades.find(item => item.unidade === unidadeId);
    const editaisData = pages.editais.filter(item => item.unidade === unidadeId);
    const transparenciaData = pages.transparencia.filter(item => item.unidade === unidadeId);

    if (!unidadeData) {
        return res.redirect("/");
    }
    res.render("unidade", { unidade: unidadeData, editais: editaisData, transparencia: transparenciaData });
});

router.get("/page/:id", (req, res, next) => {
    const pageId = req.params.id;
    const page = pages.conteudo.find(item => item.pageId === pageId);
    if (page) {
        res.render("page", { page });
    } else {
        res.status(404).send("page não encontrado");
    }
})

router.get("/:id?", (req, res) => {
    const page = req.params.id;

    if (!page) {
        const unidadesData = pages.unidades;
        return res.render("main", { unidades: unidadesData });
    }

    const viewPath = path.join(__dirname, "..", "views", `${page}.ejs`);
    fs.access(viewPath, fs.constants.F_OK, (err) => {
        if (err) {
            res.redirect("/");
        } else {
            if (page === "unidades") {
                const unidadesData = pages.unidades;
                const ufUnidades = Array.from(new Set(unidadesData.map(item => item.uf)));
                res.render(page, { unidadesData, ufUnidades });
            } else {
                res.render(page);
            }
        }
    });
});

router.get("/processo_seletivo/:id", (req, res, next) => {
    const id = req.params.id;
    const edital = pages.editais.find(item => item.id == id);

    if (edital) {
        res.render("processo_seletivo", { edital });
    } else {
        res.redirect("/");
    }
})

router.get("/especialidade/:id", (req, res, next) => {
    const especialidade = req.params.id;
    const page = pages.especialidades.find(item => item.pageId === especialidade);
    const randompages = pages.especialidades.sort(() => 0.5 - Math.random()).slice(0, 5).map(item => ({ title: item.title, pageId: item.pageId }));

    if (page) {
        res.render("especialidade", { page, randompages, especialidade });
    } else {
        res.redirect("/");
    }
})

module.exports = router