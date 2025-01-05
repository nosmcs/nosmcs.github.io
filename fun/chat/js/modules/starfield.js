export class Starfield {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            starCount: options.starCount || 100,
            minSize: options.minSize || 1,
            maxSize: options.maxSize || 3,
            minDuration: options.minDuration || 2,
            maxDuration: options.maxDuration || 5
        };
        this.init();
    }

    init() {
        for (let i = 0; i < this.options.starCount; i++) {
            this.createStar();
        }
    }

    createStar() {
        const star = document.createElement('div');
        star.className = 'star';
        
        // 隨機位置
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // 隨機大小
        const size = this.options.minSize + Math.random() * (this.options.maxSize - this.options.minSize);
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // 隨機動畫持續時間
        const duration = this.options.minDuration + 
            Math.random() * (this.options.maxDuration - this.options.minDuration);
        star.style.setProperty('--duration', `${duration}s`);
        
        this.container.appendChild(star);
    }
} 