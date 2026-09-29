const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Minimal time-based tween driven from useFrame (clock seconds). */
export class Tween {
  value: number;
  private from: number;
  private to: number;
  private start = 0;
  private duration = 1;
  private done = true;
  private onDone?: () => void;

  constructor(initial: number) {
    this.value = initial;
    this.from = initial;
    this.to = initial;
  }

  set(to: number, now: number, duration: number, delay = 0, onDone?: () => void) {
    this.from = this.value;
    this.to = to;
    this.start = now + delay;
    this.duration = Math.max(duration, 0.0001);
    this.done = false;
    this.onDone = onDone;
  }

  get running() {
    return !this.done;
  }

  update(now: number) {
    if (this.done) return this.value;
    const t = Math.min(Math.max((now - this.start) / this.duration, 0), 1);
    this.value = this.from + (this.to - this.from) * easeInOutCubic(t);
    if (t >= 1) {
      this.done = true;
      const callback = this.onDone;
      this.onDone = undefined;
      callback?.();
    }
    return this.value;
  }
}
