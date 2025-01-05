export function initFireworks() {
    const fireworksContainer = document.querySelector('.fireworks-container');
    let isActive = false;
    let animationFrameId = null;
    const particles = new Set();
    
    document.addEventListener('countdown-complete', () => {
        isActive = true;
        startFireworks();
        createMassFireworks();
        createSpecialEffects();
    });
    
    document.addEventListener('stage-changed', (e) => {
        isActive = e.detail === 'celebration';
        if (isActive) {
            startFireworks();
            createMassFireworks();
            createSpecialEffects();
        } else {
            // 清理所有煙火
            cancelAnimationFrame(animationFrameId);
            particles.forEach(particle => particle.remove());
            particles.clear();
        }
    });
    
    function startFireworks() {
        if (!isActive) return;
        
        const count = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                launchFirework(false, getRandomFireworkType());
            }, i * 500);
        }
        
        setTimeout(startFireworks, 2000 + Math.random() * 2000);
    }
    
    function createMassFireworks() {
        if (!isActive) return;
        
        const count = 5 + Math.floor(Math.random() * 3);
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                launchFirework(true, getRandomFireworkType());
            }, i * 300);
        }
        
        setTimeout(createMassFireworks, 10000 + Math.random() * 5000);
    }
    
    function createSpecialEffects() {
        if (!isActive) return;
        
        // 創建心形煙火
        setTimeout(() => {
            launchFirework(true, 'heart', '#ff3366');
        }, 1000);
        
        // 創建螺旋煙火
        setTimeout(() => {
            launchFirework(true, 'spiral', '#4a90e2');
        }, 3000);
        
        // 創建環形煙火
        setTimeout(() => {
            launchFirework(true, 'ring', '#ffd700');
        }, 5000);
        
        setTimeout(createSpecialEffects, 12000 + Math.random() * 4000);
    }
    
    function getRandomFireworkType() {
        const types = ['normal', 'burst', 'trail', 'sparkle'];
        return types[Math.floor(Math.random() * types.length)];
    }
    
    function launchFirework(isMass = false, type = 'normal', specificColor = null) {
        if (!isActive) return;
        
        const firework = document.createElement('div');
        firework.className = `firework firework-${type}`;
        
        const left = 10 + Math.random() * 80;
        firework.style.left = `${left}%`;
        
        const color = specificColor || generateRandomColor(type);
        firework.style.backgroundColor = color;
        firework.style.boxShadow = `0 0 6px ${color}, 0 0 12px ${color}`;
        
        fireworksContainer.appendChild(firework);
        particles.add(firework);
        
        // 使用 requestAnimationFrame 優化動畫
        const startTime = performance.now();
        const duration = 1000;
        
        function animate(currentTime) {
            if (!isActive) {
                firework.remove();
                particles.delete(firework);
                return;
            }
            
            const progress = (currentTime - startTime) / duration;
            
            if (progress >= 1) {
                firework.remove();
                particles.delete(firework);
                createExplosion(left, isMass ? 30 + Math.random() * 40 : 50, color, isMass, type);
                return;
            }
            
            const y = 100 - (progress * 100);
            firework.style.transform = `translateY(${y}vh) scale(${1 - progress * 0.2})`;
            firework.style.opacity = 1 - progress;
            
            animationFrameId = requestAnimationFrame(animate);
        }
        
        requestAnimationFrame(animate);
    }
    
    function generateRandomColor(type) {
        let hue, saturation, lightness;
        
        switch(type) {
            case 'heart':
                return '#ff3366';
            case 'spiral':
                hue = Math.random() * 360;
                saturation = 90;
                lightness = 60;
                break;
            case 'sparkle':
                hue = 45 + Math.random() * 30;
                saturation = 90;
                lightness = 70;
                break;
            default:
                hue = Math.random() * 360;
                saturation = 80 + Math.random() * 20;
                lightness = 50 + Math.random() * 10;
        }
        
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    
    function createExplosion(x, y, color, isMass, type) {
        const explosion = document.createElement('div');
        explosion.className = `explosion explosion-${type}`;
        explosion.style.left = `${x}%`;
        explosion.style.top = `${y}%`;
        
        const particleCount = getParticleCount(type, isMass);
        const layers = isMass ? 3 : 1;
        
        for (let layer = 0; layer < layers; layer++) {
            setTimeout(() => {
                createParticleLayer(explosion, particleCount, color, type, layer);
            }, layer * 100);
        }
        
        fireworksContainer.appendChild(explosion);
        
        setTimeout(() => {
            explosion.remove();
        }, 2000);
    }
    
    function getParticleCount(type, isMass) {
        switch(type) {
            case 'heart':
                return 150;
            case 'spiral':
                return isMass ? 200 : 100;
            case 'ring':
                return isMass ? 180 : 90;
            default:
                return isMass ? 100 + Math.floor(Math.random() * 50) : 50 + Math.floor(Math.random() * 30);
        }
    }
    
    function createParticleLayer(explosion, count, color, type, layer) {
        for (let i = 0; i < count; i++) {
            const particle = createParticle(color, type === 'sparkle', layer);
            
            if (type === 'heart') {
                const angle = (i / count) * Math.PI * 2;
                const heartX = 16 * Math.pow(Math.sin(angle), 3);
                const heartY = -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));
                particle.style.setProperty('--heart-x', `${heartX * 5}px`);
                particle.style.setProperty('--heart-y', `${heartY * 5}px`);
            }
            
            explosion.appendChild(particle);
        }
    }
    
    function createParticle(color, isSparkle, layer = 0) {
        const particle = document.createElement('div');
        particle.className = `firework-particle ${isSparkle ? 'sparkle' : ''}`;
        
        const angle = Math.random() * 360;
        const velocity = 3 + Math.random() * 3;
        const distance = 100 + Math.random() * 100;
        const delay = layer * 0.1;
        
        particle.style.backgroundColor = color;
        particle.style.setProperty('--angle', `${angle}deg`);
        particle.style.setProperty('--velocity', `${velocity}`);
        particle.style.setProperty('--distance', `${distance}px`);
        particle.style.setProperty('--delay', `${delay}s`);
        
        particle.style.boxShadow = `0 0 ${isSparkle ? '8px' : '6px'} ${color}, 0 0 ${isSparkle ? '16px' : '12px'} ${color}`;
        
        return particle;
    }
    
    const style = document.createElement('style');
    style.textContent = `
        .firework {
            position: absolute;
            bottom: 0;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            transform-origin: center bottom;
            will-change: transform, opacity;
            filter: blur(0.5px);
            transform: translateZ(0);
        }
        
        .explosion {
            position: absolute;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 2;
            will-change: transform;
            transform: translateZ(0);
        }
        
        .firework-particle {
            position: absolute;
            width: 3px;
            height: 3px;
            border-radius: 50%;
            transform-origin: center;
            will-change: transform, opacity;
            filter: blur(0.5px);
            transform: translateZ(0);
        }
    `;
    document.head.appendChild(style);
} 