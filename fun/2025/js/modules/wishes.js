// 定義不同階段的祝福語
const countdownWishes = [
    '期待2025年的到來，我要去旅行！',
    '新的一年即將來臨，我的錢包還是空蕩蕩的！',
    '準備迎接新的一年，繼續上班！',
    '希望新的一年會有女朋友！',
    '哥布林們，讓我們一起迎接2025！',
    '新年新希望，一起加油，走出山洞！',
    '我卡了，啊啊啊啊！',
    '趁著沒有人看到我，我要直播倒立吃屎。',
];

// 最後5秒的興奮祝福語
const excitedWishes = [
    '期待2025年的到來，我要去旅行！',
    '新的一年即將來臨，我的錢包還是空蕩蕩的！',
    '倒數最後的時刻，好期待！',
    '準備迎接新的一年，繼續上班！',
    '希望新的一年會有女朋友！',
    '哥布林們，讓我們一起迎接2025！',
    '新年新希望，一起加油，走出山洞！',
    '即將告別舊年，期待新年！',
    '還剩幾秒了！',
    '我卡了，啊啊啊啊！',
    '趁著沒有人看到我，我要直播倒立吃屎。',
    '啊啊啊！我要去了！',
    '最後倒數！',
    '好像混進了什麼奇怪的東西了',
    '3、2、1要來囉！',
    '來了來了！',
    '衝鴨！',
];

const celebrationWishes = [
    '新年快樂！祝福大家！',
    '恭喜發財，萬事如意！',
    '願新的一年充滿歡笑！',
    '祝福大家心想事成！',
    '新年新氣象，事事順心！',
    '恭賀新禧，幸福美滿！',
    '祝大家新年快樂！',
    '願新的一年平安喜樂！',
    '新年快樂，身體健康！',
    '祝福大家新年大吉！'
];

// 用戶名顏色陣列
const nameColors = [
    '#FF6B6B', // 珊瑚紅
    '#4ECDC4', // 青綠
    '#FFD93D', // 金黃
    '#6C5CE7', // 紫色
    '#A8E6CF', // 薄荷綠
    '#FF8B94', // 粉紅
    '#98DDCA', // 淺綠
    '#FFA07A', // 淺鮭魚色
    '#87CEEB', // 天藍
    '#DDA0DD'  // 梅紅
];

// 模擬用戶名
const userNames = [
    '下面一大包', '小獄', '勞資蜀道山', 'DoubleMay', '小雞子',
    '大哥沒有死', '媽媽十塊', '沿途望出車外', '何生何太', '劉馬車',
    '白卡佬', '你啊媽湊大你', 'on9仔', '慌張西望', '我愛香港🇭🇰'
];

