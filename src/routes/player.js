const express = require("express")
const router = express.Router()
const path = require("path")
const fs = require("graceful-fs")

router.get('/player/:filename', (req, res)=>{
    const filename = req.params.filename

    res.render("player", {
        filename : filename
    })
})

module.exports = router