import { ANIMATION_DURATION, SELECTORS } from './config.js';

// Toast 提示功能
export const showToast = (message, type = 'error') => {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="toast-icon fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
        <div class="toast-content">${message}</div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    const toastContainer = document.querySelector(SELECTORS.toastContainer);
    toastContainer.appendChild(toast);
    
    // 添加關閉按鈕事件
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });
    
    // 顯示動畫
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });
    
    // 自動關閉
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, ANIMATION_DURATION.TOAST);
};

// 錯誤處理
export const handleError = (error, message = '發生錯誤，請稍後再試') => {
    console.error(error);
    showToast(message);
};

// 載入狀態管理
export const loader = {
    show: () => document.querySelector(SELECTORS.loader).classList.remove('hidden'),
    hide: () => document.querySelector(SELECTORS.loader).classList.add('hidden')
};

// 打字機效果
export const typeWriter = (text, element, callback) => {
    if (typeof text !== 'string') {
        element.textContent = '無法顯示句子';
        element.classList.remove('typewriter');
        callback?.(false);
        return;
    }
    
    element.textContent = '';
    element.classList.add('typewriter');
    
    const characters = Array.from(text.trim());
    let i = 0;
    
    function type() {
        if (i < characters.length) {
            element.textContent += characters[i];
            i++;
            setTimeout(type, ANIMATION_DURATION.TYPING);
        } else {
            element.classList.remove('typewriter');
            callback?.(true);
        }
    }
    
    type();
};

// 分享功能
export const shareContent = async (text, onSuccess) => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: '幹話生成器',
                text: text
            });
            onSuccess?.();
        } catch (err) {
            console.error('分享失敗:', err);
            fallbackShare(text, onSuccess);
        }
    } else {
        fallbackShare(text, onSuccess);
    }
};

const fallbackShare = (text, onSuccess) => {
    const dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    alert('已複製到剪貼簿，請手動分享');
    onSuccess?.();
}; 