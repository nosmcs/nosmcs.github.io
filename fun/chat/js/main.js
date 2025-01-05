import { sendMessage } from './modules/api.js';
import { ChatUI } from './modules/ui.js';
import { Starfield } from './modules/starfield.js';
import { UIUtils } from './modules/ui-utils.js';

class ChatApp {
    constructor() {
        this.ui = new ChatUI();
        this.initializeEventListeners();
        this.initializeStarfield();
        this.addWelcomeMessage();
    }

    initializeEventListeners() {
        this.ui.chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleUserMessage();
        });

        // 按下Enter鍵發送訊息（Shift+Enter換行）
        this.ui.userInput.addEventListener('keydown', async (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                await this.handleUserMessage();
            }
        });

        // 防止XSS攻擊
        this.ui.userInput.addEventListener('input', (e) => {
            e.target.value = DOMPurify.sanitize(e.target.value);
        });
    }

    initializeStarfield() {
        const starfield = document.getElementById('starfield');
        new Starfield(starfield, {
            starCount: 150,
            minSize: 1,
            maxSize: 3,
            minDuration: 2,
            maxDuration: 5
        });
    }

    addWelcomeMessage() {
        this.ui.addMessage('你好！我是 NOS AI 助手，有什麼我可以幫你的嗎？\n\n我可以：\n1. 回答問題和提供建議\n2. 協助程式設計和除錯\n3. 解釋程式碼和技術概念\n4. 提供程式碼範例\n\n請隨時向我提問！', false);
    }

    async handleUserMessage() {
        const message = this.ui.userInput.value.trim();
        if (!message) return;

        try {
            // 顯示用戶訊息
            this.ui.addMessage(message, true);
            this.ui.clearInput();
            this.ui.disableInput();

            // 顯示載入動畫
            const typingIndicator = this.ui.showTypingIndicator();

            // 發送API請求
            const response = await sendMessage(message);
            this.ui.removeTypingIndicator(typingIndicator);
            this.ui.addMessage(response, false);
        } catch (error) {
            this.ui.removeTypingIndicator(typingIndicator);
            this.ui.addMessage('抱歉，發生錯誤。請稍後再試。', false);
            UIUtils.showToast('連接AI助手時發生錯誤');
            console.error('API 錯誤:', error);
        } finally {
            this.ui.enableInput();
        }
    }
}

// 初始化應用
document.addEventListener('DOMContentLoaded', () => {
    new ChatApp();
}); 