// 從文件讀取 Pi 值
let PI = '';
let isSearching = false;

// 讀取 Pi 值
async function loadPi() {
    try {
        const response = await fetch('pi.txt');
        if (!response.ok) throw new Error('網路響應失敗');
        PI = await response.text();
        console.log(`Pi 值已載入，共 ${PI.length} 位數字`);
        initializeInputs();
        document.getElementById('searchBtn').disabled = false;
    } catch (error) {
        console.error('載入 Pi 值時發生錯誤:', error);
        showError('無法載入 Pi 值，請重新整理頁面');
    }
}

// 初始化輸入框和事件監聽
function initializeInputs() {
    const yearInput = document.getElementById('year');
    const monthInput = document.getElementById('month');
    const dayInput = document.getElementById('day');
    const searchBtn = document.getElementById('searchBtn');

    // 添加輸入驗證
    yearInput.addEventListener('input', () => {
        validateInput(yearInput, 1, 9999);
        updateSearchButtonState();
    });
    monthInput.addEventListener('input', () => {
        validateInput(monthInput, 1, 12);
        updateSearchButtonState();
    });
    dayInput.addEventListener('input', () => {
        validateInput(dayInput, 1, 31);
        updateSearchButtonState();
    });

    // 按鍵事件：Enter 鍵跳轉
    const inputs = [yearInput, monthInput, dayInput];
    inputs.forEach((input, index) => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                } else if (isValidDate()) {
                    searchBtn.click();
                }
            }
        });
    });

    // 自動跳到下一個輸入框
    yearInput.addEventListener('input', () => {
        if (yearInput.value.length >= 4) monthInput.focus();
    });
    monthInput.addEventListener('input', () => {
        if (monthInput.value.length >= 2) dayInput.focus();
    });

    // 搜索按鈕事件監聽器
    searchBtn.addEventListener('click', () => {
        if (!isSearching && isValidDate()) {
            searchBirthday();
        }
    });
}

// 驗證輸入值
function validateInput(input, min, max) {
    let value = parseInt(input.value);
    if (isNaN(value) || value === 0) {
        input.value = '';
    } else if (value < min) {
        input.value = min;
    } else if (value > max) {
        input.value = max;
    }
    return input.value !== '';
}

// 檢查日期是否有效
function isValidDate() {
    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;
    const day = document.getElementById('day').value;

    if (!year || !month || !day) return false;

    const date = new Date(year, month - 1, day);
    return date.getFullYear() == year && 
           date.getMonth() == month - 1 && 
           date.getDate() == day;
}

// 更新搜索按鈕狀態
function updateSearchButtonState() {
    const searchBtn = document.getElementById('searchBtn');
    searchBtn.disabled = !isValidDate();
}

// 在 Pi 中搜索日期
function searchInPi(dateStr) {
    if (!PI) {
        showError('Pi 值尚未載入完成，請稍候再試');
        return null;
    }

    const index = PI.indexOf(dateStr);
    if (index === -1) {
        return null;
    }
    return {
        position: index + 1,
        before: PI.slice(Math.max(0, index - 5), index),
        match: dateStr,
        after: PI.slice(index + dateStr.length, index + dateStr.length + 5)
    };
}

// 搜索生日
async function searchBirthday() {
    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;
    const day = document.getElementById('day').value;
    
    if (!isValidDate()) {
        showError('請輸入有效的日期！');
        return;
    }

    // 開始搜尋動畫
    isSearching = true;
    showLoading(true);
    document.getElementById('result').classList.add('hidden');

    // 格式化數字，確保有前導零
    const paddedMonth = month.toString().padStart(2, '0');
    const paddedDay = day.toString().padStart(2, '0');
    
    try {
        // 延遲執行以顯示動畫
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // 嘗試不同的日期格式
        const dateFormats = generateDateFormats(year, paddedMonth, paddedDay);
        
        let result = null;
        let matchedFormat = '';
        
        for (const format of dateFormats) {
            result = searchInPi(format);
            if (result) {
                matchedFormat = format;
                break;
            }
        }
        
        displayResult(result, matchedFormat, {year, month: paddedMonth, day: paddedDay});
    } catch (error) {
        showError('搜尋過程中發生錯誤，請重試');
    } finally {
        // 結束搜尋動畫
        showLoading(false);
        isSearching = false;
    }
}

