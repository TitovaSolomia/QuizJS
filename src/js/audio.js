/**
 * Audio & Haptics Manager
 * Uses Web Audio API for synthesized sound effects to avoid external dependencies.
 */

class AudioManager {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.enabled = true;
    }

    // Simple beep synthesizer
    playTone(freq, type, duration, vol = 0.1) {
        if (!this.enabled) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = type;
            osc.frequency.value = freq;

            gain.gain.setValueAtTime(vol, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) { console.error(e); }
    }

    playCorrect() {
        // High pitched happy chord
        this.playTone(600, 'sine', 0.15, 0.1);
        setTimeout(() => this.playTone(800, 'sine', 0.3, 0.1), 100);
        this.vibrate(50);
    }

    playWrong() {
        // Low pitched dissonance
        this.playTone(300, 'sawtooth', 0.2, 0.08);
        setTimeout(() => this.playTone(250, 'sawtooth', 0.3, 0.08), 150);
        this.vibrate([50, 50, 50]);
    }

    playClick() {
        this.playTone(1200, 'triangle', 0.05, 0.02);
    }

    playWin() {
        // Victory fanfare
        const now = this.ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 'square', 0.4, 0.1), i * 150);
        });
        this.vibrate([100, 50, 100, 50, 200]);
    }

    vibrate(pattern) {
        if (navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    }

    toggle(state) {
        this.enabled = state;
    }
}

export const audio = new AudioManager();
