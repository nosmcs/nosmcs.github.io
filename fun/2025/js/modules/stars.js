export function initStars() {
    const starsContainers = ['stars', 'stars2', 'stars3'];
    const starsCounts = [700, 200, 100];
    const starsColors = [
        ['#ffffff', '#ffd700', '#fffacd'],
        ['#ffd700', '#ffb6c1', '#87ceeb'],
        ['#ff69b4', '#4169e1', '#9370db']
    ];
    
    starsContainers.forEach((containerId, index) => {
        const container = document.getElementById(containerId);
        createStars(container, starsCounts[index], starsColors[index]);
    });
    
    // 添加流星
    setInterval(createShootingStar, 2000);
}

function createStars(container, count, colors) {
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.position = 'absolute';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // 隨機大小
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // 隨機顏色
        const color = colors[Math.floor(Math.random() * colors.length)];
        star.style.backgroundColor = color;
        star.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        star.style.borderRadius = '50%';
        
        // 隨機動畫延遲和持續時間
        const delay = Math.random() * 3;
        const duration = 1 + Math.random() * 2;
        star.style.animation = `twinkle ${duration}s infinite ${delay}s`;
        
        // 添加閃爍效果
        if (Math.random() > 0.7) {
            star.classList.add('sparkle');
            star.style.animation = `twinkle ${duration}s infinite ${delay}s, sparkle 1s infinite ${Math.random()}s`;
        }
        
        container.appendChild(star);
    }
}

function createShootingStar() {
    const container = document.getElementById('stars');
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    
    // 隨機起始位置
    const startX = Math.random() * 100;
    shootingStar.style.left = `${startX}%`;
    shootingStar.style.top = '0';
    
    // 隨機角度
    const angle = 30 + Math.random() * 30;
    shootingStar.style.transform = `rotate(${angle}deg)`;
    
    container.appendChild(shootingStar);
    
    // 動畫結束後移除
    setTimeout(() => {
        shootingStar.remove();
    }, 1000);
}

// 添加相關的 CSS
const style = document.createElement('style');
style.textContent = `
    .star {
        position: absolute;
        background-color: #fff;
        border-radius: 50%;
        transition: all 0.3s ease;
    }
    
    .sparkle {
        z-index: 1;
    }
    
    @keyframes sparkle {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.5); filter: brightness(1.5); }
    }
    
    .shooting-star {
        position: absolute;
        width: 2px;
        height: 50px;
        background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 1) 50%,
            rgba(255, 255, 255, 0) 100%
        );
        animation: shoot 1s linear;
        pointer-events: none;
    }
    
    @keyframes shoot {
        from {
            transform: translateY(0) rotate(var(--angle));
            opacity: 1;
        }
        to {
            transform: translateY(100vh) rotate(var(--angle));
            opacity: 0;
        }
    }
    
    @keyframes twinkle {
        0%, 100% { opacity: 0.3; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(style); 