import { createNumberElements, updateNumberPositions } from './utils.js';

export class Clock {
    constructor() {
        this.hoursRing = document.querySelector('.number-ring.hours');
        this.minutesRing = document.querySelector('.number-ring.minutes');
        this.secondsRing = document.querySelector('.number-ring.seconds');
        this.cityNameElement = document.querySelector('.city-name');
        this.timeDisplay = document.querySelector('.time-display');
        this.dateDisplay = document.querySelector('.date-display');
        this.clockElement = document.querySelector('.clock');
        
        this.currentTimeZone = 'Asia/Taipei';
        this.currentRegion = 'asia';
        this.animationFrame = null;
        
        this.initializeRings();
    }

    initializeRings() {
        // 為每個環創建數字元素
        createNumberElements(this.hoursRing, 12);
        createNumberElements(this.minutesRing, 60);
        createNumberElements(this.secondsRing, 60);
    }

    updateTimeZone(timeZone) {
        if (this.isChanging || timeZone === this.currentTimeZone) return;
        
        this.isChanging = true;
        
        const clock = document.querySelector('.clock');
        const cityInfo = document.querySelector('.city-info');
        
        cityInfo.classList.add('changing');
        clock.classList.add('changing');
        
        // 獲取新的地區
        let region = timeZone.split('/')[0].toLowerCase();
        
        // 特殊處理 Pacific 和 Australia 時區
        if (timeZone.startsWith('Pacific/') || timeZone.startsWith('Australia/')) {
            region = 'oceania';
        }
        
        // 更新CSS變量
        document.documentElement.style.setProperty('--primary-color', `var(--${region}-color)`);
        
        // 更新選中項的樣式
        const allItems = document.querySelectorAll('.select-item');
        allItems.forEach(item => {
            item.classList.remove('selected');
            if (item.getAttribute('data-value') === timeZone) {
                item.classList.add('selected');
            }
        });
        
        setTimeout(() => {
            this.currentTimeZone = timeZone;
            this.currentRegion = region;
            
            const cityName = timeZone.split('/').pop().replace('_', ' ');
            this.cityNameElement.textContent = cityName;
            
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }
            
            this.updateClock();
            
            requestAnimationFrame(() => {
                cityInfo.classList.remove('changing');
                clock.classList.remove('changing');
                this.isChanging = false;
            });
        }, 150);
    }

    updateClock() {
        const now = new Date();
        
        // 更新時間顯示
        const timeString = now.toLocaleTimeString('zh-TW', {
            timeZone: this.currentTimeZone,
            hour12: false
        });
        this.timeDisplay.textContent = timeString;

        // 更新日期顯示
        const dateString = now.toLocaleDateString('zh-TW', {
            timeZone: this.currentTimeZone,
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
        this.dateDisplay.textContent = dateString;

        // 獲取時區調整後的時間
        const timeZoneDate = new Date(now.toLocaleString('en-US', {
            timeZone: this.currentTimeZone
        }));

        const hours = timeZoneDate.getHours();
        const minutes = timeZoneDate.getMinutes();
        const seconds = timeZoneDate.getSeconds();
        const milliseconds = timeZoneDate.getMilliseconds();

        // 計算精確的角度，包含毫秒級平滑過渡
        const hoursAngle = (hours % 12 + minutes / 60) * (360 / 12);
        const minutesAngle = (minutes + seconds / 60) * (360 / 60);
        const secondsAngle = (seconds + milliseconds / 1000) * (360 / 60);

        // 更新數字位置
        updateNumberPositions(this.hoursRing, 12, hoursAngle, hours % 12);
        updateNumberPositions(this.minutesRing, 60, minutesAngle, minutes);
        updateNumberPositions(this.secondsRing, 60, secondsAngle, seconds);

        // 請求下一幀更新
        this.animationFrame = requestAnimationFrame(() => this.updateClock());
    }

    start() {
        // 如果已經在運行，先停止當前動畫
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        // 使用初始時區（台北）啟動時鐘
        this.updateTimeZone('Asia/Taipei');
        
        // 開始時鐘更新
        this.updateClock();
    }
} 