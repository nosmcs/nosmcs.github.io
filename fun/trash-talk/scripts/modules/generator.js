import { state } from './state.js';
import { handleError, typeWriter } from './utils.js';

class Generator {
    getRandomSentence(theme) {
        // 檢查是否有句子數據
        if (!state.sentences || state.sentences.length === 0) {
            console.error('No sentences data available');
            return '無法載入句子，請重新整理頁面。';
        }

        console.log('Current theme:', theme);
        console.log('Total sentences:', state.sentences.length);
        
        let availableSentences = [...state.sentences];
        
        // 如果選擇了特定主題（非隨機或空值），則進行主題過濾
        if (theme && theme !== 'random' && theme.trim() !== '') {
            console.log('Filtering by theme:', theme);
            availableSentences = availableSentences.filter(sentence => {
                const matches = sentence.theme === theme;
                console.log(`Sentence "${sentence.text}" theme "${sentence.theme}" matches "${theme}":`, matches);
                return matches;
            });
            
            console.log('Sentences after theme filtering:', availableSentences.length);
            
            if (availableSentences.length === 0) {
                return `主題「${state.themes[theme]}」下沒有句子。`;
            }
        }
        
        // 根據標籤過濾句子
        const currentTag = state.currentTag;
        if (currentTag && currentTag !== 'all') {
            console.log('Filtering by tag:', currentTag);
            availableSentences = availableSentences.filter(sentence => {
                const hasTag = sentence.tags.includes(currentTag);
                console.log(`Sentence "${sentence.text}" has tag "${currentTag}":`, hasTag);
                return hasTag;
            });
            
            console.log('Sentences after tag filtering:', availableSentences.length);
            
            if (availableSentences.length === 0) {
                const tagName = state.tags[currentTag]?.name || currentTag;
                return `在${theme === 'random' ? '' : `「${state.themes[theme]}」主題下`}沒有「${tagName}」標籤的句子。`;
            }
        }
        
        // 隨機選擇一個句子
        const randomIndex = Math.floor(Math.random() * availableSentences.length);
        const selectedSentence = availableSentences[randomIndex];
        
        console.log('Selected sentence:', selectedSentence);
        
        // 檢查並確保句子的完整性
        if (!selectedSentence || typeof selectedSentence.text !== 'string') {
            console.error('Invalid sentence selected:', selectedSentence);
            return '無法生成句子，請稍後再試。';
        }
        
        return selectedSentence.text;
    }
}

export const generator = new Generator(); 