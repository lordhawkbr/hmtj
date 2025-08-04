const panels = document.querySelectorAll("[data-value]")

const resetVisiblity = () => {
    panels.forEach(e => {
        !e.classList.contains("fs-display-none") ? e.classList.add("fs-display-none") : false
        e.querySelectorAll(".form-control").forEach(ee => ee.value = "")
    })
}

const changeTipoPub = (that) => {
    resetVisiblity()
    const thatPanel = document.querySelector(`[data-value="${that.value}"]`)
    if (thatPanel) {
        thatPanel.classList.remove("fs-display-none")
    }
}