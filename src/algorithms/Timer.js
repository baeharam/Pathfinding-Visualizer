// @flow

type TimerConstructorType = {
  callback: () => void,
  delay: number,
};

export default class Timer {
  id: TimeoutID;

  callback: () => void;

  delay: number;

  remain: number;

  start: number;

  constructor({ callback, delay }: TimerConstructorType) {
    this.id = setTimeout(callback, delay);
    this.callback = callback;
    this.delay = delay;
    this.remain = delay;
    this.start = Date.now();
  }

  pause = () => {
    clearTimeout(this.id);
    this.remain -= Date.now() - this.start;
  };

  resume = () => {
    this.start = Date.now();
    clearTimeout(this.id);
    this.id = setTimeout(this.callback, this.remain);
  };

  destroy = () => {
    clearTimeout(this.id);
  };
}
