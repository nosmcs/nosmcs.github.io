export function initMeteors() {
    const meteorContainer = document.querySelector('.meteor-container');
    
    function createMeteor() {
        const meteor = document.createElement('div');
        meteor.className = 'meteor';
        
        // 隨機起始位置
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        meteor.style.left = `${startX}%`;
        meteor.style.top = `${startY}%`;
        
        // 隨機大小
        const size = 2 + Math.random() * 3;
        meteor.style.width = `${size}px`;
        meteor.style.height = `${size * 25}px`;
        
        // 隨機角度
        const angle = 15 + Math.random() * 30;
        meteor.style.transform = `rotate(${angle}deg)`;
        
        // 隨機動畫持續時間
        const duration = 1 + Math.random() * 2;
        meteor.style.animation = `meteor ${duration}s linear`;
        
        // 動畫結束後移除
        meteor.addEventListener('animationend', () => {
            meteor.remove();
        });
        
        return meteor;
    }
    
    function spawnMeteor() {
        const meteor = createMeteor();
        meteorContainer.appendChild(meteor);
        
        // 隨機間隔後產生下一個流星
        const nextSpawn = 3000 + Math.random() * 5000;
        setTimeout(spawnMeteor, nextSpawn);
    }
    
    // 開始產生流星
    spawnMeteor();
    
    // 添加相關的 CSS
    const style = document.createElement('style');
    style.textContent = `
        .meteor {
            position: absolute;
            background: linear-gradient(45deg, 
                rgba(255, 255, 255, 1) 0%,
                rgba(255, 255, 255, 0.8) 20%,
                rgba(255, 255, 255, 0) 100%);
            pointer-events: none;
            z-index: 1;
        }
        
        @keyframes meteor {
            0% {
                opacity: 1;
                transform: translate(0, 0) rotate(var(--angle));
            }
            100% {
                opacity: 0;
                transform: translate(-500px, 500px) rotate(var(--angle));
            }
        }
    `;
    document.head.appendChild(style);
} 