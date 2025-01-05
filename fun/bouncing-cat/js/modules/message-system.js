export class MessageSystem {
    constructor() {
        this.messages = [
            '喵～我是一隻快樂的貓咪！',
            '你知道嗎？貓咪每天要睡 16 小時呢！',
            '摸摸我的頭，我會很開心的！',
            '我最喜歡吃魚了，你呢？',
            '喵喵喵～要一起玩嗎？',
            '今天天氣真好，適合曬太陽呢！',
            '我可是跳躍高手喔！',
            '你覺得我可愛嗎？喵～',
            '讓我們一起享受這個美好的時光吧！'
        ];
        this.activeMessages = new Map(); // 儲存活動中的訊息
    }

    showRandomMessage(cat) {
        const message = this.messages[Math.floor(Math.random() * this.messages.length)];
        
        // 創建新的訊息元素
        const messageElement = document.createElement('div');
        messageElement.className = 'floating-message';
        messageElement.textContent = message;
        
        // 設置初始位置（在貓咪上方）
        this.updateMessagePosition(messageElement, cat);
        
        document.getElementById('cat-container').appendChild(messageElement);
        
        // 儲存訊息元素和相關資訊
        this.activeMessages.set(cat.element, {
            element: messageElement,
            cat: cat,
            timeoutId: setTimeout(() => {
                messageElement.remove();
                this.activeMessages.delete(cat.element);
            }, 3000)
        });
    }

    updateMessagePosition(messageElement, cat) {
        const catRect = cat.element.getBoundingClientRect();
        const messageHeight = 40; // 預估訊息高度
        
        messageElement.style.left = `${cat.x + cat.size / 2}px`;
        messageElement.style.top = `${cat.y - messageHeight}px`;
    }

    updateAllMessages() {
        this.activeMessages.forEach((messageInfo, catElement) => {
            this.updateMessagePosition(messageInfo.element, messageInfo.cat);
        });
    }
} 