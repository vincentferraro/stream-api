import  express from 'express';

const app = express()
const port = 3000;

import path from 'path'
import fs from 'fs';
app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname,'welcome.html'))
});

app.get('/video',(req, res)=>{
    const range = req.headers.range;
    if(!range){
        res.status(400).send('Requires range header')
    }
    const videoPath = "oldport.mp4";
    const videoSize = fs.statSync('oldport.mp4').size;

    const CHUNK_SIZE=10**6; // 1MB
    const start = Number(range?.replace(/\D/g, ""));

    const end = Math.min(start+CHUNK_SIZE, videoSize-1);
    const contentLength = end-start+1;
    const headers = {
        "Content-Range":`bytes${start}-${end}/${videoSize}`,
        "Accept-Range":"bytes",
        "Content-Length": contentLength,
        "Content-type":"video/mp4"
    }
    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(videoPath,{start, end})
    videoStream.pipe(res);
})


app.listen(port,()=>{
    console.log(`Listening on port ${port} to: http://localhost:${port}/`)
});

