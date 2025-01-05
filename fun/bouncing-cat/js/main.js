import { Cat } from './modules/cat.js';
import { MessageSystem } from './modules/message-system.js';

document.addEventListener('DOMContentLoaded', () => {
    const cat = new Cat();
    const messageSystem = new MessageSystem();

    // 點擊頁面任意位置生成新貓咪
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('cat')) {
            // 找到被點擊的貓咪對象
            const clickedCat = cat.cats.find(c => c.element === e.target);
            if (clickedCat) {
                messageSystem.showRandomMessage(clickedCat);
            }
        } else {
            cat.createNewCat(e.clientX, e.clientY);
        }
    });

    // 開始動畫循環
    function animate() {
        cat.updateAllCats();
        messageSystem.updateAllMessages(); // 更新所有訊息的位置
        requestAnimationFrame(animate);
    }
    animate();
}); 