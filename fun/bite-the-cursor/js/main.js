// 星空背景類
class StarryBackground {
    constructor() {
        this.container = document.querySelector('.stars');
        this.createStars();
    }

    createStars() {
        const numberOfStars = 100;
        for (let i = 0; i < numberOfStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.width = `${Math.random() * 3}px`;
            star.style.height = star.style.width;
            star.style.setProperty('--duration', `${2 + Math.random() * 3}s`);
            star.style.setProperty('--opacity', `${0.5 + Math.random() * 0.5}`);
            this.container.appendChild(star);
        }
    }
}

// 文字提示類
class TextEffect {
    static messages = [
        "美味可口！",
        "好吃極了！",
        "嗷嗚！",
        "吞噬光芒！",
        "捕獲成功！"
    ];

    static show(x, y) {
        const text = document.createElement('div');
        text.className = 'bite-text';
        text.textContent = this.messages[Math.floor(Math.random() * this.messages.length)];
        text.style.left = `${x - 50}px`;
        text.style.top = `${y - 50}px`;
        document.body.appendChild(text);

        text.addEventListener('animationend', () => {
            document.body.removeChild(text);
        });
    }
}

// 遊戲管理類
class GameManager {
    constructor() {
        this.obstacles = document.querySelector('.obstacles');
        this.gameMessage = document.querySelector('.game-message');
        this.startPoint = document.querySelector('.start-point');
        this.endPoint = document.querySelector('.end-point');
        this.isPlaying = false;
        this.obstacleCount = 10;
        this.speedIncreaseFactor = 1;
        this.clearCount = 0;
        this.maxLevel = 10; // 最大關卡數
        this.setupGame();
    }

    setupGame() {
        this.clearObstacles();
        this.createObstacles();
        const currentLevel = Math.min(this.clearCount + 1, this.maxLevel);
        this.showMessage(`第 ${currentLevel} 關 - 移動到起點開始！`, 'white');
        this.isPlaying = false;
        this.speedIncreaseFactor = 1;
    }

    createObstacles() {
        const obstacles = [];
        const padding = 20; // 障礙物之間的最小間距
        const startX = 200; // 起點右側的安全距離
        const endX = window.innerWidth - 200; // 終點左側的安全距離
        const attempts = 100; // 最大嘗試次數，防止無限循環

        for (let i = 0; i < this.obstacleCount; i++) {
            let isValidPosition = false;
            let attempt = 0;
            let obstacle;

            while (!isValidPosition && attempt < attempts) {
                attempt++;
                
                // 生成新的障礙物
                const width = Math.random() * 80 + 50; // 50-130px
                const height = Math.random() * 80 + 50; // 50-130px
                const left = Math.random() * (endX - startX - width) + startX;
                const top = Math.random() * (window.innerHeight - height - 100) + 50;

                // 檢查是否與現有障礙物重疊
                isValidPosition = true;
                for (const existingObstacle of obstacles) {
                    const existingRect = {
                        left: parseFloat(existingObstacle.style.left),
                        top: parseFloat(existingObstacle.style.top),
                        width: parseFloat(existingObstacle.style.width),
                        height: parseFloat(existingObstacle.style.height)
                    };

                    // 檢查碰撞
                    if (this.checkObstacleCollision(
                        {left, top, width, height},
                        existingRect,
                        padding
                    )) {
                        isValidPosition = false;
                        break;
                    }
                }

                // 如果位置有效，創建障礙物
                if (isValidPosition) {
                    obstacle = document.createElement('div');
                    obstacle.className = 'obstacle';
                    obstacle.style.width = `${width}px`;
                    obstacle.style.height = `${height}px`;
                    obstacle.style.left = `${left}px`;
                    obstacle.style.top = `${top}px`;
                    obstacles.push(obstacle);
                }
            }

            // 如果找到有效位置，添加障礙物
            if (isValidPosition) {
                this.obstacles.appendChild(obstacles[obstacles.length - 1]);
            }
        }
    }

    // 檢查兩個障礙物是否重疊
    checkObstacleCollision(rect1, rect2, padding) {
        return !(rect1.left + rect1.width + padding < rect2.left ||
                rect1.left > rect2.left + rect2.width + padding ||
                rect1.top + rect1.height + padding < rect2.top ||
                rect1.top > rect2.top + rect2.height + padding);
    }

    clearObstacles() {
        while (this.obstacles.firstChild) {
            this.obstacles.removeChild(this.obstacles.firstChild);
        }
    }

