const request = require('supertest')
const app = require('../../src/server')
const fs = require('graceful-fs')
const path = require('path')
const { text } = require('stream/consumers')


describe('File upload', ()=>{

    const testVideoPath = path.join(__dirname, 'test-video.mp4')

    beforeAll(()=>{
        if(!fs.existsSync(testVideoPath)){
            const buffer = Buffer.alloc(1024)
            fs.writeFileSync(testVideoPath, buffer)
            console.log(`Test file created at : ${testVideoPath}`)
        }else{
            console.log(`File already exists at : ${testVideoPath}`)
        }
    })


    test('should upload a video file', async()=>{
        console.log(`Before Test : File exists ${fs.existsSync(testVideoPath)}`)
        
        const response  = await request(app)
        .post('/upload')
        .attach('video', testVideoPath)

        expect(response.status).toBe(200)
        expect(response.body.success).toBe(true)
        expect(response.body.filename).toBeDefined()
    })

    afterAll(()=>{
        if(fs.existsSync(testVideoPath)){
            fs.unlinkSync(testVideoPath)
        }
    })
})