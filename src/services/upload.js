const multer = require('multer')
const path = require('path')
const fs = require('graceful-fs')


// create upload directory if doesn't exist
const uploadDir = path.join(__dirname, '../../uploads');
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, {recursive : true})
}

//Configure storage

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, uploadDir)
    },
    filename : (req, file, cb) => {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniquePrefix + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb)=>{
    if (!file || !file.originalname) {
        return cb(new Error('Invalid File Object'))
    }

    const filetypes = /mp4|webm|avi|mp3/
    const mimetype = filetypes.test(file.mimetype)
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    if(mimetype && extname){
        return cb(null, true)
    }
    cb(new Error("Only mp4, webm, avi and mp3 allowed"))
}

const upload = multer({
    storage: storage,
    fileFilter : fileFilter,
    limits : { fileSize : 1 * 1024 * 1024} // limit 1000MB
})

module.exports = {upload} 