const express = require('express')
const { updateGPTConfig } = require('./API/ChatGPT')
const { updateXunfeiConfig } = require('./API/xunfei')
const sqlite3 = require('sqlite3')
const jsonwebtoken = require('jsonwebtoken')
const path = require('path')
const secretKey = 'co666'
const {
    wxlogin,
    Status,
    User,
    setWx,
    stopWx,
    loadConfigValues
} = require('./wechat/main')

//sqlite数据库路径
let sqliteDbPath = "./db/data.db"
//打开数据库
var db = new sqlite3.Database(sqliteDbPath)

const router = express.Router()

router.use(express.static('./public'))

// 定义中间件.unless指定哪些接口不需要进行token身份认证
const { expressjwt: jwt } = require("express-jwt")
const checkTokenMiddleware = jwt({ secret: secretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/userlogin/, /^\/register/, /^\/getavatar/],
})

// 验证token
const errorcheckToken = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.send({ status: 401, msg: '请先登录' })
    }
    res.send({ status: 500, msg: '未知错误' })
}

// 封装验证Token和错误处理的函数
const checkToken = (req, res, next) => {
    checkTokenMiddleware(req, res, (err) => {
        if (err) {
            errorcheckToken(err, req, res, next)
        } else {
            next()
        }
    })
}

router.use(checkToken)

//用户登录
router.post('/userlogin', (req, res) => {
    var username = req.body.username
    var password = req.body.password

    // 匹配密码
    db.all('select * from user where username=?', username, function (err, row) {
        if (err) res.send({ status: 500, msg: "数据库查询失败" })
        else {
            if (row == "") {
                res.send({ status: 500, msg: "此用户不存在" })
            } else {
                if (row[0].password != password) {
                    res.send({ status: 500, msg: "密码错误" })
                } else {
                    // 如果用户名存在且密码匹配，则登录成功。
                    const tokenStr = jsonwebtoken.sign({ username: username }, secretKey, { expiresIn: '24h' })
                    res.send({ status: 200, msg: "登录成功", token: "Bearer " + tokenStr })
                }
            }
        }
    })
})

//更改账户信息

function findusername(req, res, next) {
    // 从请求头中获取 Token
    const token = req.headers['authorization']
    jsonwebtoken.verify(token.split(' ')[1], secretKey, (err, decoded) => {
        if (err) {
            return res.send({ status: 401, msg: 'Token无效' })
        } else {
            req.username = decoded.username
            next()
        }
    })
}

router.post('/getusername', findusername,(req,res) => {
    const username = req.username
    res.send({status: 200,msg:username})
})

router.post('/changeaccount', findusername, (req, res) => {
    const username = req.username
    const oldpassword = req.body.oldpassword
    const newusername = req.body.newusername
    const newpassword = req.body.newpassword
    // 查询用户是否存在以及旧密码是否正确
    db.get('SELECT * FROM user WHERE username=? AND password=?', [username, oldpassword], (err, row) => {
        if (err) {
            res.send({ status: 500, msg: "数据库查询失败" })
        } else {
            if (!row) {
                res.send({ status: 500, msg: "用户名或密码错误" })
            } else {
                if (newusername.length<5){
                    res.send({ status: 500, msg: "用户名不能小于5位" })
                }   else {
                    if (newpassword.length<6){
                        res.send({ status: 500, msg: "密码不能小于6位" })
                    }   else    {
                        // 更新用户名和密码
                        db.run('UPDATE user SET username=?, password=? WHERE username=?', [newusername, newpassword, username], (err) => {
                            if (err) {
                                res.send({ status: 500, msg: "更新账户信息失败" })
                            } else {
                                res.send({ status: 200, msg: "账户信息更新成功" })

                            }
                        })
                    }
                }
            }
        }
    })
})

//获取二维码 启动bot
router.get('/getqrcode',async(req,res) => {
    wxlogin()
        .then(qrcodeUrl =>{
            res.send({ qrcode: qrcodeUrl })
    })
})

