export class Calendar {
    constructor() {
        this.currentDate = new Date();
        this.calendarDays = document.getElementById('calendarDays');
        this.monthDisplay = document.getElementById('currentMonth');
    }

    init() {
        this.renderCalendar();
    }

    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // 更新月份顯示
        this.monthDisplay.textContent = `${year}年 ${month + 1}月`;
        
        // 清空日曆
        this.calendarDays.innerHTML = '';
        
        // 獲取當月第一天和最後一天
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        // 計算需要的空白天數
        const firstDayOfWeek = firstDay.getDay();
        
        // 添加空白天數
        for (let i = 0; i < firstDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            this.calendarDays.appendChild(emptyDay);
        }
        
        // 添加當月天數
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            // 設置日期數據
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            dayElement.dataset.date = dateStr;
            
            // 標記今天
            const today = new Date();
            if (year === today.getFullYear() && 
                month === today.getMonth() && 
                day === today.getDate()) {
                dayElement.classList.add('today');
            }
            
            this.calendarDays.appendChild(dayElement);
        }
    }

    previousMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.renderCalendar();
    }

    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.renderCalendar();
    }
} 