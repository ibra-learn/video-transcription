// src/server.js

const express = require('express');
const path = require('path');
const uploadRoutes = require('./routes/upload')

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))
app.use(express.static('uploads')) // make uploads accessible

app.use(uploadRoutes)


app.get('/', (req, res)=>{
    res.render('index', { title :'Video Transcription App'})
    //res.send('Video Transcription App is running!')
})

// we just export the app when testing
if(process.env.NODE_ENV !== 'test'){
    app.listen(PORT, ()=>{
        console.log(`Server running on http://localhost:${PORT}`)
    })
}

module.exports = app;