// 发送头像图片文件
router.get('/getavatar',async(req,res) => {
    try {
        const avatarFilePath = path.join(__dirname,'./wechat/avatar/avatar.jpg')
        res.sendFile(avatarFilePath)
    } catch(error) {
        res.send({status:500,msg:'获取头像失败！' + error.message})
    }
})

router.get('/getwxname', async (req, res) => {
    res.send({ wxname: User.name })
})

//获取二维码状态
router.get('/getstatus',async(req,res) => {
    res.send({status:Status.status})
})

// 停止机器人
router.get('/stop', async (req, res) => {
    try {
        stopWx()
        res.send({ Status: 200, msg: '停止机器人成功' })
    } catch (error) {
        res.send({ Status: 500, msg: '停止机器人失败' + error })
    }
})

router.post('/getgptconfig', async (req, res) => {
    db.all('SELECT * FROM gptconfig', [], (err, rows) => {
        if (err) {
            res.send({ status: 500, msg: '查询失败！' })
            return
        }
        res.send({ status: 200, msg: rows })
    })
})

router.post('/getxfconfig', async (req, res) => {
    db.all('SELECT * FROM xfconfig', [], (err, rows) => {
        if (err) {
            res.send({ status: 500, msg: '查询失败！' })
            return
        }
        res.send({ status: 200, msg: rows })
    })
})

router.post('/gptconfig',async(req,res) => {
    const { apiKey,apiUrl,app_code,model } = req.body
    try {
        updateGPTConfig("apiKey", apiKey)
        updateGPTConfig("apiUrl", apiUrl)
        updateGPTConfig("app_code", app_code)
        updateGPTConfig("model",model)
        res.send({status: 200,msg: '设置成功!'})
    } catch (error) {
        res.send({status: 500, msg: '设置失败!'})
    }
})

router.post('/xfconfig', async (req, res) => {
    const { temperature, max_tokens, app_id, APIKey, APISecret, APIUrl, domain } = req.body
    try {
        updateXunfeiConfig("temperature", temperature)
        updateXunfeiConfig("max_tokens", max_tokens)
        updateXunfeiConfig("app_id", app_id)
        updateXunfeiConfig("APIKey", APIKey)
        updateXunfeiConfig("APISecret", APISecret)
        updateXunfeiConfig("APIUrl", APIUrl)
        updateXunfeiConfig("domain", domain)
        res.send({ status: 200, msg: '设置成功!' })
    } catch (error) {
        res.send({ status: 500, msg: '设置失败!' })
    }
})

//获取机器人设置
router.post('/getwxconfig', async (req, res) => {
    db.all('SELECT * FROM wxconfig', [], (err, rows) => {
        if (err) {
            res.send({ status: 500, msg: '查询失败！' })
            return
        }
        res.send({ status: 200, msg: rows })
    })
})

//设置微信机器人
router.post('/wxconfig', async (req, res) => {
    const { autoReplySingle, suffix, prefix, atReply, keyWords, blackName, whiteRoom ,usemodel} = req.body
    try {
        setWx('autoReplySingle', autoReplySingle)
        setWx('suffix', suffix)
        setWx('prefix', prefix)
        setWx('whiteRoom', whiteRoom)
        setWx('atReply', atReply)
        setWx('keyWords', keyWords)
        setWx('blackName', blackName)
        setWx('usemodel', usemodel)
        loadConfigValues()
        res.send({ status: 200, msg: '设置成功！' })
    } catch (error) {
        res.send({ status: 500, msg: '设置失败!' })
    }
})

//获取消息发送记录
router.post('/messagehistory',async (req,res)=>{
        db.all('SELECT * FROM message', [], (err, rows) => {
            if (err) {
                res.send({ status: 500, msg: '查询失败！' })
                return
            }
            res.send({ status: 200, msg: rows })
        }) 
})

//清空消息发送记录
router.post('/clearmessage',async(req,res) => {
    db.run('DELETE FROM message', (err) => {
        if (err) {
            res.send({ status: 500, msg: '删除失败!' })
        } else {
            res.send({ status: 200, msg: '删除成功！' })
        }
    })
})

module.exports = router
