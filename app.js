const express = require('express')
const router = require('./router.js')
const config = require('./config.js')

const app = express()

app.use(express.json())

app.use(router)

app.listen(config.port,() =>{
    console.log('程序正在',config.port,'端口上运行')
})