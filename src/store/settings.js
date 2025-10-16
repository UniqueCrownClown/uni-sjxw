import { ref, reactive } from 'vue'

// 默认配置（从环境变量读取）
const getDefaultSettings = () => ({
    textGeneration: {
        baseUrl: import.meta.env.VITE_TEXT_GENERATION_BASE_URL || 'https://api.lingyiwanwu.com/v1/',
        apiKey: import.meta.env.VITE_TEXT_GENERATION_API_KEY || '',
        model: import.meta.env.VITE_TEXT_GENERATION_MODEL || 'yi-lightning',
        temperature: parseFloat(import.meta.env.VITE_TEXT_GENERATION_TEMPERATURE) || 0.7,
        timeout: parseInt(import.meta.env.VITE_TEXT_GENERATION_TIMEOUT) || 300000
    },
    imageGeneration: {
        baseUrl: import.meta.env.VITE_IMAGE_GENERATION_BASE_URL || 'https://open.bigmodel.cn/api/paas/v4/',
        apiKey: import.meta.env.VITE_IMAGE_GENERATION_API_KEY || '',
        model: import.meta.env.VITE_IMAGE_GENERATION_MODEL || 'cogview-3-flash'
    }
})

// 存储键名
const STORAGE_KEY = 'yifan-fengshen-settings'

// 全局设置状态
let settingsInstance = null

export const useSettingsStore = () => {
    if (!settingsInstance) {
        // 从localStorage加载设置，如果没有则使用默认设置
        const loadSettings = () => {
            try {
                // const saved = localStorage.getItem(STORAGE_KEY)
                const saved = uni.getStorageSync(STORAGE_KEY)
                if (saved) {
                    const parsed = JSON.parse(saved)
                    // 合并默认设置和保存的设置，确保新增的配置项有默认值
                    const defaultSettings = getDefaultSettings()
                    return {
                        textGeneration: { ...defaultSettings.textGeneration, ...parsed.textGeneration },
                        imageGeneration: { ...defaultSettings.imageGeneration, ...parsed.imageGeneration }
                    }
                }
            } catch (error) {
                console.warn('加载设置失败，使用默认设置:', error)
            }
            return getDefaultSettings()
        }

        // 初始化设置
        const settings = reactive(loadSettings())

        // 保存设置到localStorage
        const saveToStorage = () => {
            try {
                // localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
                uni.setStorageSync(STORAGE_KEY, JSON.stringify(settings))
            } catch (error) {
                console.error('保存设置失败:', error)
            }
        }

        settingsInstance = {
            // 获取当前设置
            getSettings: () => settings,

            // 获取文本生成配置
            getTextGenerationConfig: () => settings.textGeneration,

            // 获取图片生成配置
            getImageGenerationConfig: () => settings.imageGeneration,

            // 更新设置
            updateSettings: (newSettings) => {
                if (newSettings.textGeneration) {
                    Object.assign(settings.textGeneration, newSettings.textGeneration)
                }
                if (newSettings.imageGeneration) {
                    Object.assign(settings.imageGeneration, newSettings.imageGeneration)
                }
                saveToStorage()
            },

            // 更新文本生成配置
            updateTextGenerationConfig: (config) => {
                Object.assign(settings.textGeneration, config)
                saveToStorage()
            },

            // 更新图片生成配置
            updateImageGenerationConfig: (config) => {
                Object.assign(settings.imageGeneration, config)
                saveToStorage()
            },

            // 重置为默认设置
            resetToDefault: () => {
                const defaultSettings = getDefaultSettings()
                Object.assign(settings.textGeneration, defaultSettings.textGeneration)
                Object.assign(settings.imageGeneration, defaultSettings.imageGeneration)
                saveToStorage()
            },

            // 清除所有设置
            clearSettings: () => {
                try {
                    // localStorage.removeItem(STORAGE_KEY)
                    uni.removeStorageSync(STORAGE_KEY)
                    const defaultSettings = getDefaultSettings()
                    Object.assign(settings.textGeneration, defaultSettings.textGeneration)
                    Object.assign(settings.imageGeneration, defaultSettings.imageGeneration)
                } catch (error) {
                    console.error('清除设置失败:', error)
                }
            }
        }
    }

    return settingsInstance
}