export class UIUtils {
    static showToast(message, duration = 3000) {
        const toast = document.getElementById('toast');
        const toastMessage = toast.querySelector('.toast-message');
        
        toastMessage.textContent = message;
        toast.classList.add('toast-show');
        
        setTimeout(() => {
            toast.classList.remove('toast-show');
        }, duration);
    }

    static async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showToast('已複製到剪貼簿');
        } catch (err) {
            this.showToast('複製失敗');
            console.error('複製失敗:', err);
        }
    }

    static createMessageActions(message, isUser) {
        const actions = document.createElement('div');
        actions.className = 'message-actions';

        // 複製按鈕
        const copyBtn = document.createElement('i');
        copyBtn.className = 'fas fa-copy message-action-btn';
        copyBtn.title = '複製訊息';
        copyBtn.onclick = () => this.copyToClipboard(message);
        actions.appendChild(copyBtn);

        // 刪除按鈕
        const deleteBtn = document.createElement('i');
        deleteBtn.className = 'fas fa-trash-alt message-action-btn';
        deleteBtn.title = '刪除訊息';
        deleteBtn.onclick = (e) => {
            const messageElement = e.target.closest('.message');
            if (messageElement && confirm('確定要刪除這條訊息嗎？')) {
                messageElement.remove();
                this.showToast('訊息已刪除');
            }
        };
        actions.appendChild(deleteBtn);

        // 如果是機器人的回應，且包含程式碼，添加預覽按鈕
        if (!isUser && message.includes('```')) {
            const previewBtn = document.createElement('i');
            previewBtn.className = 'fas fa-play message-action-btn';
            previewBtn.title = '預覽程式碼';
            previewBtn.onclick = () => this.previewCode(message);
            actions.appendChild(previewBtn);
        }

        return actions;
    }

    static previewCode(message) {
        // 提取所有程式碼區塊
        const codeBlocks = message.match(/```(\w+)?\n([\s\S]*?)```/g);
        if (!codeBlocks) return;

        const previewModal = document.getElementById('preview-modal');
        const previewContent = document.getElementById('preview-content');
        const closePreview = document.getElementById('close-preview');

        // 清空預覽內容
        previewContent.innerHTML = '';

        // 處理每個程式碼區塊
        let htmlContent = '';
        let cssContent = '';
        let jsContent = '';

        codeBlocks.forEach(block => {
            const match = block.match(/```(\w+)?\n([\s\S]*?)```/);
            if (!match) return;

            const [, language = '', code = ''] = match;
            const trimmedCode = code.trim();

            switch (language.toLowerCase()) {
                case 'html':
                    htmlContent = trimmedCode;
                    break;
                case 'css':
                    cssContent = trimmedCode;
                    break;
                case 'javascript':
                case 'js':
                    jsContent = trimmedCode;
                    break;
            }
        });

        // 創建預覽內容
        if (htmlContent || cssContent || jsContent) {
            // 創建預覽框架
            const previewFrame = document.createElement('div');
            previewFrame.className = 'preview-frame flex flex-col gap-4';

            // 創建標籤頁容器
            const tabsContainer = document.createElement('div');
            tabsContainer.className = 'flex gap-2 border-b border-cyan-500/30 pb-2';
            
            const contentContainer = document.createElement('div');
            contentContainer.className = 'mt-4 custom-scrollbar';

            // 準備標籤頁內容
            const tabs = [];
            if (htmlContent) tabs.push(['HTML', htmlContent, 'html']);
            if (cssContent) tabs.push(['CSS', cssContent, 'css']);
            if (jsContent) tabs.push(['JavaScript', jsContent, 'javascript']);

            // 創建預覽視窗
            const previewContainer = document.createElement('div');
            previewContainer.className = 'bg-white rounded-lg p-4 mb-4 w-full h-[400px] overflow-auto custom-scrollbar';

            if (htmlContent) {
                // 組合完整的HTML
                const fullHtml = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <style>
                            ${cssContent}
                        </style>
                    </head>
                    <body>
                        ${htmlContent}
                        <script>
                            try {
                                ${jsContent}
                            } catch (error) {
                                console.error('執行錯誤:', error);
                            }
                        </script>
                    </body>
                    </html>
                `;

                const iframe = document.createElement('iframe');
                iframe.className = 'w-full h-full border-0';
                iframe.sandbox = 'allow-scripts allow-popups allow-same-origin';
                previewContainer.appendChild(iframe);

                // 使用 blob URL 載入內容
                const blob = new Blob([fullHtml], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                iframe.src = url;

                // 清理 blob URL
                iframe.onload = () => URL.revokeObjectURL(url);
            } else if (cssContent) {
                previewContainer.innerHTML = `
                    <style>${cssContent}</style>
                    <div class="preview-element p-4 border rounded">預覽元素</div>
                `;
            } else if (jsContent) {
                previewContainer.innerHTML = `
                    <div class="bg-gray-100 p-4 rounded">
                        <div id="console-output" class="font-mono text-sm"></div>
                    </div>
                `;

                // 執行 JavaScript
                try {
                    const consoleOutput = previewContainer.querySelector('#console-output');
                    const originalConsole = { ...console };
                    
                    // 重定向 console 輸出
                    console.log = (...args) => {
                        const line = document.createElement('div');
                        line.className = 'text-green-600';
                        line.textContent = args.join(' ');
                        consoleOutput.appendChild(line);
                    };
                    
                    console.error = (...args) => {
                        const line = document.createElement('div');
                        line.className = 'text-red-600';
                        line.textContent = args.join(' ');
                        consoleOutput.appendChild(line);
                    };

                    // 執行程式碼
                    eval(`(function() { ${jsContent} })()`);
                    
                    // 恢復原始 console
                    console = originalConsole;
                } catch (error) {
                    const errorLine = document.createElement('div');
                    errorLine.className = 'text-red-600';
                    errorLine.textContent = `執行錯誤: ${error.message}`;
                    previewContainer.querySelector('#console-output').appendChild(errorLine);
                }
            }

            // 添加程式碼標籤頁
            tabs.forEach(([label, content, lang], index) => {
                const tab = document.createElement('button');
                tab.className = 'px-4 py-2 rounded-lg text-cyan-500 hover:bg-cyan-500/10 transition-colors' + 
                              (index === 0 ? ' bg-cyan-500/10' : '');
                tab.textContent = label;
                
                const codeBlock = document.createElement('div');
                codeBlock.className = 'hidden';
                if (index === 0) codeBlock.className = 'block';
                codeBlock.innerHTML = `
                    <pre><code class="language-${lang}">${this.escapeHTML(content)}</code></pre>
                `;
                
                tab.onclick = () => {
                    tabsContainer.querySelectorAll('button').forEach(t => 
                        t.classList.remove('bg-cyan-500/10'));
                    contentContainer.querySelectorAll('div').forEach(d => 
                        d.className = 'hidden');
                    tab.classList.add('bg-cyan-500/10');
                    codeBlock.className = 'block';
                };
                
                tabsContainer.appendChild(tab);
                contentContainer.appendChild(codeBlock);
            });

            // 組裝預覽框架
            previewFrame.appendChild(previewContainer);
            previewFrame.appendChild(tabsContainer);
            previewFrame.appendChild(contentContainer);
            previewContent.appendChild(previewFrame);

            // 應用語法高亮
            contentContainer.querySelectorAll('pre code').forEach(block => {
                hljs.highlightElement(block);
            });
        } else {
            previewContent.innerHTML = '<div class="text-cyan-500">沒有找到可預覽的程式碼</div>';
        }

        // 顯示預覽視窗
        previewModal.classList.remove('hidden');
        previewModal.classList.add('show');

        // 關閉按鈕事件
        const closeModal = () => {
            previewModal.classList.remove('show');
            setTimeout(() => {
                previewModal.classList.add('hidden');
                previewContent.innerHTML = ''; // 清空內容
            }, 300);
            closePreview.removeEventListener('click', closeModal);
            document.removeEventListener('keydown', handleEsc);
        };

        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        closePreview.addEventListener('click', closeModal);
        document.addEventListener('keydown', handleEsc);
    }

    static sanitizeHTML(html) {
        return DOMPurify.sanitize(html, {
            ALLOWED_TAGS: ['html', 'head', 'body', 'style', 'div', 'p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                          'ul', 'ol', 'li', 'a', 'img', 'button', 'input', 'table', 'tr', 'td', 'th', 'thead', 'tbody'],
            ALLOWED_ATTR: ['class', 'id', 'style', 'href', 'src', 'alt', 'type', 'placeholder']
        });
    }

    static escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag));
    }
} 