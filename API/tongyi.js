const axios = require('axios')
const sqlite3 = require('sqlite3')

const db = new sqlite3.Database("./db/data.db")

function getConfigValue(configName) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT value FROM tongyiconfig WHERE config = ?';
        db.get(query, [configName], (err, row) => {
            if (err) {
                reject(err);
            } else {
                const configValue = row ? row.value : null;
                // 处理字符串 'null'，如果是 'null' 则返回 null
                resolve(configValue === 'null' ? null : configValue)
            }
        })
    })
}

// 读取配置信息并设置相应的变量
async function loadConfigValues() {
    try {
        ty_apiKey = await getConfigValue('apiKey')
        ty_apiUrl = await getConfigValue('apiUrl')
        ty_maxTokensStr = await getConfigValue('max_tokens')
        ty_temperatureStr = await getConfigValue('temperature')
        ty_model = await getConfigValue('model')
        ty_presets = await getConfigValue('presets')
        ty_temperature = parseFloat(ty_temperatureStr)
        ty_max_tokens = parseInt(ty_maxTokensStr)
    } catch (error) {
        console.error('加载通义api接口设置失败！', error)
    }
}

// 调用函数加载配置信息
loadConfigValues()

async function getTYMessage(message) {
    const requestData = {
        model: ty_model,
        input: {
            messages: [
                { "role": "system", "content": ty_presets },
                { "role": "user", "content": message }
            ],
        },
        parameters: {
            max_tokens: ty_max_tokens,
            temperature: ty_temperature
        }
    }

    const token = "Bearer " + ty_apiKey

    try {
        const responseData = await axios.post(ty_apiUrl, requestData, {
            headers: { 'Content-Type': 'application/json', Authorization: token }
        })

        const apiMessage = responseData.data.output.text

        return apiMessage
    } catch (error) {
        console.error("向api接口发送请求时出现错误")
        return error
    }
}

// 更新api设置到数据库
function updateTYConfig(configName, configValue) {
    const query = 'REPLACE INTO tongyiconfig (config, value) VALUES (?, ?)';
    db.run(query, [configName, configValue], (err) => {
        if (err) {
            console.error('更新数据失败:', err);
        }
        loadConfigValues()
    })
}

module.exports = {
    updateTYConfig, getTYMessage
}