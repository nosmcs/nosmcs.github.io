import { STORAGE_KEYS, DEFAULT_STATS } from './config.js';

class State {
    constructor() {
        this.sentences = [];
        this.themes = {};
        this.tags = {};
        this.favorites = [];
        this.stats = { ...DEFAULT_STATS };
        this.currentTag = 'all';
        this.activePanelId = null;
        this.isTagsExpanded = false;
        this.isGenerating = false;
        this.currentTypingTimeout = null;
        
        this.loadFromStorage();
    }
    
    loadFromStorage() {
        this.favorites = JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]');
        this.stats = JSON.parse(localStorage.getItem(STORAGE_KEYS.STATS) || JSON.stringify(DEFAULT_STATS));
    }
    
    saveToStorage() {
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(this.favorites));
        localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(this.stats));
    }
    
    setData(sentences, themes, tags) {
        if (Array.isArray(sentences)) {
            this.sentences = sentences;
        }
        
        if (themes && typeof themes === 'object') {
            this.themes = themes;
        }
        
        if (tags && typeof tags === 'object') {
            this.tags = tags;
        }
        
        console.log('Data loaded:', {
            sentencesCount: this.sentences.length,
            themesCount: Object.keys(this.themes).length,
            tagsCount: Object.keys(this.tags).length
        });
    }
    
    toggleFavorite(text) {
        const index = this.favorites.indexOf(text);
        if (index === -1) {
            this.favorites.push(text);
            this.stats.favoriteCount++;
        } else {
            this.favorites.splice(index, 1);
            this.stats.favoriteCount--;
        }
        this.saveToStorage();
        return index === -1;
    }
    
    isFavorite(text) {
        return this.favorites.includes(text);
    }
    
    updateStats(type) {
        if (type in this.stats) {
            this.stats[type]++;
            this.saveToStorage();
        }
    }
    
    updateThemeStats(theme) {
        if (theme !== 'random') {
            this.stats.themeStats[theme] = (this.stats.themeStats[theme] || 0) + 1;
            this.saveToStorage();
        }
    }
    
    setCurrentTag(tag) {
        this.currentTag = tag;
    }
    
    setActivePanelId(id) {
        this.activePanelId = id;
    }
    
    setTagsExpanded(expanded) {
        this.isTagsExpanded = expanded;
    }
    
    setGenerating(generating) {
        this.isGenerating = generating;
    }
    
    filterByTag(sentence) {
        return this.currentTag === 'all' || sentence.tags.includes(this.currentTag);
    }
}

export const state = new State(); 