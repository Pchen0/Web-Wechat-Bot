const axios = require('axios')
const sqlite3 = require('sqlite3')

//打开数据库
const db = new sqlite3.Database("./db/data.db")

function getConfigValue(configName) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT value FROM gptconfig WHERE config = ?';
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
        gpt_apiKey = await getConfigValue('apiKey')
        gpt_apiUrl = await getConfigValue('apiUrl')
        gpt_app_code = await getConfigValue('app_code')
        gpt_model = await getConfigValue('model')
        gpt_presets = await getConfigValue('presets')
    } catch (error) {
        console.error('加载GPT接口设置失败！', error)
    }
}

// 调用函数加载配置信息
loadConfigValues()

async function getGPTMessage(message) {
    const requestData = {
        app_code: gpt_app_code,
        messages: [{ "role": "user", "content": message }],
        model: gpt_model
    }

    if(gpt_presets) {
        requestData.messages.unshift({ "role": "system", "content": gpt_presets })
    }

    const token = "Bearer " + gpt_apiKey

    try {
        const responseData = await axios.post(gpt_apiUrl, requestData, {
            headers: { 'Content-Type': 'application/json', Authorization: token }
        })

        const apiMessage = responseData.data.choices[0].message.content

        return apiMessage
    } catch (error) {
        console.error("向api接口发送请求时出现错误")
        return error
    }
}

// 更新api设置到数据库
function updateGPTConfig(configName, configValue) {
    const query = 'REPLACE INTO gptconfig (config, value) VALUES (?, ?)';
    db.run(query, [configName, configValue], (err) => {
        if (err) {
            console.error('更新数据失败:', err);
        }
        loadConfigValues()
    })
}

module.exports = { updateGPTConfig, getGPTMessage }
