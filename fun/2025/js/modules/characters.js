export function initCharacters() {
    const char1 = document.getElementById('char1');
    const char2 = document.getElementById('char2');
    
    // 設置角色圖片
    char1.style.backgroundImage = "url('../assets/images/char1.png')";
    char2.style.backgroundImage = "url('../assets/images/char2.png')";
    
    // 添加互動效果
    [char1, char2].forEach(char => {
        char.addEventListener('mouseover', () => {
            char.style.transform = 'scale(1.1) translateY(-10px)';
            char.style.transition = 'transform 0.3s ease';
        });
        
        char.addEventListener('mouseout', () => {
            char.style.transform = 'scale(1) translateY(0)';
        });
    });
    
    // 角色動畫
    function animateCharacters() {
        // 隨機動作
        const actions = [
            'jump',
            'wave',
            'spin',
            'dance'
        ];
        
        [char1, char2].forEach(char => {
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            char.classList.remove(...actions);
            char.classList.add(randomAction);
            
            // 移除動作類別，準備下一次動畫
            setTimeout(() => {
                char.classList.remove(randomAction);
            }, 2000);
        });
        
        // 每3-7秒執行一次隨機動作
        setTimeout(animateCharacters, 3000 + Math.random() * 4000);
    }
    
    // 開始角色動畫
    animateCharacters();
    
    // 添加相關的 CSS
    const style = document.createElement('style');
    style.textContent = `
        .character {
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        
        @keyframes jump {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-30px); }
        }
        
        @keyframes wave {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-15deg); }
            75% { transform: rotate(15deg); }
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        @keyframes dance {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-20px) rotate(-15deg); }
            50% { transform: translateY(0) rotate(0deg); }
            75% { transform: translateY(-20px) rotate(15deg); }
        }
        
        .jump { animation: jump 1s ease infinite; }
        .wave { animation: wave 1s ease infinite; }
        .spin { animation: spin 1s linear infinite; }
        .dance { animation: dance 2s ease infinite; }
    `;
    document.head.appendChild(style);
} 