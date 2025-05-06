const express = require('express')
const router = express.Router()
const {upload} = require("../services/upload")
const multer = require('multer')

router.post('/upload', (req, res)=>{
    upload.single('video')(req, res, function(err){

        if (err){
            if(err instanceof multer.MulterError){
                if(err.code == 'LIMIT_FILE_SIZE'){
                    return res.status(413).json({
                        success : false,
                        error : `File too large. Max size ${upload.limits.fileSize/(1024*1024)} MB`
                    })
                }else{
                    return res.status(400).json({
                        success : false,
                        error : `Upload error ${err.message}`
                    })
                }
            }
        }

        if(!req.file){
            return res.status(400).json({success : false, error : 'No File uploaded'})
        }
    
        res.json({
            success : true,
            filename : req.file.filename,
            fileSize : req.file.size / (1024 * 1024),
            path : `/upload/${req.file.filename}`
        })


    })
    
})

module.exports = router