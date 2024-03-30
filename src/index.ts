import  express from 'express';

const app = express()
const port = 3000;

import path from 'path'

app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname,'welcome.html'))
});

app.get('/video',)


app.listen(port,()=>{
    console.log(`Listening on port ${port} to: http://localhost:${port}/`)
});

