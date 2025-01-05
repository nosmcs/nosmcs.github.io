import { Calendar } from './modules/calendar.js';
import { EventManager } from './modules/eventManager.js';
import { UI } from './modules/ui.js';
import { TimelineEvents } from './modules/timelineEvents.js';

document.addEventListener('DOMContentLoaded', () => {
    const calendar = new Calendar();
    const eventManager = new EventManager();
    const ui = new UI();
    const timelineEvents = new TimelineEvents();

    // 初始化日曆
    calendar.init();

    // 設置隨機時間跳躍按鈕事件
    document.getElementById('randomTimeBtn').addEventListener('click', () => {
        const randomEvent = timelineEvents.getRandomEvent();
        ui.displayEvent(randomEvent);
    });

    // 設置日曆日期點擊事件
    document.getElementById('calendarDays').addEventListener('click', (e) => {
        if (e.target.classList.contains('calendar-day')) {
            const date = e.target.dataset.date;
            const event = timelineEvents.getEventByDate(date) || timelineEvents.generateRandomEventForDate(date);
            ui.displayEvent(event);
        }
    });

    // 設置事件提交表單
    document.getElementById('eventSubmitForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('eventDate').value;
        const description = document.getElementById('eventDescription').value;
        
        eventManager.submitEvent({ date, description });
        ui.showNotification('事件已成功提交！');
        e.target.reset();
    });

    // 設置月份導航按鈕
    document.getElementById('prevMonth').addEventListener('click', () => calendar.previousMonth());
    document.getElementById('nextMonth').addEventListener('click', () => calendar.nextMonth());

    // 顯示今日事件
    const todayEvent = timelineEvents.getTodayEvent();
    if (todayEvent) {
        ui.displayEvent(todayEvent);
        ui.showNotification('今日有新的時間事件！');
    }
}); 