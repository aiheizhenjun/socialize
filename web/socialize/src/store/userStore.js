import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => {
        
        let storedUserInfo = localStorage.getItem('userInfo');

        try {
            storedUserInfo = JSON.parse(storedUserInfo);
        } catch (error) {
            // 处理 JSON 解析错误，可以使用默认值或其他恢复策略
            storedUserInfo = null; // 或者提供一个默认值
        }

        return {
            userInfo: storedUserInfo || null, // 使用 storedUserInfo 或者 null 作为默认值
        };
    },
});