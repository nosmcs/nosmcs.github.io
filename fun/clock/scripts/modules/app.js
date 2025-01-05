import { Clock } from './clock.js';
import { TimeZones } from './timeZones.js';
import { initAnimation } from './animation.js';

class App {
    constructor() {
        this.clock = null;
        this.timeZones = null;
        this.customSelect = document.querySelector('.custom-select');
        this.selectedElement = document.querySelector('.select-selected');
        this.selectItems = document.querySelector('.select-items');
        this.loader = document.getElementById('loader');
        this.init();
    }

    init() {
        // 顯示載入畫面
        this.loader.classList.remove('hidden');

        // 初始化時鐘和時區
        this.clock = new Clock();
        this.timeZones = new TimeZones();
        
        // 初始化動畫
        initAnimation();
        
        // 綁定事件
        this.bindEvents();
        
        // 開始更新時鐘
        this.startClock();

        // 3秒後隱藏載入畫面
        setTimeout(() => {
            this.loader.classList.add('hidden');
        }, 3000);
    }

    bindEvents() {
        // 綁定自定義選擇器的點擊事件
        this.customSelect.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleSelect();
        });

        // 綁定選項點擊事件
        this.selectItems.addEventListener('click', (e) => {
            const item = e.target.closest('.select-item');
            if (item) {
                const value = item.getAttribute('data-value');
                const text = item.textContent;
                this.updateSelect(value, text);
                e.stopPropagation(); // 防止事件冒泡
            }
        });

        // 點擊其他地方關閉選擇器
        document.addEventListener('click', () => {
            this.closeSelect();
        });

        // 移除 select-hide 類，確保選項可見
        this.selectItems.classList.remove('select-hide');
    }

    toggleSelect() {
        const isOpen = this.selectItems.classList.contains('select-show');
        if (isOpen) {
            this.closeSelect();
        } else {
            this.openSelect();
        }
    }

    openSelect() {
        this.selectItems.classList.add('select-show');
        this.selectedElement.classList.add('select-arrow-active');
    }

    closeSelect() {
        this.selectItems.classList.remove('select-show');
        this.selectedElement.classList.remove('select-arrow-active');
    }

    updateSelect(value, text) {
        this.selectedElement.textContent = text;
        this.closeSelect(); // 關閉選單
        this.clock.updateTimeZone(value);
    }

    startClock() {
        this.clock.start();
    }
}

// 當 DOM 加載完成後初始化應用
document.addEventListener('DOMContentLoaded', () => {
    new App();
});

export default App; 