// 初始化祝福系統
export function initWishes() {
    const wishesCarousel = document.querySelector('.wishes-carousel');
    const wishForm = document.getElementById('wish-form');
    const wishInput = document.getElementById('wish-input');
    let currentStage = 'countdown';
    let currentWishes = [];
    let normalInterval;
    let excitedInterval;

    // 監聽倒數興奮事件
    document.addEventListener('countdown-excitement', () => {
        // 清除正常的更新間隔
        clearInterval(normalInterval);
        // 清除可能存在的興奮更新間隔
        if (excitedInterval) {
            clearInterval(excitedInterval);
        }
        // 開始快速更新
        excitedInterval = setInterval(() => {
            addNewWish(excitedWishes[Math.floor(Math.random() * excitedWishes.length)]);
            scrollToBottom();
        }, 200); // 每0.2秒更新一次

        // 在10秒後恢復正常更新
        setTimeout(() => {
            if (excitedInterval) {
                clearInterval(excitedInterval);
                excitedInterval = null;
            }
            if (normalInterval) {
                clearInterval(normalInterval);
            }
            currentWishes = []; // 清空現有祝福
            startNormalInterval(); // 重新開始正常更新
            updateWishes(); // 立即更新一次
        }, 10000);
    });

    // 監聽階段變更事件
    document.addEventListener('stage-changed', (e) => {
        currentStage = e.detail;
        
        // 清除所有定時器
        if (normalInterval) {
            clearInterval(normalInterval);
            normalInterval = null;
        }
        if (excitedInterval) {
            clearInterval(excitedInterval);
            excitedInterval = null;
        }
        
        // 清空現有祝福
        currentWishes = [];
        wishesCarousel.innerHTML = '';
        
        // 如果是切換到慶祝階段，先進入10秒興奮模式
        if (currentStage === 'celebration') {
            // 立即添加一些慶祝祝福
            for (let i = 0; i < 5; i++) {
                addNewWish(celebrationWishes[Math.floor(Math.random() * celebrationWishes.length)]);
            }
            
            // 開始快速更新，使用慶祝階段的祝福語
            excitedInterval = setInterval(() => {
                addNewWish(celebrationWishes[Math.floor(Math.random() * celebrationWishes.length)]);
                scrollToBottom();
            }, 200);

            // 10秒後恢復正常更新
            setTimeout(() => {
                if (excitedInterval) {
                    clearInterval(excitedInterval);
                    excitedInterval = null;
                }
                if (normalInterval) {
                    clearInterval(normalInterval);
                }
                currentWishes = []; // 清空現有祝福
                wishesCarousel.innerHTML = ''; // 清空顯示
                startNormalInterval(); // 重新開始正常更新
                updateWishes(); // 立即更新一次
            }, 10000);
        } else {
            updateWishes();
            startNormalInterval();
        }
    });

    // 開始正常的更新間隔
    function startNormalInterval() {
        if (normalInterval) {
            clearInterval(normalInterval);
        }
        // 根據不同階段設定不同的更新頻率
        const updateInterval = currentStage === 'celebration' ? 1500 : 3000;
        normalInterval = setInterval(() => {
            updateWishes();
            scrollToBottom();
        }, updateInterval);
    }

    // 添加新祝福
    function addNewWish(customMessage = null) {
        const wishes = currentStage === 'countdown' ? countdownWishes : celebrationWishes;
        const randomName = userNames[Math.floor(Math.random() * userNames.length)];
        const randomColor = nameColors[Math.floor(Math.random() * nameColors.length)];
        const message = customMessage || wishes[Math.floor(Math.random() * wishes.length)];

        const wishElement = document.createElement('div');
        wishElement.className = 'wish-item';
        wishElement.style.opacity = '0';
        wishElement.style.transform = 'translateY(20px)';
        wishElement.innerHTML = `
            <span class="user-name" style="color: ${randomColor}">${randomName}</span>
            <span class="wish-text">${message}</span>
        `;
        
        // 如果超過限制，先移除最舊的祝福
        if (currentWishes.length >= 10) {
            const oldestWish = currentWishes.shift();
            if (wishesCarousel.firstChild) {
                const oldElement = wishesCarousel.firstChild;
                // 使用 requestAnimationFrame 進行淡出動畫
                let opacity = 1;
                const fadeOut = () => {
                    opacity -= 0.1;
                    oldElement.style.opacity = opacity;
                    oldElement.style.transform = `translateY(${(1 - opacity) * -20}px)`;
                    
                    if (opacity > 0) {
                        requestAnimationFrame(fadeOut);
                    } else {
                        wishesCarousel.removeChild(oldElement);
                    }
                };
                requestAnimationFrame(fadeOut);
            }
        }
        
        // 添加新祝福
        wishesCarousel.appendChild(wishElement);
        currentWishes.push({ name: randomName, message, color: randomColor });
        
        // 使用 requestAnimationFrame 進行淡入動畫
        let opacity = 0;
        const fadeIn = () => {
            opacity += 0.1;
            wishElement.style.opacity = opacity;
            wishElement.style.transform = `translateY(${(1 - opacity) * 20}px)`;
            
            if (opacity < 1) {
                requestAnimationFrame(fadeIn);
            }
        };
        requestAnimationFrame(fadeIn);
    }

    // 更新祝福顯示
    function updateWishes() {
        // 使用 requestAnimationFrame 來控制更新頻率
        if (currentWishes.length === 0) {
            for (let i = 0; i < 5; i++) {
                requestAnimationFrame(() => addNewWish());
            }
        } else {
            requestAnimationFrame(() => addNewWish());
        }
    }

    // 滾動到底部的函數
    function scrollToBottom() {
        requestAnimationFrame(() => {
            wishesCarousel.scrollTop = wishesCarousel.scrollHeight;
        });
    }

    // 處理新祝福提交
    wishForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newWish = wishInput.value.trim();
        if (newWish) {
            addNewWish(newWish);
            wishInput.value = '';
            scrollToBottom();
        }
    });

    // 初始顯示祝福
    updateWishes();
    scrollToBottom();
    startNormalInterval();
} 