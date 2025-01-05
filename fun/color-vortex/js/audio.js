export class AudioManager {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.oscillator = null;
        this.gainNode = null;
        this.filterNode = null;
    }

    createSound(frequency, duration = 0.1) {
        if (this.oscillator) {
            this.oscillator.stop();
        }

        this.oscillator = this.audioContext.createOscillator();
        this.gainNode = this.audioContext.createGain();
        this.filterNode = this.audioContext.createBiquadFilter();

        // 設置濾波器
        this.filterNode.type = 'bandpass';
        this.filterNode.frequency.value = frequency;
        this.filterNode.Q.value = 1;

        // 連接音頻節點
        this.oscillator.connect(this.filterNode);
        this.filterNode.connect(this.gainNode);
        this.gainNode.connect(this.audioContext.destination);

        // 設置音色
        this.oscillator.type = 'sine';
        const harmonics = ['sine', 'triangle', 'square'];
        this.oscillator.type = harmonics[Math.floor(Math.random() * harmonics.length)];
        
        this.oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

        // 音量控制
        this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        this.gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.01);
        this.gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        this.oscillator.start();
        this.oscillator.stop(this.audioContext.currentTime + duration);
    }

    playVortexSound(mouseSpeed) {
        const baseFrequency = 220;
        const maxFrequency = 880;
        const frequency = baseFrequency + (mouseSpeed * 200); // 增加頻率範圍
        const duration = 0.1 + (mouseSpeed * 0.2); // 根據速度調整音效持續時間
        this.createSound(Math.min(frequency, maxFrequency), Math.min(duration, 0.5));
    }
} 