export class TimeZones {
    constructor() {
        this.zones = {
            // 亞洲
            'Asia/Tokyo': '東京',
            'Asia/Shanghai': '上海',
            'Asia/Hong_Kong': '香港',
            'Asia/Singapore': '新加坡',
            'Asia/Seoul': '首爾',
            'Asia/Dubai': '杜拜',
            'Asia/Bangkok': '曼谷',
            'Asia/Taipei': '台北',
            'Asia/Osaka': '大阪',
            'Asia/Beijing': '北京',

            // 歐洲
            'Europe/London': '倫敦',
            'Europe/Paris': '巴黎',
            'Europe/Berlin': '柏林',
            'Europe/Rome': '羅馬',
            'Europe/Madrid': '馬德里',
            'Europe/Amsterdam': '阿姆斯特丹',
            'Europe/Moscow': '莫斯科',
            'Europe/Vienna': '維也納',
            'Europe/Athens': '雅典',
            'Europe/Stockholm': '斯德哥爾摩',

            // 北美洲
            'America/New_York': '紐約',
            'America/Los_Angeles': '洛杉磯',
            'America/Chicago': '芝加哥',
            'America/Toronto': '多倫多',
            'America/Vancouver': '溫哥華',
            'America/Mexico_City': '墨西哥城',
            'America/Miami': '邁阿密',
            'America/San_Francisco': '舊金山',

            // 南美洲
            'America/Sao_Paulo': '聖保羅',
            'America/Buenos_Aires': '布宜諾斯艾利斯',
            'America/Santiago': '聖地亞哥',
            'America/Lima': '利馬',
            'America/Bogota': '波哥大',
            'America/Caracas': '卡拉卡斯',

            // 大洋洲
            'Australia/Sydney': '雪梨',
            'Australia/Melbourne': '墨爾本',
            'Pacific/Auckland': '奧克蘭',
            'Australia/Brisbane': '布里斯本',
            'Australia/Perth': '伯斯',
            'Pacific/Honolulu': '檀香山',
            'Pacific/Fiji': '斐濟',
            'Pacific/Guam': '關島',

            // 非洲
            'Africa/Cairo': '開羅',
            'Africa/Johannesburg': '約翰尼斯堡',
            'Africa/Lagos': '拉各斯',
            'Africa/Nairobi': '奈洛比',
            'Africa/Casablanca': '卡薩布蘭卡',
            'Africa/Addis_Ababa': '亞的斯亞貝巴',
            'Africa/Accra': '阿克拉',
            'Africa/Tunis': '突尼斯',

            // 南極洲
            'Antarctica/McMurdo': '麥克默多站',
            'Antarctica/Casey': '凱西站',
            'Antarctica/Davis': '戴維斯站',
            'Antarctica/Palmer': '帕爾默站'
        };
    }

    // 獲取時區的當地時間
    getLocalTime(timeZone) {
        return new Date().toLocaleString('zh-TW', {
            timeZone,
            hour12: false
        });
    }

    // 獲取時區的時差（相對於UTC）
    getOffset(timeZone) {
        const date = new Date();
        const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
        const tzDate = new Date(date.toLocaleString('en-US', { timeZone }));
        return (tzDate - utcDate) / (60 * 60 * 1000);
    }

    // 檢查時區是否有效
    isValidTimeZone(timeZone) {
        return timeZone in this.zones;
    }

    // 獲取所有支持的時區
    getAllTimeZones() {
        return Object.keys(this.zones);
    }

    // 獲取時區的顯示名稱
    getDisplayName(timeZone) {
        return this.zones[timeZone] || timeZone;
    }
} 