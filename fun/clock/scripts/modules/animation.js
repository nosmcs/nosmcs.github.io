// 初始化動畫效果
export function initAnimation() {
    const clock = document.querySelector('.clock');
    
    // 添加鼠標移動事件監聽器
    document.addEventListener('mousemove', (e) => {
        if (!clock) return;
        
        // 計算鼠標位置相對於視窗中心的偏移
        const rect = clock.getBoundingClientRect();
        const clockCenterX = rect.left + rect.width / 2;
        const clockCenterY = rect.top + rect.height / 2;
        
        // 計算鼠標與時鐘中心的距離
        const deltaX = e.clientX - clockCenterX;
        const deltaY = e.clientY - clockCenterY;
        
        // 減小旋轉角度範圍
        const rotateX = Math.min(Math.max(deltaY * 0.05, -15), 15);
        const rotateY = Math.min(Math.max(-deltaX * 0.05, -15), 15);
        
        // 應用3D變換，保持基礎角度
        clock.style.transform = `
            rotateX(${10 + rotateX}deg)
            rotateY(${-10 + rotateY}deg)
            translateZ(50px)
        `;
    });
    
    // 添加鼠標離開事件監聽器
    document.addEventListener('mouseleave', () => {
        if (!clock) return;
        
        // 重置到默認位置
        clock.style.transform = 'rotateX(10deg) rotateY(-10deg)';
    });
    
    // 添加數字懸停效果
    const numbers = document.querySelectorAll('.number');
    numbers.forEach(number => {
        number.addEventListener('mouseenter', () => {
            number.style.transform = `${number.style.transform} scale(1.2)`;
            number.style.textShadow = '0 0 20px var(--primary-color)';
        });
        
        number.addEventListener('mouseleave', () => {
            number.style.transform = number.style.transform.replace(' scale(1.2)', '');
            number.style.textShadow = '';
        });
    });
}

// 創建脈動效果
export function createPulseEffect(element) {
    element.classList.add('pulse');
    setTimeout(() => {
        element.classList.remove('pulse');
    }, 1000);
}

// 創建過渡效果
export function createTransitionEffect(element, callback) {
    element.style.transition = 'all 0.5s ease-in-out';
    callback();
    setTimeout(() => {
        element.style.transition = '';
    }, 500);
} 