export class Cat {
    constructor() {
        this.cats = [];
        this.catImages = [
            'images/cat3.png',
            'images/cat4.png',
            'images/cat5.png',
            'images/cat6.png',
            'images/cat7.png',
            'images/cat8.png',
            'images/cat9.png'
        ];
        this.rotations = [-15, -10, -5, 0, 5, 10, 15];
    }

    createNewCat(x, y) {
        const cat = {
            element: document.createElement('div'),
            x: x,
            y: y,
            speedX: (Math.random() - 0.5) * 6,
            speedY: (Math.random() - 0.5) * 6,
            size: Math.random() * 30 + 60,
            rotation: this.rotations[Math.floor(Math.random() * this.rotations.length)],
            floatOffset: Math.random() * Math.PI * 2
        };

        cat.element.className = 'cat';
        cat.element.style.left = `${x}px`;
        cat.element.style.top = `${y}px`;
        cat.element.style.width = `${cat.size}px`;
        cat.element.style.height = `${cat.size}px`;
        
        const imageUrl = this.catImages[Math.floor(Math.random() * this.catImages.length)];
        cat.element.style.backgroundImage = `url('${imageUrl}')`;
        
        cat.element.style.opacity = '0';
        cat.element.style.transform = `rotate(${cat.rotation}deg) scale(0)`;
        
        setTimeout(() => {
            cat.element.style.transition = 'all 0.3s ease-out';
            cat.element.style.opacity = '1';
            cat.element.style.transform = `rotate(${cat.rotation}deg) scale(1)`;
        }, 50);

        document.getElementById('cat-container').appendChild(cat.element);
        this.cats.push(cat);
    }

    createWaveEffect(x, y, direction) {
        const container = document.createElement('div');
        container.className = 'wave-container';
        container.style.left = `${x}px`;
        container.style.top = `${y}px`;

        // 創建多層光波
        for (let i = 0; i < 2; i++) {
            const wave = document.createElement('div');
            wave.className = 'wave';
            wave.style.animationDelay = `${i * 0.2}s`;
            container.appendChild(wave);
        }

        document.getElementById('cat-container').appendChild(container);

        // 創建更多粒子效果
        const particleCount = 12;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // 根據碰撞方向調整粒子散射角度
            let angleRange = Math.PI;
            let baseAngle = 0;
            
            if (direction === 'left') {
                baseAngle = -Math.PI / 2;
            } else if (direction === 'right') {
                baseAngle = Math.PI / 2;
            } else if (direction === 'top') {
                baseAngle = 0;
            } else if (direction === 'bottom') {
                baseAngle = Math.PI;
            }
            
            const angle = baseAngle + (Math.random() - 0.5) * angleRange;
            const distance = 40 + Math.random() * 40;
            
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            particle.style.animation = `particle ${0.6 + Math.random() * 0.4}s ease-out forwards`;
            
            container.appendChild(particle);
        }

        setTimeout(() => {
            container.remove();
        }, 1000);
    }

    updateAllCats() {
        this.cats.forEach(cat => {
            cat.x += cat.speedX;
            cat.y += cat.speedY;

            // 檢測水平碰撞
            if (cat.x <= 0) {
                cat.speedX *= -1;
                this.bounceCat(cat);
                this.createWaveEffect(0, cat.y + cat.size / 2, 'left');
            } else if (cat.x >= window.innerWidth - cat.size) {
                cat.speedX *= -1;
                this.bounceCat(cat);
                this.createWaveEffect(window.innerWidth, cat.y + cat.size / 2, 'right');
            }

            // 檢測垂直碰撞
            if (cat.y <= 0) {
                cat.speedY *= -1;
                this.bounceCat(cat);
                this.createWaveEffect(cat.x + cat.size / 2, 0, 'top');
            } else if (cat.y >= window.innerHeight - cat.size) {
                cat.speedY *= -1;
                this.bounceCat(cat);
                this.createWaveEffect(cat.x + cat.size / 2, window.innerHeight, 'bottom');
            }

            const floatY = Math.sin(Date.now() * 0.003 + cat.floatOffset) * 5;
            cat.element.style.left = `${cat.x}px`;
            cat.element.style.top = `${cat.y + floatY}px`;
            
            const scaleX = cat.speedX > 0 ? 1 : -1;
            cat.element.style.transform = `rotate(${cat.rotation}deg) scaleX(${scaleX})`;
        });
    }

    bounceCat(cat) {
        cat.element.classList.remove('cat-bounce');
        void cat.element.offsetWidth;
        cat.element.classList.add('cat-bounce');
        
        const scaleX = cat.speedX > 0 ? 1 : -1;
        cat.element.style.transform = `rotate(${cat.rotation}deg) scale(1.2) scaleX(${scaleX})`;
        setTimeout(() => {
            cat.element.style.transform = `rotate(${cat.rotation}deg) scale(1) scaleX(${scaleX})`;
        }, 200);
    }
} 