// 生成不同的日期格式組合
function generateDateFormats(year, month, day) {
    const formats = [
        `${year}${month}${day}`,                // YYYYMMDD
        `${year.slice(-2)}${month}${day}`,      // YYMMDD
        year,                                    // YYYY
        year.slice(-2),                          // YY
        `${month}${day}`,                       // MMDD
        `${parseInt(month)}${day}`,             // MDD
        `${month}${parseInt(day)}`,             // MMD
        `${year}${month}`,                      // YYYYMM
        `${year.slice(-2)}${month}`,            // YYMM
        `${year}${day}`,                        // YYYYDD
        `${year.slice(-2)}${day}`               // YYDD
    ];
    
    return [...new Set(formats)]; // 移除重複的格式
}

// 顯示錯誤訊息
function showError(message) {
    const resultDiv = document.getElementById('result');
    const piDisplay = document.getElementById('piDisplay');
    const positionInfo = document.getElementById('positionInfo');
    
    resultDiv.classList.remove('hidden');
    resultDiv.style.display = 'block';
    piDisplay.innerHTML = `<div class="text-red-500">❌ ${message}</div>`;
    positionInfo.textContent = '';
}

// 顯示/隱藏載入動畫
function showLoading(show) {
    const loadingDiv = document.getElementById('loading');
    const searchBtn = document.getElementById('searchBtn');
    
    loadingDiv.style.display = show ? 'block' : 'none';
    searchBtn.disabled = show;
    searchBtn.classList.toggle('opacity-50', show);
}

// 顯示結果
function displayResult(result, matchedFormat, dateInfo) {
    const resultDiv = document.getElementById('result');
    const piDisplay = document.getElementById('piDisplay');
    const positionInfo = document.getElementById('positionInfo');
    
    resultDiv.style.display = 'block';
    
    if (result) {
        // 添加動畫效果
        resultDiv.classList.remove('fade-in');
        void resultDiv.offsetWidth; // 觸發重排
        resultDiv.classList.add('fade-in');
        
        piDisplay.innerHTML = `
            <div class="text-center mb-4">
                <span class="text-green-500 text-2xl">✨</span>
            </div>
            <div class="text-center">
                ...${result.before}<span class="text-red-500 font-bold text-xl">${result.match}</span>${result.after}...
            </div>
        `;
        
        // 根據匹配的格式提供不同的描述
        let formatDescription = getFormatDescription(matchedFormat, dateInfo);
        
        positionInfo.innerHTML = `
            <div class="text-center">
                <p class="text-lg font-semibold text-yellow-500 mb-2">找到了！🎉</p>
                <p>你的生日 ${dateInfo.year}年${dateInfo.month}月${dateInfo.day}日</p>
                <p>以 <span class="font-mono bg-gray-100 px-2 py-1 rounded">${formatDescription}</span> 的格式</p>
                <p>出現在 π 的第 <span class="font-bold text-yellow-500">${result.position}</span> 位！</p>
            </div>
        `;
    } else {
        piDisplay.innerHTML = `
            <div class="text-center">
                <span class="text-yellow-500 text-2xl">🔍</span>
                <p class="mt-2">在前10000位中未找到符合的數字</p>
            </div>
        `;
        positionInfo.innerHTML = `
            <div class="text-center">
                <p>已嘗試所有可能的數字組合</p>
                <p>建議嘗試不同的日期格式</p>
            </div>
        `;
    }
}

// 獲取格式描述
function getFormatDescription(matchedFormat, dateInfo) {
    if (matchedFormat === dateInfo.year) {
        return `完整年份 (${matchedFormat})`;
    } else if (matchedFormat === dateInfo.year.slice(-2)) {
        return `年份後兩位 (${matchedFormat})`;
    } else if (matchedFormat.length === 8) {
        return `完整年月日 (${matchedFormat})`;
    } else if (matchedFormat.length === 6 && matchedFormat === `${dateInfo.year.slice(-2)}${dateInfo.month}${dateInfo.day}`) {
        return `年份後兩位加月日 (${matchedFormat})`;
    } else if (matchedFormat.length === 4) {
        return `月日 (${matchedFormat})`;
    } else if (matchedFormat.length === 6) {
        if (matchedFormat === `${dateInfo.year}${dateInfo.month}`) {
            return `年月 (${matchedFormat})`;
        } else if (matchedFormat === `${dateInfo.year.slice(-2)}${dateInfo.month}`) {
            return `年份後兩位加月 (${matchedFormat})`;
        }
    }
    return `格式 (${matchedFormat})`;
}

// 初始化 Pi 值載入
document.addEventListener('DOMContentLoaded', loadPi);