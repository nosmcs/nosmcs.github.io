// 創建數字元素
export function createNumberElements(ring, count) {
    // 清空現有元素
    ring.innerHTML = '';
    
    // 創建新的數字元素
    for (let i = 0; i < count; i++) {
        const number = document.createElement('div');
        number.className = 'number';
        number.textContent = i.toString().padStart(2, '0');
        ring.appendChild(number);
    }
}

// 更新數字位置
export function updateNumberPositions(ring, count, angle, activeNumber) {
    const numbers = ring.querySelectorAll('.number');
    const radius = ring.offsetWidth / 2 - 40;
    
    numbers.forEach((number, index) => {
        // 計算每個數字的位置
        const numberAngle = (index * (360 / count) - angle) * (Math.PI / 180);
        const x = Math.sin(numberAngle) * radius;
        const y = -Math.cos(numberAngle) * radius;
        
        // 設算與當前時間的距離
        let distance = Math.abs(index - activeNumber);
        // 處理跨越0的情況
        if (distance > count / 2) {
            distance = count - distance;
        }
        
        // 使用更平滑的透明度曲線
        const maxDistance = count / 6; // 縮小可見範圍
        const opacity = distance > maxDistance 
            ? 0.1 
            : Math.cos((distance / maxDistance) * (Math.PI / 2));
        
        // 計算縮放值
        const scale = distance === 0 ? 1.2 : 1 - (distance / maxDistance) * 0.1;
        
        // 計算模糊值
        const blur = distance > maxDistance 
            ? 2
            : distance * (2 / maxDistance);
        
        // 更新樣式
        number.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        number.style.opacity = opacity;
        number.style.filter = `blur(${blur}px)`;
        
        // 更新活動狀態
        if (index === activeNumber) {
            number.classList.add('active');
            number.style.filter = 'blur(0)';
            number.style.textShadow = '0 0 15px var(--primary-color)';
        } else {
            number.classList.remove('active');
            number.style.textShadow = 'none';
        }
    });
}

// 格式化數字為兩位數
export function padNumber(num) {
    return num.toString().padStart(2, '0');
}

// 計算角度
export function calculateAngle(value, total) {
    return (value / total) * 360;
} 