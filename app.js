const express = require('express')

const router = require('./router.js')
const config = require('./config.js')

const app = express()

// 导入并配置cors中间件， 解决跨域
const cors = require('cors')
app.use(cors())

router.use(express.static('./public'))

app.use(express.json())

app.use(router)

app.listen(config.port,() =>{
    console.log('程序正在',config.port,'端口上运行')
})