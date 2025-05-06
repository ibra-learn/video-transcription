// src/server.js

const express = require('express');
const path = require('path');
const uploadRoutes = require('./routes/upload')
const playerRoutes = require('./routes/player')
const fs = require('graceful-fs')

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))
app.use(express.static('uploads')) // make uploads accessible




app.get('/', (req, res)=>{
    res.render('index', { title :'Video Transcription App'})
    //res.send('Video Transcription App is running!')
})

app.use(uploadRoutes)
app.use(playerRoutes)

app.get('/video/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '../uploads', filename);

    console.log('Attempting to stream:', filepath);
    
    // Check if file exists
    if (!fs.existsSync(filepath)) {
        console.log('File not found:', filepath);
      return res.status(404).send('File not found');
    }
    console.log('File exists, size:', fs.statSync(filepath).size);

    // Get file stats
    const stat = fs.statSync(filepath);
    const fileSize = stat.size;
    
    // Parse Range header if present
    const range = req.headers.range;
    
    if (range) {
      // Parse Range header value
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = (end - start) + 1;
      
      // Create read stream for the specific range
      const fileStream = fs.createReadStream(filepath, { start, end });
      
      // Set response headers
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4'
      });
      
      // Pipe the file stream to the response
      fileStream.pipe(res);
    } else {
      // Set headers for full file response
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4'
      });
      
      // Stream the entire file
      fs.createReadStream(filepath).pipe(res);
    }
  });

// we just export the app when testing
if(process.env.NODE_ENV !== 'test'){
    app.listen(PORT, ()=>{
        console.log(`Server running on http://localhost:${PORT}`)
    })
}

module.exports = app;