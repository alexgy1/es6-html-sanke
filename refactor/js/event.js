export default class Event {
  events = {};
  //添加一个事件处理器
  on(eventName, fn) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    if (!this.events[eventName].includes(fn)) {
      this.events[eventName].push(fn);
    }
  }
  dispatch(eventName, ...arg) {
    if (!this.events[eventName]) return;
    this.events[eventName].forEach(fn => {
      fn.call(this, ...arg);
    });
  }
  off(eventName, fn) {
    if (!this.events[eventName]) return;
    this.events[eventName] = this.events[eventName].filter(i => i != fn);
  }
}
