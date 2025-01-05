export class UI {
    constructor() {
        this.eventCard = document.querySelector('.event-card');
        this.notification = document.getElementById('notification');
        this.notificationText = document.querySelector('.notification-text');
    }

    displayEvent(event) {
        if (!event) return;

        this.eventCard.classList.remove('hidden');
        this.eventCard.querySelector('.event-title').textContent = 
            `${event.date ? new Date(event.date).toLocaleDateString('zh-TW') : ''} 的時間事件`;
        
        this.eventCard.querySelector('.event-description').textContent = event.description;
        
        // 設置插圖
        const illustration = this.eventCard.querySelector('.event-illustration');
        illustration.style.backgroundImage = event.illustration 
            ? `url(${event.illustration})` 
            : 'linear-gradient(45deg, var(--color-primary), var(--color-accent))';
        
        // 添加動畫效果
        this.eventCard.style.animation = 'fadeIn 0.5s ease-in-out';
    }

    showNotification(message, duration = 3000) {
        this.notificationText.textContent = message;
        this.notification.classList.add('show');
        
        setTimeout(() => {
            this.notification.classList.remove('show');
        }, duration);
    }

    clearEvent() {
        this.eventCard.classList.add('hidden');
    }

    updateCurrentDate(date) {
        document.querySelector('.current-date').textContent = 
            new Date(date).toLocaleDateString('zh-TW', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
    }

    addLoadingEffect(element) {
        element.classList.add('loading');
        setTimeout(() => element.classList.remove('loading'), 1000);
    }
} 