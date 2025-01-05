export class Vortex {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.hue = 0;
        this.isActive = false;
        this.rotationAngle = 0;
        this.rotationSpeed = 0.001;

        this.resize();
        this.setupEventListeners();
        this.createParticles();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.isActive = true;
        });
        window.addEventListener('mouseout', () => {
            this.isActive = false;
        });
    }

    createParticles() {
        const particleCount = 300;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 4 + 1,
                speedX: 0,
                speedY: 0,
                hue: Math.random() * 360,
                angle: Math.random() * Math.PI * 2,
                rotationRadius: Math.random() * 2 + 1
            });
        }
    }

    update() {
        this.hue = (this.hue + 0.5) % 360;
        this.rotationAngle += this.rotationSpeed;

        this.particles.forEach(particle => {
            if (this.isActive) {
                const dx = this.mouseX - particle.x;
                const dy = this.mouseY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const force = Math.max(0, (400 - distance) / 400);
                
                const rotationX = Math.cos(particle.angle + this.rotationAngle) * particle.rotationRadius;
                const rotationY = Math.sin(particle.angle + this.rotationAngle) * particle.rotationRadius;
                
                particle.speedX += (dx / distance) * force * 0.5 + rotationX * 0.1;
                particle.speedY += (dy / distance) * force * 0.5 + rotationY * 0.1;
            }

            particle.speedX *= 0.96;
            particle.speedY *= 0.96;
            
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
        });
    }

    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * 2
            );
            gradient.addColorStop(0, `hsla(${(this.hue + particle.hue) % 360}, 100%, 50%, 0.8)`);
            gradient.addColorStop(1, `hsla(${(this.hue + particle.hue) % 360}, 100%, 50%, 0)`);
            
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
        });
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
} 