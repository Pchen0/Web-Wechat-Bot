const crypto = require('crypto')
const ws = require("ws")
const sqlite3 = require('sqlite3')

//sqlite数据库路径
let sqliteDbPath = "./db/data.db"
//打开数据库
var db = new sqlite3.Database(sqliteDbPath)

function getConfigValue(configName) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT value FROM xfconfig WHERE config = ?'
        db.get(query, [configName], (err, row) => {
            if (err) {
                reject(err)
            } else {
                const configValue = row ? row.value : null
                // 处理字符串 'null'，如果是 'null' 则返回 null
                resolve(configValue === 'null' ? null : configValue)
            }
        })
    })
}

// 读取配置信息并设置相应的变量
async function loadConfigValues() {
    try {
        url = await getConfigValue('APIUrl')
        APIKey = await getConfigValue('APIKey')
        APISecret = await getConfigValue('APISecret')
        app_id = await getConfigValue('app_id')
        temperatureStr = await getConfigValue('temperature')
        maxTokensStr = await getConfigValue('max_tokens')
        domain = await getConfigValue('domain')
        temperature = parseFloat(temperatureStr)
        max_tokens = parseInt(maxTokensStr)
    } catch (error) {
        console.error('加载讯飞接口设置失败！', error)
    }
}

// 调用函数加载配置信息
(async () => {
    try {
        await loadConfigValues();
    } catch (error) {
        console.error('加载讯飞接口设置失败！', error);
    }
})()

async function getXunfeiMessage(message) {

    const dateString = new Date().toGMTString()
    const parsedUrl = new URL(url)

    const host = parsedUrl.hostname
    const path = parsedUrl.pathname

    let tmp = `host: ${host}
date: ${dateString}
GET ${path} HTTP/1.1`

    let signature = crypto.createHmac('sha256', APISecret)
        .update(tmp)
        .digest('base64')

    const authorization_origin =
        `api_key="${APIKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`

    let buff = Buffer.from(authorization_origin)
    const authorization = buff.toString('base64')
    const signUrl =
        `wss://${host}${path}?authorization=${authorization}&date=${encodeURIComponent(dateString)}&host=${host}`

    return new Promise((resolve, reject) => {
        
    const sock = new ws(signUrl)

        sock.on("open", function () {
            sock.send(JSON.stringify({
                "header": {
                    "app_id": app_id,
                },
                "parameter": {
                    "chat": {
                        "domain": domain,
                        "temperature": temperature,
                        "max_tokens": max_tokens,
                    }
                },
                "payload": {
                    "message": {
                        "text": [{
                            "role": "user",
                            "content": message
                        },]
                    }
                }
            }))
        })

        let apiMessage = ''

        sock.on("error", function (err) {
            let errMessage = '获取消息失败!'+err.message
                reject(errMessage)
        })

        sock.on("close", function () {
            resolve(apiMessage)
        })

        sock.on("message", function (data) {
            let recMessage = JSON.parse(data.toString())

            if (recMessage.payload && recMessage.payload.choices && recMessage.payload.choices.text) {
                apiMessage += recMessage.payload.choices.text[0].content
            } else {
                console.log("无法识别的消息",recMessage)
            }
        })
    })
}

// 更新api设置到数据库
function updateXunfeiConfig(configName, configValue) {
    const query = 'REPLACE INTO xfconfig (config, value) VALUES (?, ?)'
    db.run(query, [configName, configValue], (err) => {
        if (err) {
            console.error('更新数据失败:', err)
        }
        loadConfigValues()
    })
}

module.exports = { updateXunfeiConfig, getXunfeiMessage }