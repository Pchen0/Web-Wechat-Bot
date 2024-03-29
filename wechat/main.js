const { WechatyBuilder } = require("wechaty")
const { getGPTMessage } = require('../API/ChatGPT')
const { getXunfeiMessage } = require('../API/xunfei')
const { getTYMessage } = require('../API/tongyi')
const sqlite3 = require('sqlite3')

//打开数据库
    let db = new sqlite3.Database("./db/data.db")

const wechaty = WechatyBuilder.build()

function getConfigValue(configName) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT value FROM wxconfig WHERE config = ?'
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
        autoReplySingle = await getConfigValue('autoReplySingle') === 'true'
        prefix = await getConfigValue('prefix')
        suffix = await getConfigValue('suffix')
        usemodel = await getConfigValue('usemodel')
        whiteRoomString = await getConfigValue('whiteRoom')
        keyWordsString = await getConfigValue('keyWords')
        blackNameString = await getConfigValue('blackName')
        atReply = await getConfigValue('atReply') === 'true'

        // 处理转义符
        suffix = suffix !== null ? suffix.replace(/\\n/g, '\n') : ''
        prefix = prefix !== null ? prefix.replace(/\\n/g, '\n') : ''

        // 处理用逗号分隔的字符串形式的数组
        whiteRoom = whiteRoomString !== null ? whiteRoomString.split(",").map(item => item.trim()) : []
        keyWords = keyWordsString !== null ? keyWordsString.split(",").map(item => item.trim()) : []
        blackName = blackNameString !== null ? blackNameString.split(",").map(item => item.trim()) : []

    } catch (error) {
        console.error('Error loading config values:', error)
    }
}

// 调用函数加载配置信息
loadConfigValues()

//选择模型
async function sendMessageToAPI(message) {
    if (usemodel === 'xunfei'){
        const response = await getXunfeiMessage(message)
        const content = prefix + response + suffix
        return content
    }   else if(usemodel === 'chatgpt') {
        const response = await getGPTMessage(message)
        const content = prefix + response + suffix
        return content
    }  else if(usemodel === 'tongyi'){
        const response = await getTYMessage(message)
        const content = prefix + response + suffix
        return content
    } else {
        const content = prefix + '请前往设置页面选择Bot使用的模型' + suffix
        return content
    }
}

//获取时间
function getCurrentTime() {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }

    const currentTime = new Date().toLocaleString('zh-CN', options)
    return currentTime
}

//停止函数运行
let isRunning = false

async function stopWx() {
    if (isRunning) {
        isRunning = false
        await wechaty.stop()
        Status.status = 0
    } 
}

let Status = { status: null }
let User = {name: null}

async function wxlogin() {
    if (isRunning) {
        isRunning = false
        await wechaty.stop()
        Status.status = 0
    } 
    isRunning = true
    return new Promise((resolve, reject) => {
        let qrcodeUrl

        // 解除之前绑定的所有事件处理程序
        wechaty.removeAllListeners()

        wechaty
            .on('scan', (qrcode, status) => {
                qrcodeUrl = `https://my.tv.sohu.com/user/a/wvideo/getQRCode.do?text=${encodeURIComponent(qrcode)}`
                Status.status = status
                // 将 qrcodeUrl 提前返回
                resolve(qrcodeUrl)
            })

            .on('login', async (user) => {
                Status.status = 200
                // 获取登录用户的信息
                const contact = await wechaty.Contact.find({ id: user.id })
                const name = contact.name()
                const avatarFileBox = await contact.avatar()
                User.name = name
                // 将头像保存到本地
                    await avatarFileBox.toFile(`./wechat/avatar/avatar.jpg`,true)
            })

            .on('logout', async () => {
                Status.status = null
                isRunning = false
                await wechaty.stop()
            })

            .on('message',async (message) => {
                if (message.self()) {
                    return
                }   else  {
                    if (message.type() === wechaty.Message.Type.Text) {
                        const content = message.text()
                        const room = message.room()
                        const talker = message.talker()
                        const talkername = message.talker().payload.name
                        const foundWords = keyWords.filter(word => content.includes(word))

                        if (room) {
                            const roomname = message.room().payload.topic
                            if (whiteRoom.length === 0 || whiteRoom.includes(roomname)) {
                                //在群聊中被@
                                if (await message.mentionSelf()) {
                                    if (atReply) {
                                        const apiMessage = await sendMessageToAPI(content)
                                        const senmsg = '@' + talkername + '  ' + apiMessage 
                                        room.say(senmsg)
                                        //写入数据库
                                        writeToDatabase({
                                            time: getCurrentTime(),
                                            type: '群聊',
                                            recmsg: content,
                                            senmsg: senmsg,
                                            name: talkername,
                                            roomname: roomname,
                                        })
                                        return
                                    }
                                } else if (foundWords.length > 0) {
                                    const apiMessage = await sendMessageToAPI(content)
                                    const senmsg = '@' + talkername + '  ' + apiMessage 
                                    room.say(senmsg)
                                    //写入数据库
                                    writeToDatabase({
                                        time: getCurrentTime(),
                                        type: '群聊',
                                        recmsg: content,
                                        senmsg: senmsg,
                                        name: talkername,
                                        roomname: roomname,
                                    })
                                    return
                                }
                            } else {
                                return
                            }

                        } else {
                            if (autoReplySingle) {
                                if (blackName.includes(talkername)) {
                                    return
                                } else {
                                    const apiMessage = await sendMessageToAPI(content)
                                    talker.say(apiMessage)
                                    writeToDatabase({
                                        time: getCurrentTime(),
                                        type: '私聊',
                                        recmsg: content,
                                        senmsg: apiMessage,
                                        name: message.talker().payload.name,
                                        roomname: null,
                                    })
                                    return
                                }
                            }
                        }
                    } else {
                        return
                    } 
                }
                
            }
        )
        wechaty.start()
        
        wechaty.on('error', (error) => {
            reject(error)
        })
    })
}

//向数据库写入数据
function writeToDatabase(data) {
    const { time, type, recmsg, senmsg, name, roomname } = data

    const insertQuery = `INSERT INTO message (time, type, recmsg, senmsg, name, roomname) VALUES (?, ?, ?, ?, ?, ?)`
    db.run(insertQuery, [time, type, recmsg, senmsg, name, roomname], (error) => {
        if (error) {
            console.error('数据库写入失败:', error)
        }
    })
}

// 更新设置到数据库
function updateConfigValue(configName, configValue) {
    const query = 'INSERT OR REPLACE INTO wxconfig (config, value) VALUES (?, ?)'
    db.run(query, [configName, configValue], (err) => {
        if (err) {
            console.error('数据库写入失败:', err)
        }
    })
}

function setWx(key,value) {
    updateConfigValue(key,value)
}

module.exports = {
    wxlogin,
    Status,
    setWx,
    stopWx,
    loadConfigValues,
    User,
    sendMessageToAPI
}
