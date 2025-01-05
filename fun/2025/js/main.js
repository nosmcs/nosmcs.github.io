// 導入模組
import { initStars } from './modules/stars.js';
import { initCountdown } from './modules/countdown.js';
import { initWishes } from './modules/wishes.js';
import { initMeteors } from './modules/meteors.js';
import { initCharacters } from './modules/characters.js';
import { initSound } from './modules/sound.js';

// DOM 載入完成後初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化所有模組
    initStars();
    initCountdown();
    initWishes();
    initMeteors();
    initCharacters();
    initSound();
    
    // 隱藏切換階段按鈕和階段指示器
    const toggleBtn = document.getElementById('toggleStage');
    const stageIndicator = document.querySelector('.stage-indicator');
    toggleBtn.style.display = 'none';
    stageIndicator.style.display = 'none';
    
    // 優化階段切換
    const countdownStage = document.getElementById('countdownStage');
    const celebrationStage = document.getElementById('celebrationStage');
    let isTransitioning = false;
    
    // 修改模擬倒數按鈕
    const simulateBtn = document.getElementById('simulateCountdown');
    const wishForm = document.getElementById('wish-form');
    const submitBtn = wishForm.querySelector('.submit-btn');
    
    // 將模擬倒數按鈕移動到送出祝福按鈕的位置
    submitBtn.replaceWith(simulateBtn);
    simulateBtn.className = 'submit-btn glow-text';
    simulateBtn.querySelector('.toggle-icon').remove();
    simulateBtn.querySelector('.toggle-text').textContent = '送出祝福';
    
    // 添加鍵盤快捷鍵
    document.addEventListener('keydown', (event) => {
        // 檢查是否按下 Enter 鍵且不在輸入框中
        if (event.key === 'Enter' && document.activeElement.tagName !== 'INPUT') {
            event.preventDefault(); // 防止預設行為
            simulateBtn.click(); // 觸發按鈕點擊
        }
    });
    
    // 優化階段切換
    toggleBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        
        const isCelebration = !countdownStage.classList.contains('hidden');
        
        requestAnimationFrame(() => {
            if (isCelebration) {
                countdownStage.classList.add('hidden');
                celebrationStage.classList.remove('hidden');
                currentStageIndicator.textContent = '慶祝階段';
                document.dispatchEvent(new CustomEvent('stage-changed', { 
                    detail: 'celebration'
                }));
            } else {
                celebrationStage.classList.add('hidden');
                countdownStage.classList.remove('hidden');
                currentStageIndicator.textContent = '倒數階段';
                document.dispatchEvent(new CustomEvent('stage-changed', { 
                    detail: 'countdown'
                }));
            }
            
            setTimeout(() => {
                isTransitioning = false;
            }, 300);
        });
    });
});

// 處理頁面可見性變化
document.addEventListener('visibilitychange', () => {
    const bgMusic = document.getElementById('bgMusic');
    if (document.hidden) {
        bgMusic.pause();
    } else {
        if (bgMusic.dataset.playing === 'true') {
            bgMusic.play();
        }
    }
});

// 添加背景影片元素
const videoElement = document.createElement('video');
videoElement.className = 'background-video';
videoElement.src = '/2025/assets/background.mp4';
videoElement.loop = true;
videoElement.muted = true;
videoElement.playsInline = true;
videoElement.autoplay = true;
videoElement.setAttribute('playsinline', '');
videoElement.setAttribute('webkit-playsinline', '');
videoElement.setAttribute('preload', 'auto');
videoElement.style.transform = 'translateZ(0)';
document.body.insertBefore(videoElement, document.body.firstChild);

// 優化影片加載
let videoLoaded = false;
videoElement.addEventListener('loadeddata', () => {
    console.log('Video loaded successfully');
    videoLoaded = true;
    // 檢查當前階段
    if (celebrationStage && !celebrationStage.classList.contains('hidden')) {
        playVideo();
    }
});

// 優化階段切換
document.addEventListener('stage-changed', (e) => {
    if (e.detail === 'celebration') {
        if (videoLoaded) {
            showVideo();
        } else {
            videoElement.addEventListener('loadeddata', showVideo, { once: true });
        }
    } else {
        hideVideo();
    }
});

// 顯示影片
function showVideo() {
    videoElement.currentTime = 0;
    videoElement.classList.add('visible');
    playVideo();
}

// 隱藏影片
function hideVideo() {
    videoElement.classList.remove('visible');
    videoElement.pause();
}

// 播放影片
function playVideo() {
    if (!videoElement || !videoLoaded) return;

    videoElement.play()
        .catch(error => {
            console.error('Error playing video:', error);
        });
}

// 切換到慶祝階段
async function switchToCelebration() {
    const countdownStage = document.getElementById('countdownStage');
    const celebrationStage = document.getElementById('celebrationStage');
    const currentStageIndicator = document.getElementById('currentStage');
    const transitionOverlay = document.querySelector('.stage-transition');

    // 先觸發階段變更事件，啟動興奮模式
    document.dispatchEvent(new CustomEvent('stage-changed', { 
        detail: 'celebration'
    }));

    // 開始暗淡轉場
    countdownStage.classList.add('fade-out');
    transitionOverlay.classList.add('active');

    // 等待1秒後開始切換
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 切換階段
    countdownStage.classList.add('hidden');
    celebrationStage.classList.remove('hidden');
    currentStageIndicator.textContent = '慶祝階段';

    // 等待內容準備好後開始明亮轉場
    await new Promise(resolve => setTimeout(resolve, 100));
    celebrationStage.classList.add('fade-in');
    transitionOverlay.classList.remove('active');
}

// 切換到倒數階段
function switchToCountdown() {
    celebrationStage.classList.add('hidden');
    countdownStage.classList.remove('hidden');
    hideVideo();
    currentStageIndicator.textContent = '倒數階段';
}

// 在倒數計時結束時播放影片
function startCelebration() {
    countdownStage.classList.add('hidden');
    celebrationStage.classList.remove('hidden');
    if (videoLoaded) {
        showVideo();
    }
    currentStageIndicator.textContent = '慶祝階段';
}

// 初始化音效控制
const soundControl = initSound();

// 模擬倒數按鈕
const simulateBtn = document.getElementById('simulateCountdown');
let isSimulating = false;

simulateBtn.addEventListener('click', async () => {
    if (isSimulating) return;
    isSimulating = true;
    
    // 暫停真實倒數
    document.dispatchEvent(new CustomEvent('pause-countdown'));
    
    let countdown = 15;
    
    // 更新計時器顯示
    const updateDisplay = (seconds) => {
        // 只更新計時器顯示，不更新按鈕文字
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    };
    
    // 立即更新第一秒
    updateDisplay(countdown);
    
    // 每秒更新
    const countdownInterval = setInterval(() => {
        countdown--;
        updateDisplay(countdown);
        
        // 只在倒數階段播放秒針聲
        if (!soundControl.isMuted() && document.getElementById('countdownStage').style.display !== 'none') {
            soundControl.playTickSound();
        }
        
        // 最後10秒加快祝福訊息
        if (countdown <= 10) {
            document.dispatchEvent(new CustomEvent('countdown-excitement'));
        }
        
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            isSimulating = false;
            
            // 切換到慶祝階段
            switchToCelebration();
            
            // 停止播放倒數聲音
            document.dispatchEvent(new CustomEvent('stop-countdown-sound'));
        }
    }, 1000);
}); 