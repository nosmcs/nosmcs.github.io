import { SELECTORS, STORAGE_KEYS } from './config.js';
import { state } from './state.js';
import { handleError } from './utils.js';

class UI {
    constructor() {
        this.elements = {};
        this.initElements();
        this.initTheme();
    }
    
    initElements() {
        // 將所有選擇器轉換為 DOM 元素引用
        Object.entries(SELECTORS).forEach(([key, selector]) => {
            this.elements[key] = document.querySelector(selector);
        });
    }
    
    initTheme() {
        const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
        document.body.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }
    
    updateThemeIcon(theme) {
        this.elements.darkModeToggle.innerHTML = theme === 'dark' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    }
    
    toggleDarkMode() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
        this.updateThemeIcon(newTheme);
    }
    
    showPanel(panelId) {
        if (state.activePanelId === panelId) {
            this.hidePanel();
            return;
        }

        if (state.activePanelId) {
            this.elements[state.activePanelId].classList.remove('show');
        }

        this.elements[panelId].classList.add('show');
        this.elements.overlay.classList.add('active');
        state.setActivePanelId(panelId);
    }
    
    hidePanel() {
        if (state.activePanelId) {
            this.elements[state.activePanelId].classList.remove('show');
            this.elements.overlay.classList.remove('active');
            state.setActivePanelId(null);
        }
    }
    
    updateFavoritesList() {
        const { favoritesList, emptyFavorites } = this.elements;
        favoritesList.innerHTML = '';
        
        if (state.favorites.length === 0) {
            emptyFavorites.style.display = 'block';
            return;
        }

        emptyFavorites.style.display = 'none';
        state.favorites.forEach(text => {
            const item = document.createElement('div');
            item.className = 'favorite-item';
            item.innerHTML = `
                <div class="text">${text}</div>
                <button class="delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            // 刪除按鈕事件
            const deleteBtn = item.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                state.toggleFavorite(text);
                this.updateFavoritesList();
                this.updateStats();
            });
            
            // 點擊複製文本
            item.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(text);
                    const notification = document.createElement('div');
                    notification.className = 'copy-notification';
                    notification.textContent = '已複製';
                    item.appendChild(notification);
                    setTimeout(() => notification.remove(), 1000);
                } catch (err) {
                    handleError(err, '複製失敗');
                }
            });
            
            favoritesList.appendChild(item);
        });
    }
    
    updateStats() {
        const { generateCount, favoriteCount, shareCount, copyCount, themeChart } = this.elements;
        const { stats } = state;
        
        generateCount.textContent = stats.generateCount;
        favoriteCount.textContent = stats.favoriteCount;
        shareCount.textContent = stats.shareCount;
        copyCount.textContent = stats.copyCount;
        
        this.updateThemeChart();
    }
    
    updateThemeChart() {
        const themeNames = Object.keys(state.stats.themeStats);
        this.elements.themeChart.innerHTML = themeNames.map(theme => `
            <div class="theme-item">
                <span class="theme-name">${state.themes[theme] || theme}</span>
                <span class="theme-count">${state.stats.themeStats[theme]}</span>
            </div>
        `).join('');
    }
    
    toggleTags() {
        state.setTagsExpanded(!state.isTagsExpanded);
        this.elements.expandTagsBtn.classList.toggle('expanded', state.isTagsExpanded);
        this.elements.tagsPanel.classList.toggle('expanded', state.isTagsExpanded);
        
        if (state.isTagsExpanded) {
            document.addEventListener('click', this.closeTagsPanel);
        } else {
            document.removeEventListener('click', this.closeTagsPanel);
        }
    }
    
    closeTagsPanel = (e) => {
        if (!this.elements.tagsContainer.contains(e.target)) {
            state.setTagsExpanded(false);
            this.elements.expandTagsBtn.classList.remove('expanded');
            this.elements.tagsPanel.classList.remove('expanded');
            document.removeEventListener('click', this.closeTagsPanel);
        }
    }
    
    updateFavoriteButton(text) {
        this.elements.favoriteBtn.classList.toggle('active', state.isFavorite(text));
    }
}

export const ui = new UI(); 