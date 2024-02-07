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
        apiKey = await getConfigValue('apiKey')
        apiUrl = await getConfigValue('apiUrl')
        maxTokensStr = await getConfigValue('max_tokens')
        temperatureStr = await getConfigValue('temperature')
        model = await getConfigValue('model')
        presets = await getConfigValue('presets')
        temperature = parseFloat(temperatureStr)
        max_tokens = parseInt(maxTokensStr)
    } catch (error) {
        console.error('加载通义api接口设置失败！', error)
    }
}

// 调用函数加载配置信息
loadConfigValues()

async function getTYMessage(message) {
    const requestData = {
        model: model,
        input: {
            messages: [
                { "role": "system", "content": presets },
                { "role": "user", "content": message }
            ],
        },
        parameters: {
            max_tokens: max_tokens,
            temperature: temperature
        }
    }

    const token = "Bearer " + apiKey

    try {
        const responseData = await axios.post(apiUrl, requestData, {
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