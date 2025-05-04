const request = require('supertest')
const app = require('../src/server')

describe('Basic Express Server', ()=>{
    test('responds to root route', async ()=>{
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Video Transcription App')
    })
})