const { WechatyBuilder } = require("wechaty")
const { getGPTMessage } = require('../API/ChatGPT')
const { getXunfeiMessage } = require('../API/xunfei')
const sqlite3 = require('sqlite3')

//sqlite数据库路径
let sqliteDbPath = "./db/data.db"
//打开数据库
let db = new sqlite3.Database(sqliteDbPath)

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
    if (usemodel==='xunfei'){
        const content = await getXunfeiMessage(message)
        return content
    }   else  {
        const content = await getGPTMessage(message)
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
                const name = await contact.name()
                const avatarFileBox = await contact.avatar()
                User.name = name
                // 将头像保存到本地
                const avatarFilePath = `./wechat/avatar/avatar.jpg`
                await avatarFileBox.toFile(avatarFilePath,true)
                // 有程序运行后配置未加载的问题，这里重新加载一遍
                loadConfigValues()
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
                                    console.log('机器人被@')
                                    if (atReply) {
                                        const apiMessage = await sendMessageToAPI(content)
                                        const senmsg = '@' + talkername + '  ' + prefix + apiMessage + suffix
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
                                    console.log('发现关键字')
                                    const apiMessage = await sendMessageToAPI(content)
                                    const senmsg = '@' + talkername + '  ' + prefix + apiMessage + suffix
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
                                    const senmsg = prefix + apiMessage + suffix
                                    talker.say(senmsg)
                                    writeToDatabase({
                                        time: getCurrentTime(),
                                        type: '私聊',
                                        recmsg: content,
                                        senmsg: senmsg,
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
    User
}
