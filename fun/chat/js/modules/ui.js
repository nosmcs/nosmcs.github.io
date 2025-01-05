import { UIUtils } from './ui-utils.js';

export class ChatUI {
    constructor() {
        this.messagesContainer = document.getElementById('chat-messages');
        this.chatForm = document.getElementById('chat-form');
        this.userInput = document.getElementById('user-input');
        this.clearChatButton = document.getElementById('clearChat');
        this.typingCount = this.userInput.parentElement.querySelector('.typing-count');
        
        this.setupEventListeners();
        this.loadMessages();
        this.updateTypingCount();
    }

    setupEventListeners() {
        // 自動調整輸入框高度
        this.userInput.addEventListener('input', () => {
            this.userInput.style.height = 'auto';
            this.userInput.style.height = Math.min(this.userInput.scrollHeight, 200) + 'px';
            this.updateTypingCount();
        });

        // 清除對話按鈕
        this.clearChatButton.addEventListener('click', () => {
            this.clearChat();
        });

        // 監聽貼上事件
        this.userInput.addEventListener('paste', (e) => {
            e.preventDefault();
            const text = e.clipboardData.getData('text');
            const maxLength = parseInt(this.userInput.getAttribute('maxlength'));
            const currentLength = this.userInput.value.length;
            const availableSpace = maxLength - currentLength;
            
            if (text.length > availableSpace) {
                const truncatedText = text.slice(0, availableSpace);
                document.execCommand('insertText', false, truncatedText);
                UIUtils.showToast('已達到最大字數限制');
            } else {
                document.execCommand('insertText', false, text);
            }
        });
    }

    updateTypingCount() {
        const maxLength = parseInt(this.userInput.getAttribute('maxlength'));
        const currentLength = this.userInput.value.length;
        this.typingCount.textContent = `${currentLength}/${maxLength}`;
        
        if (currentLength >= maxLength * 0.9) {
            this.typingCount.classList.add('text-red-500');
        } else {
            this.typingCount.classList.remove('text-red-500');
        }
    }

    addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

        // 使用 marked.js 解析 Markdown
        const sanitizedContent = DOMPurify.sanitize(marked.parse(content));
        messageDiv.innerHTML = sanitizedContent;

        // 為程式碼區塊添加語言標籤
        messageDiv.querySelectorAll('pre code').forEach((block) => {
            const language = block.className.replace('language-', '');
            if (language) {
                block.parentElement.setAttribute('data-language', language);
            }
        });

        // 添加訊息操作按鈕
        const actions = UIUtils.createMessageActions(content, isUser);
        messageDiv.appendChild(actions);

        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();

        // 如果有程式碼區塊，應用語法高亮
        messageDiv.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });

        // 保存訊息到本地存儲
        this.saveMessages();

        // 添加動畫效果
        setTimeout(() => messageDiv.classList.add('show'), 10);
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        this.messagesContainer.appendChild(indicator);
        this.scrollToBottom();
        return indicator;
    }

    removeTypingIndicator(indicator) {
        if (indicator && indicator.parentNode) {
            indicator.parentNode.removeChild(indicator);
        }
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    clearInput() {
        this.userInput.value = '';
        this.userInput.style.height = 'auto';
        this.updateTypingCount();
    }

    disableInput() {
        this.userInput.disabled = true;
        this.chatForm.querySelector('button').disabled = true;
    }

    enableInput() {
        this.userInput.disabled = false;
        this.chatForm.querySelector('button').disabled = false;
        this.userInput.focus();
    }

    clearChat() {
        if (confirm('確定要清除所有對話嗎？')) {
            this.messagesContainer.innerHTML = '';
            localStorage.removeItem('chatMessages');
            UIUtils.showToast('對話已清除');
        }
    }

    saveMessages() {
        const messages = Array.from(this.messagesContainer.children)
            .filter(el => el.classList.contains('message'))
            .map(el => ({
                content: el.querySelector(':not(.message-actions)').textContent,
                isUser: el.classList.contains('user-message')
            }));
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }

    loadMessages() {
        const savedMessages = localStorage.getItem('chatMessages');
        if (savedMessages) {
            JSON.parse(savedMessages).forEach(msg => {
                this.addMessage(msg.content, msg.isUser);
            });
        }
    }
} 