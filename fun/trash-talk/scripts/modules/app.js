import { SELECTORS } from './config.js';
import { state } from './state.js';
import { ui } from './ui.js';
import { generator } from './generator.js';
import { loader, handleError, typeWriter, shareContent, showToast } from './utils.js';

class App {
    constructor() {
        this.initTags();
        this.bindEvents();
        this.loadData();
    }
    
    async loadData() {
        loader.show();
        const minLoadTime = 3000;
        const loadStartTime = Date.now();
        
        try {
            const response = await fetch('data/sentences.json');
            if (!response.ok) {
                throw new Error('無法載入數據');
            }
            const data = await response.json();
            state.setData(data.sentences, data.themes, data.tags);
            
            // 計算剩餘需要等待的時間
            const elapsedTime = Date.now() - loadStartTime;
            const remainingTime = Math.max(0, minLoadTime - elapsedTime);
            
            // 等待剩餘時間
            await new Promise(resolve => setTimeout(resolve, remainingTime));
            
            // 初始化界面
            this.initCustomSelect();
            this.generateTrashTalk();
            ui.updateFavoritesList();
            ui.updateStats();
            
            // 載入成功提示
            showToast('數據載入成功', 'success');
        } catch (error) {
            handleError(error, '無法載入幹話數據，請檢查網絡連接');
            // 重試機制
            setTimeout(() => {
                showToast('正在嘗試重新載入...', 'info');
                this.loadData();
            }, 5000);
        } finally {
            loader.hide();
        }
    }
    
