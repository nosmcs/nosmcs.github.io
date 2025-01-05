export class TimelineEvents {
    constructor() {
        this.predefinedEvents = [
            {
                date: '1969-07-20',
                description: '阿波羅11號登月！不過根據時間旅行者的記載，其實是外星人在暗中協助的...',
                type: 'historical'
            },
            {
                date: '2045-03-15',
                description: '第一台真正的時光機被發明了！不過發明者把說明書弄丟了，至今沒人知道怎麼用。',
                type: 'future'
            },
            {
                date: '1876-03-10',
                description: '亞歷山大·格雷厄姆·貝爾發明電話。有趣的是，第一通電話其實是打給未來的！',
                type: 'historical'
            }
        ];
        
        this.futuristicEvents = [
            '人工智能終於學會了如何煮出完美的開水泡麵',
            '火星上發現了會說中文的外星貓',
            '科學家發明了能夠把夢境錄製下來的裝置',
            '全球第一座水下城市開始營運',
            '飛行汽車終於開始量產，但停車還是一樣難'
        ];
        
        this.historicalEvents = [
            '考古學家發現，金字塔其實是古代的巨大充電站',
            '莎士比亞的作品其實是從未來穿越回去的劇作家寫的',
            '恐龍滅絕的真相：他們集體決定搭乘飛碟離開地球',
            '萬里長城原本是用來防禦時空入侵者的',
            '最初的網際網路其實是通過腦電波傳輸的'
        ];
    }

    getRandomEvent() {
        const events = [...this.predefinedEvents];
        return events[Math.floor(Math.random() * events.length)];
    }

    generateRandomEventForDate(date) {
        const eventDate = new Date(date);
        const currentDate = new Date();
        const isFuture = eventDate > currentDate;
        
        const eventPool = isFuture ? this.futuristicEvents : this.historicalEvents;
        const randomDescription = eventPool[Math.floor(Math.random() * eventPool.length)];
        
        return {
            date,
            description: randomDescription,
            type: isFuture ? 'future' : 'historical'
        };
    }

    getEventByDate(date) {
        return this.predefinedEvents.find(event => event.date === date);
    }

    getTodayEvent() {
        const today = new Date().toISOString().split('T')[0];
        return this.getEventByDate(today) || this.generateRandomEventForDate(today);
    }

    addPredefinedEvent(event) {
        this.predefinedEvents.push(event);
    }
} 