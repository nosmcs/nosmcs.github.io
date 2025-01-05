export function initSound() {
    const bgMusic = document.getElementById('bgMusic');
    const soundToggle = document.getElementById('soundToggle');
    const soundOn = soundToggle.querySelector('.sound-on');
    const soundOff = soundToggle.querySelector('.sound-off');
    
    // 隱藏音效按鈕
    soundToggle.style.display = 'none';
    
    let isMuted = false;
    let isCountdownActive = true;
    let fireworkSound = null;
    
    // 創建音效池
    const tickSoundPool = [];
    const POOL_SIZE = 10;
    
    // 預加載音效
    function preloadSounds() {
        // 預加載煙火音效
        fireworkSound = new Audio('./assets/sounds/firework.mp3');
        fireworkSound.volume = 0;
        fireworkSound.loop = true;
        
        // 預加載秒針音效池
        for (let i = 0; i < POOL_SIZE; i++) {
            const tick = new Audio('./assets/sounds/tick.mp3');
            tick.volume = 0.3;
            tick.preload = 'auto';
            tickSoundPool.push({
                audio: tick,
                inUse: false
            });
        }
    }
    
    // 初始化時預加載
    preloadSounds();
    
    // 從音效池獲取可用的音效
    function getTickSound() {
        for (let i = 0; i < POOL_SIZE; i++) {
            if (!tickSoundPool[i].inUse) {
                tickSoundPool[i].inUse = true;
                return tickSoundPool[i];
            }
        }
        return null;
    }
    
    // 播放秒針聲
    function playTickSound() {
        const soundObj = getTickSound();
        if (!soundObj) return;
        
        const { audio } = soundObj;
        audio.currentTime = 0;
        audio.play().catch(error => {
            console.error('Error playing tick sound:', error);
        }).finally(() => {
            setTimeout(() => {
                soundObj.inUse = false;
            }, 200); // 200ms 後釋放音效
        });
    }
    
    // 初始化音量狀態
    soundOn.classList.remove('hidden');
    soundOff.classList.add('hidden');
    bgMusic.dataset.playing = 'true';
    bgMusic.play().catch(error => {
        console.error('Error playing background music:', error);
    });
    
    // 音樂控制
    soundToggle.addEventListener('click', () => {
        isMuted = !isMuted;
        if (!isMuted) {
            bgMusic.play().catch(error => {
                console.error('Error playing background music:', error);
            });
            soundOn.classList.remove('hidden');
            soundOff.classList.add('hidden');
            bgMusic.dataset.playing = 'true';
            
            // 如果在慶祝階段，恢復煙火音效
            if (!isCountdownActive && fireworkSound) {
                fireworkSound.play();
            }
        } else {
            bgMusic.pause();
            soundOn.classList.add('hidden');
            soundOff.classList.remove('hidden');
            bgMusic.dataset.playing = 'false';
            
            // 暫停煙火音效
            if (fireworkSound) {
                fireworkSound.pause();
            }
        }
    });
    
    // 監聽倒數更新事件
    document.addEventListener('countdown-tick', () => {
        if (!isMuted && isCountdownActive) {
            playTickSound();
        }
    });
    
    // 監聽倒數停止事件
    document.addEventListener('stop-countdown-sound', () => {
        isCountdownActive = false;
    });
    
    // 監聽階段變更事件
    document.addEventListener('stage-changed', (event) => {
        if (event.detail === 'celebration') {
            isCountdownActive = false;
            if (!isMuted) {
                startFireworkSound();
            }
        } else if (event.detail === 'countdown') {
            isCountdownActive = true;
            stopFireworkSound();
        }
    });
    
    function startFireworkSound() {
        if (!fireworkSound) {
            preloadSounds();
        }
        
        fireworkSound.currentTime = 0;
        fireworkSound.volume = 0;
        
        // 使用 requestAnimationFrame 來平滑音量變化
        let volume = 0;
        const fadeIn = () => {
            volume = Math.min(volume + 0.02, 0.5);
            fireworkSound.volume = volume;
            
            if (volume < 0.5) {
                requestAnimationFrame(fadeIn);
            }
        };
        
        fireworkSound.play().catch(error => {
            console.error('Error playing firework sound:', error);
        });
        
        requestAnimationFrame(fadeIn);
    }
    
    function stopFireworkSound() {
        if (fireworkSound) {
            // 使用 requestAnimationFrame 來平滑音量變化
            let volume = fireworkSound.volume;
            const fadeOut = () => {
                volume = Math.max(volume - 0.02, 0);
                fireworkSound.volume = volume;
                
                if (volume > 0) {
                    requestAnimationFrame(fadeOut);
                } else {
                    fireworkSound.pause();
                }
            };
            
            requestAnimationFrame(fadeOut);
        }
    }
    
    // 添加相關的 CSS
    const style = document.createElement('style');
    style.textContent = `
        .sound-toggle {
            transition: transform 0.3s ease;
        }
        
        .sound-toggle:hover {
            transform: scale(1.1);
        }
        
        .sound-toggle:active {
            transform: scale(0.95);
        }
    `;
    document.head.appendChild(style);
    
    // 導出音效控制狀態
    return {
        isMuted: () => isMuted,
        playTickSound,
        startFireworkSound,
        stopFireworkSound
    };
} 