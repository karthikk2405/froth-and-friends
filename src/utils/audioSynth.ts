// Web Audio API Procedural Ambient Sound Generator
// Simulates gentle warm acoustic room tone and subtle vinyl warmth

class CafeSoundscape {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioNode | null = null;
  private oscNode: OscillatorNode | null = null;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public play(): void {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 1.5);
      this.masterGain.connect(this.ctx.destination);

      // Warm low drone simulating coffee machine warmth
      const osc = this.ctx.createOscillator();
      const oscFilter = this.ctx.createBiquadFilter();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, this.ctx.currentTime); // A2 note warm hum

      oscFilter.type = 'lowpass';
      oscFilter.frequency.setValueAtTime(160, this.ctx.currentTime);

      osc.connect(oscFilter);
      oscFilter.connect(this.masterGain);
      osc.start();
      this.oscNode = osc;

      // Soft pink noise buffer for warm room reverberation
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.04;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);
      filter.Q.setValueAtTime(0.8, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(this.masterGain);
      whiteNoise.start();
      this.noiseNode = whiteNoise;

      this.isPlaying = true;
    } catch {
      this.isPlaying = false;
    }
  }

  public stop(): void {
    if (this.ctx && this.masterGain) {
      try {
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          if (this.oscNode) {
            try { this.oscNode.stop(); } catch { /* ignore */ }
          }
          if (this.noiseNode && 'stop' in this.noiseNode) {
            try { (this.noiseNode as AudioScheduledSourceNode).stop(); } catch { /* ignore */ }
          }
          this.isPlaying = false;
        }, 550);
      } catch {
        this.isPlaying = false;
      }
    } else {
      this.isPlaying = false;
    }
  }

  public playChime(): void {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1); // A5

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch {
      // Audio not supported or blocked
    }
  }
}

export const cafeSoundscape = new CafeSoundscape();
