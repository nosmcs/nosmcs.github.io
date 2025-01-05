let countdownInterval;
let isPaused = false;

export function initCountdown() {
    const targetDate = new Date('2025-01-01T00:00:00');
    
    // 監聽暫停和恢復事件
    document.addEventListener('pause-countdown', () => {
        isPaused = true;
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
    });
    
    document.addEventListener('resume-countdown', () => {
        isPaused = false;
        startCountdown(targetDate);
    });
    
    startCountdown(targetDate);
}

function startCountdown(targetDate) {
    if (isPaused) return;
    
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    function updateCountdown() {
        if (isPaused) return;
        
        const currentDate = new Date();
        const timeDifference = targetDate - currentDate;
        
        if (timeDifference <= 0) {
            clearInterval(countdownInterval);
            document.dispatchEvent(new CustomEvent('countdown-complete'));
            return;
        }
        
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
        // 觸發倒數聲效事件
        document.dispatchEvent(new CustomEvent('countdown-tick'));
        
        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
} 