    showMessage(text, type) {
        this.gameMessage.textContent = text;
        this.gameMessage.className = 'game-message show';
        if (type === 'success') {
            this.gameMessage.classList.add('success');
        } else if (type === 'failure') {
            this.gameMessage.classList.add('failure');
        }
        
        setTimeout(() => {
            this.gameMessage.classList.remove('show');
        }, 2000);
    }

    checkCollision(x, y, radius) {
        const obstacles = document.querySelectorAll('.obstacle');
        for (const obstacle of obstacles) {
            const rect = obstacle.getBoundingClientRect();
            const circleDistance = {
                x: Math.abs(x - (rect.left + rect.width/2)),
                y: Math.abs(y - (rect.top + rect.height/2))
            };

            if (circleDistance.x > (rect.width/2 + radius)) { continue; }
            if (circleDistance.y > (rect.height/2 + radius)) { continue; }

            if (circleDistance.x <= (rect.width/2)) { return obstacle; }
            if (circleDistance.y <= (rect.height/2)) { return obstacle; }

            const cornerDistance = Math.pow(circleDistance.x - rect.width/2, 2) +
                                 Math.pow(circleDistance.y - rect.height/2, 2);

            if (cornerDistance <= Math.pow(radius, 2)) {
                return obstacle;
            }
        }
        return null;
    }

    checkStartArea(x, y) {
        const startRect = this.startPoint.getBoundingClientRect();
        return this.isPointInCircle(x, y, startRect.left + startRect.width/2, 
                                        startRect.top + startRect.height/2, 
                                        startRect.width/2);
    }

    checkEndArea(x, y) {
        const endRect = this.endPoint.getBoundingClientRect();
        return this.isPointInCircle(x, y, endRect.left + endRect.width/2, 
                                      endRect.top + endRect.height/2, 
                                      endRect.width/2);
    }

    isPointInCircle(x, y, circleX, circleY, radius) {
        const distance = Math.sqrt(Math.pow(x - circleX, 2) + Math.pow(y - circleY, 2));
        return distance < radius;
    }

    increaseSpeed() {
        this.speedIncreaseFactor *= 1.05;
        return this.speedIncreaseFactor;
    }

    levelComplete() {
        if (this.clearCount < this.maxLevel - 1) {
            this.clearCount++;
            // 延遲顯示關卡提示
            setTimeout(() => {
                this.showMessage(`恭喜通關！當前第 ${this.clearCount} 關`, 'success');
                document.dispatchEvent(new Event('gameComplete'));
                setTimeout(() => this.setupGame(), 3000);
            }, 1000);
        } else {
            setTimeout(() => {
                this.showMessage('恭喜完成所有關卡！遊戲重新開始', 'success');
                document.dispatchEvent(new Event('gameComplete'));
                setTimeout(() => {
                    this.clearCount = 0;
                    this.setupGame();
                }, 4000);
            }, 1000);
        }
    }

    getBaseSpeedMultiplier() {
        // 每關提升 20%，最後一關提升到原始速度的 3 倍
        return 1 + (this.clearCount * 0.2);
    }
}

// 自定義光球類
class CustomCursor {
    constructor(gameManager) {
        this.cursor = document.querySelector('.cursor');
        this.gameManager = gameManager;
        this.x = 0;
        this.y = 0;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.x = e.clientX;
            this.y = e.clientY;
            this.cursor.style.left = `${this.x - 12}px`;
            this.cursor.style.top = `${this.y - 12}px`;

            // 檢查遊戲狀態和碰撞
            if (!this.gameManager.isPlaying && this.gameManager.checkStartArea(this.x, this.y)) {
                this.gameManager.isPlaying = true;
                this.gameManager.showMessage(`第 ${this.gameManager.clearCount + 1} 關開始！小心幽靈！`, 'white');
            } else if (this.gameManager.isPlaying) {
                // 檢查是否碰到障礙物
                const hitObstacle = this.gameManager.checkCollision(this.x, this.y, 12);
                if (hitObstacle) {
                    hitObstacle.classList.add('hit');
                    setTimeout(() => hitObstacle.classList.remove('hit'), 500);
                    this.gameManager.showMessage('碰到障礙物了！重新開始', 'failure');
                    setTimeout(() => this.gameManager.setupGame(), 2000);
                    this.gameManager.isPlaying = false;
                    return;
                }

                // 檢查是否到達終點
                if (this.gameManager.checkEndArea(this.x, this.y)) {
                    this.gameManager.isPlaying = false;
                    this.gameManager.levelComplete();
                }
            }
        });
    }

    caught() {
        this.cursor.classList.add('caught');
        setTimeout(() => {
            this.cursor.classList.remove('caught');
        }, 500);
    }

    getPosition() {
        return { x: this.x, y: this.y };
    }
}