    initCustomSelect() {
        const selectSelected = document.querySelector(`${SELECTORS.customSelect} .select-selected`);
        const selectItems = document.querySelector(`${SELECTORS.customSelect} .select-items`);
        const themeSelect = document.querySelector(SELECTORS.themeSelect);
        
        // 清空現有選項
        const existingItems = selectItems.querySelectorAll('.select-item:not([data-value="random"])');
        existingItems.forEach(item => item.remove());
        
        // 清空並重新初始化實際的 select 元素
        themeSelect.innerHTML = '<option value="random">隨機主題</option>';
        
        // 添加主題選項
        Object.entries(state.themes).forEach(([value, text]) => {
            if (value === 'random') return; // 跳過隨機主題，因為已經存在
            
            // 從文本中提取純文字和表情符號
            const match = text.match(/^(.*?)\s*([^\s]+)$/);
            const pureText = match ? match[1].trim() : text.trim();
            const emoji = match ? match[2] : '';
            
            // 添加到實際的 select 元素
            const option = document.createElement('option');
            option.value = value;
            option.textContent = pureText;
            themeSelect.appendChild(option);
            
            // 添加到自定義選擇器
            const item = document.createElement('div');
            item.className = 'select-item';
            item.dataset.value = value;
            item.innerHTML = `
                <span class="select-text">${pureText}</span>
                <span class="select-icon">${emoji}</span>
            `;
            selectItems.appendChild(item);
            
            // 點擊選項事件
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const selectedValue = item.dataset.value;
                const selectedText = item.querySelector('.select-text').textContent;
                const selectedEmoji = item.querySelector('.select-icon').textContent;
                
                // 更新顯示
                selectSelected.innerHTML = `
                    <span class="select-text">${selectedText}</span>
                    <span class="select-icon">${selectedEmoji}</span>
                `;
                
                // 更新實際的 select 元素
                themeSelect.value = selectedValue;
                
                // 更新選中狀態
                selectItems.querySelectorAll('.select-item').forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
                
                // 關閉下拉選單
                document.querySelector(SELECTORS.customSelect).classList.remove('open');
                
                // 生成新的幹話
                this.generateTrashTalk();
            });
        });
        
        // 設置初始值為隨機主題
        themeSelect.value = 'random';
        selectSelected.innerHTML = `
            <span class="select-text">隨機主題</span>
            <span class="select-icon">🎲</span>
        `;
        
        // 為隨機主題選項添加點擊事件
        const randomItem = selectItems.querySelector('.select-item[data-value="random"]');
        if (randomItem) {
            randomItem.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // 更新顯示
                selectSelected.innerHTML = `
                    <span class="select-text">隨機主題</span>
                    <span class="select-icon">🎲</span>
                `;
                
                // 更新實際的 select 元素
                themeSelect.value = 'random';
                
                // 更新選中狀態
                selectItems.querySelectorAll('.select-item').forEach(i => i.classList.remove('selected'));
                randomItem.classList.add('selected');
                
                // 關閉下拉選單
                document.querySelector(SELECTORS.customSelect).classList.remove('open');
                
                // 生成新的幹話
                this.generateTrashTalk();
            });
        }
        
        // 點擊選中項
        selectSelected.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelector(SELECTORS.customSelect).classList.toggle('open');
        });
        
        // 點擊外部關閉下拉選單
        document.addEventListener('click', () => {
            document.querySelector(SELECTORS.customSelect).classList.remove('open');
        });
        
        // 搜索功能
        const searchInput = document.querySelector('#themeSearch');
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            selectItems.querySelectorAll('.select-item').forEach(item => {
                const themeName = item.querySelector('.select-text').textContent.toLowerCase();
                item.style.display = themeName.includes(searchTerm) ? 'flex' : 'none';
            });
        });
    }
    
    // 獲取主題對應的圖標
    getThemeIcon(theme) {
        const icons = {
            random: '🎲',
            life: '🌟',
            love: '💕',
            social: '👥',
            money: '💰',
            dream: '🌈',
            time: '⌛',
            mental: '🧠',
            friendship: '🤝',
            philosophy: '🎭',
            food: '🍜',
            game: '🎮',
            work: '💼',
            pets: '🐾',
            health: '💪',
            study: '📚',
            travel: '✈️',
            tech: '💻',
            music: '🎵',
            writing: '✍️'
        };
        return icons[theme] || '📝';
    }
    
    initTags() {
        const tagButtons = document.querySelectorAll(`${SELECTORS.tagsContainer} .tag-btn`);
        tagButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                tagButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.setCurrentTag(btn.dataset.tag);
                document.querySelector(SELECTORS.currentTagText).textContent = 
                    `標籤：${state.tags[btn.dataset.tag]?.name || '全部'}`;
                this.generateTrashTalk();
                
                // 選擇標籤後自動關閉面板
                setTimeout(() => {
                    state.setTagsExpanded(false);
                    document.querySelector(SELECTORS.expandTagsBtn).classList.remove('expanded');
                    document.querySelector(SELECTORS.tagsPanel).classList.remove('expanded');
                }, 300);
            });
        });
    }
    
    generateTrashTalk() {
        if (state.isGenerating) return;
        
        try {
            state.setGenerating(true);
            const generateBtn = document.querySelector(SELECTORS.generateBtn);
            generateBtn.disabled = true;
            generateBtn.classList.add('disabled');
            
            const selectedTheme = document.querySelector(SELECTORS.themeSelect).value;
            console.log('Selected theme before generation:', selectedTheme);
            
            const sentence = generator.getRandomSentence(selectedTheme);
            console.log('Generated sentence:', sentence);
            
            if (!sentence) {
                throw new Error('無法生成句子');
            }
            
            const resultContent = document.querySelector(SELECTORS.resultContent);
            typeWriter(sentence, resultContent, (success) => {
                if (success) {
                    state.updateStats('generateCount');
                    state.updateThemeStats(selectedTheme);
                    ui.updateStats();
                    ui.updateFavoriteButton(sentence);
                }
                state.setGenerating(false);
                generateBtn.disabled = false;
                generateBtn.classList.remove('disabled');
            });
            
            generateBtn.classList.add('pulse');
            setTimeout(() => generateBtn.classList.remove('pulse'), sentence.length * 50 + 100);
        } catch (error) {
            handleError(error, '生成幹話時發生錯誤');
            state.setGenerating(false);
            document.querySelector(SELECTORS.generateBtn).disabled = false;
            document.querySelector(SELECTORS.generateBtn).classList.remove('disabled');
        }
    }
    
    bindEvents() {
        // 深色模式切換
        document.querySelector(SELECTORS.darkModeToggle)
            .addEventListener('click', () => ui.toggleDarkMode());
        
        // 生成按鈕
        document.querySelector(SELECTORS.generateBtn)
            .addEventListener('click', () => this.generateTrashTalk());
        
        // 複製按鈕
        document.querySelector(SELECTORS.copyBtn).addEventListener('click', async () => {
            const text = document.querySelector(SELECTORS.resultContent).textContent;
            try {
                await navigator.clipboard.writeText(text);
                const copyBtn = document.querySelector(SELECTORS.copyBtn);
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i> 已複製';
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                }, 2000);
                state.updateStats('copyCount');
                ui.updateStats();
            } catch (err) {
                handleError(err, '複製失敗');
            }
        });
        
        // 收藏按鈕
        document.querySelector(SELECTORS.favoriteBtn).addEventListener('click', () => {
            const text = document.querySelector(SELECTORS.resultContent).textContent;
            const isNowFavorite = state.toggleFavorite(text);
            ui.updateFavoriteButton(text);
            ui.updateFavoritesList();
            ui.updateStats();
        });
        
        // 分享按鈕
        document.querySelector(SELECTORS.shareBtn).addEventListener('click', () => {
            const text = document.querySelector(SELECTORS.resultContent).textContent;
            shareContent(text, () => {
                state.updateStats('shareCount');
                ui.updateStats();
            });
        });
        
        // 面板控制
        document.querySelector(SELECTORS.statsToggle)
            .addEventListener('click', () => ui.showPanel('statsPanel'));
        document.querySelector(SELECTORS.favoritesToggle)
            .addEventListener('click', () => ui.showPanel('favoritesPanel'));
        document.querySelector(SELECTORS.closeStatsBtn)
            .addEventListener('click', () => ui.hidePanel());
        document.querySelector(SELECTORS.closeFavoritesBtn)
            .addEventListener('click', () => ui.hidePanel());
        document.querySelector(SELECTORS.overlay)
            .addEventListener('click', () => ui.hidePanel());
        document.querySelector(SELECTORS.expandTagsBtn)
            .addEventListener('click', () => ui.toggleTags());
            
        // 搜尋功能
        document.querySelector('#tagSearch').addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            document.querySelectorAll('.tag-btn').forEach(button => {
                const tagName = button.textContent.toLowerCase();
                button.style.display = tagName.includes(searchTerm) ? 'block' : 'none';
            });
        });

        document.querySelector('#themeSearch').addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            document.querySelectorAll('.select-item').forEach(item => {
                const themeName = item.querySelector('.select-text').textContent.toLowerCase();
                item.style.display = themeName.includes(searchTerm) ? 'flex' : 'none';
            });
        });
        
        // 防止搜尋框的點擊事件關閉面板
        document.querySelector('#tagSearch')
            .addEventListener('click', (e) => e.stopPropagation());
        document.querySelector('#themeSearch')
            .addEventListener('click', (e) => e.stopPropagation());
    }
}

export const app = new App(); 