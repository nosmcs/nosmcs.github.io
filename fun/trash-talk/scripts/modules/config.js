// 本地存儲鍵名
export const STORAGE_KEYS = {
    FAVORITES: 'favorites',
    STATS: 'stats',
    THEME: 'theme'
};

// 默認統計數據
export const DEFAULT_STATS = {
    generateCount: 0,
    favoriteCount: 0,
    shareCount: 0,
    copyCount: 0,
    themeStats: {},
    lastReset: new Date().toISOString()
};

// 動畫時間
export const ANIMATION_DURATION = {
    TOAST: 5000,
    TYPING: 50
};

// DOM 選擇器
export const SELECTORS = {
    themeSelect: '#themeSelect',
    generateBtn: '#generateBtn',
    resultContent: '#resultContent',
    copyBtn: '#copyBtn',
    darkModeToggle: '#darkModeToggle',
    favoriteBtn: '#favoriteBtn',
    shareBtn: '#shareBtn',
    favoritesPanel: '#favoritesPanel',
    favoritesList: '#favoritesList',
    statsPanel: '#statsPanel',
    statsToggle: '#statsToggle',
    favoritesToggle: '#favoritesToggle',
    overlay: '#overlay',
    closeStatsBtn: '#closeStatsBtn',
    closeFavoritesBtn: '#closeFavoritesBtn',
    emptyFavorites: '#emptyFavorites',
    tagsContainer: '#tagsContainer',
    expandTagsBtn: '#expandTagsBtn',
    tagsScroll: '#tagsScroll',
    currentTagText: '#currentTagText',
    customSelect: '#customSelect',
    tagsPanel: '#tagsPanel',
    loader: '#loader',
    toastContainer: '#toastContainer',
    generateCount: '#generateCount',
    favoriteCount: '#favoriteCount',
    shareCount: '#shareCount',
    copyCount: '#copyCount',
    themeChart: '#themeChart'
}; 