// 幽靈類
class Ghost {
    constructor(cursor, gameManager) {
        this.ghost = document.getElementById('ghost');
        this.cursor = cursor;
        this.gameManager = gameManager;
        this.mouseX = 0;
        this.mouseY = 0;
        this.ghostX = 0;
        this.ghostY = 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.baseSpeed = 0.015;
        this.smoothing = 0.97;
        this.maxSpeed = 3;
        this.wobbleAmount = 0.3;
        this.wobbleSpeed = 1.2;
        this.biteDistance = 40;
        this.isBiting = false;
        this.isSad = false;
        this.lastBiteTime = 0;
        this.biteDelay = 1000;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // 監聽遊戲結束事件
        document.addEventListener('gameComplete', () => {
            this.showSadAnimation();
        });

        this.animate();
    }

    showSadAnimation() {
        this.isSad = true;
        this.ghost.classList.remove('biting');
        this.ghost.classList.add('sad');
        
        // 3秒後重置表情
        setTimeout(() => {
            this.isSad = false;
            this.ghost.classList.remove('sad');
        }, 3000);
    }

    animate() {
        if (!this.gameManager.isPlaying) {
            requestAnimationFrame(() => this.animate());
            return;
        }

        if (this.isSad) {
            requestAnimationFrame(() => this.animate());
            return;
        }

        const time = Date.now() * 0.001;
        const wobbleX = Math.sin(time * this.wobbleSpeed) * this.wobbleAmount;
        const wobbleY = Math.cos(time * this.wobbleSpeed) * this.wobbleAmount;
        
        this.targetX = this.mouseX + wobbleX;
        this.targetY = this.mouseY + wobbleY;

        const dx = this.targetX - this.ghostX;
        const dy = this.targetY - this.ghostY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 根據通關次數和當前速度因子計算實際速度
        const baseMultiplier = this.gameManager.getBaseSpeedMultiplier();
        const currentSpeed = this.baseSpeed * baseMultiplier * Math.min(2, this.gameManager.speedIncreaseFactor);
        
        this.velocityX = this.velocityX * this.smoothing + dx * currentSpeed;
        this.velocityY = this.velocityY * this.smoothing + dy * currentSpeed;

        // 根據通關次數調整最大速度
        const currentMaxSpeed = this.maxSpeed * baseMultiplier;
        const currentVelocity = Math.sqrt(this.velocityX * this.velocityX + this.velocityY * this.velocityY);
        if (currentVelocity > currentMaxSpeed) {
            const scale = currentMaxSpeed / currentVelocity;
            this.velocityX *= scale;
            this.velocityY *= scale;
        }

        const speedMultiplier = Math.min(1, distance / 300);
        this.ghostX += this.velocityX * speedMultiplier;
        this.ghostY += this.velocityY * speedMultiplier;

        const angle = Math.atan2(this.velocityY, this.velocityX);
        const rotation = angle * (180 / Math.PI);

        this.ghost.style.transform = `translate(${this.ghostX - 40}px, ${this.ghostY - 40}px) rotate(${rotation}deg)`;

        // 檢查是否抓到光球
        const now = Date.now();
        if (distance < this.biteDistance && !this.isBiting && now - this.lastBiteTime > this.biteDelay) {
            this.bite();
            this.lastBiteTime = now;
        } else if (distance >= this.biteDistance && this.isBiting) {
            this.stopBiting();
        }

        // 增加速度（但限制最大加速度）
        if (this.gameManager.speedIncreaseFactor < 2) {
            this.gameManager.increaseSpeed();
        }

        requestAnimationFrame(() => this.animate());
    }

    bite() {
        this.isBiting = true;
        this.ghost.classList.add('biting');
        this.cursor.caught();
        
        // 顯示咬到時的文字效果
        TextEffect.show(this.ghostX, this.ghostY - 50);
        
        const biteSound = new Audio('data:audio/wav;base64,UklGRl9vAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
        biteSound.volume = 0.2;
        biteSound.play().catch(() => {});

        this.gameManager.isPlaying = false;

        // 延遲顯示遊戲提示，等待吃掉文字消失
        setTimeout(() => {
            this.gameManager.showMessage('被幽靈抓到了！重新開始', 'failure');
            setTimeout(() => this.gameManager.setupGame(), 2000);
        }, 1000);
    }

    stopBiting() {
        this.isBiting = false;
        this.ghost.classList.remove('biting');
    }
}

// 當 DOM 加載完成後初始化
document.addEventListener('DOMContentLoaded', () => {
    new StarryBackground();
    const gameManager = new GameManager();
    const cursor = new CustomCursor(gameManager);
    new Ghost(cursor, gameManager);
}); 