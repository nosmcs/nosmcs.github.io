import { Vortex } from './vortex.js';
import { AudioManager } from './audio.js';

class App {
    constructor() {
        this.canvas = document.getElementById('vortexCanvas');
        this.vortex = new Vortex(this.canvas);
        this.audio = new AudioManager();
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.mouseSpeedHistory = new Array(5).fill(0);
        this.setupMouseTracking();
        this.setupTouchTracking();
    }

    setupMouseTracking() {
        let lastTime = performance.now();
        
        window.addEventListener('mousemove', (e) => {
            const currentTime = performance.now();
            const deltaTime = (currentTime - lastTime) / 1000;
            lastTime = currentTime;

            const dx = e.clientX - this.lastMouseX;
            const dy = e.clientY - this.lastMouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const speed = distance / deltaTime;

            // 使用移動平均來平滑速度
            this.mouseSpeedHistory.shift();
            this.mouseSpeedHistory.push(speed);
            const averageSpeed = this.mouseSpeedHistory.reduce((a, b) => a + b) / this.mouseSpeedHistory.length;

            if (averageSpeed > 30) { // 降低觸發閾值，使音效更容易觸發
                this.audio.playVortexSound(Math.min(averageSpeed / 800, 1));
            }

            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
        });

        // 添加滑鼠按下效果
        window.addEventListener('mousedown', () => {
            this.vortex.rotationSpeed = 0.005; // 加快旋轉
        });

        window.addEventListener('mouseup', () => {
            this.vortex.rotationSpeed = 0.001; // 恢復正常速度
        });
    }

    setupTouchTracking() {
        let lastTouchX = 0;
        let lastTouchY = 0;
        let lastTime = performance.now();

        window.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const currentTime = performance.now();
            const deltaTime = (currentTime - lastTime) / 1000;

            const dx = touch.clientX - lastTouchX;
            const dy = touch.clientY - lastTouchY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const speed = distance / deltaTime;

            if (speed > 30) {
                this.audio.playVortexSound(Math.min(speed / 800, 1));
            }

            this.vortex.mouseX = touch.clientX;
            this.vortex.mouseY = touch.clientY;
            this.vortex.isActive = true;

            lastTouchX = touch.clientX;
            lastTouchY = touch.clientY;
            lastTime = currentTime;
        });

        window.addEventListener('touchend', () => {
            this.vortex.isActive = false;
        });
    }

    start() {
        // 添加歡迎訊息
        const info = document.querySelector('.info h1');
        info.style.opacity = '1';
        
        // 啟動動畫
        this.vortex.animate();
    }
}

// 等待 DOM 加載完成後初始化應用
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.start();
}); 