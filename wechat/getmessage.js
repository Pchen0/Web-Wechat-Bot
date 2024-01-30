const axios = require('axios')
const config = require('../config') 
const sqlite3 = require('sqlite3')

//sqlite数据库路径
let sqliteDbPath = "./db/data.db"
//打开数据库
var db = new sqlite3.Database(sqliteDbPath)

function getConfigValue(configName) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT value FROM apiconfig WHERE config = ?';
        db.get(query, [configName], (err, row) => {
            if (err) {
                reject(err);
            } else {
                const configValue = row ? row.value : null;
                // 处理字符串 'null'，如果是 'null' 则返回 null
                resolve(configValue === 'null' ? null : configValue)
            }
        });
    });
}

// 读取配置信息并设置相应的变量
async function loadConfigValues() {
    try {
        apiKey = await getConfigValue('apiKey')
        apiUrl = await getConfigValue('apiUrl')
        app_code = await getConfigValue('app_code')
        suffix = await getConfigValue('suffix')
        model = await getConfigValue('model')
        console.log('api接口设置加载成功');
    } catch (error) {
        console.error('加载api接口设置失败！', error);
    }
}

// 调用函数加载配置信息
loadConfigValues()


async function sendMessageToAPI(message) {
    const requestData = {
        app_code: app_code,
        messages: [{ "role": "user", "content": message }],
        model: model
    }

    const token = "Bearer " + apiKey

    try {
        const responseData = await axios.post(apiUrl, requestData, {
            headers: { 'Content-Type': 'application/json', Authorization: token }
        })

        const apiData = responseData.data
        const apiMessage = apiData.choices[0].message.content

        return apiMessage
    } catch (error) {
        console.error("向api接口发送请求时出现错误")
        return error
    }
}

// 更新api设置到数据库
function updateapiConfigValue(configName, configValue) {
    const query = 'REPLACE INTO apiconfig (config, value) VALUES (?, ?)';
    db.run(query, [configName, configValue], (err) => {
        if (err) {
            console.error('更新数据失败:', err);
        } else {
            console.log('更新数据成功');
        }
    });
}

// 设置是否自动回复
function setApiKey(value) {
    apiKey = value;
    updateapiConfigValue('apiKey', value);
}

function setApiUrl(value) {
    apiUrl= value;
    updateapiConfigValue('apiUrl', value);
}

function setapp_code(value) {
    app_code = value;
    updateapiConfigValue('app_code', value);
}

function setmodel(value) {
    model = value
    updateapiConfigValue('model', value);
}

module.exports = { sendMessageToAPI, setApiKey, setApiUrl, setapp_code , setmodel}
