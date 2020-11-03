export default class Map {
  constructor(el, rect = 10) {
    this.rect = rect;
    this.data = [];
    this.el = el;
    this.rows = Math.ceil(Map.getStyle(el, "height") / rect); //向下取整
    this.cells = Math.ceil(Map.getStyle(el, "width") / rect);
    Map.setStyle(this.el, "height", this.rows * rect);
    Map.setStyle(this.el, "width", this.rows * rect);
  }
  setData(newData) {
    this.data = this.data.concat(newData);
  }
  clearData() {
    this.data.length = 0;
  }
  include({ x, y }) {
    //是否包含数据
    return this.data.some(i => i.x == x && i.y == y);
  }
  render() {
    this.el.innerHTML = this.data
      .map(i => {
        return `<span
          style="position:absolute;
          width:${this.rect}px;
          height:${this.rect}px;
          left:${i.x * this.rect}px;
          top:${i.y * this.rect}px;
          background:${i.color}"
          ></span>`;
      })
      .join("");
  }
  static getStyle(el, attr) {
    return parseFloat(getComputedStyle(el)[attr]);
  }
  static setStyle(el, attr, val) {
    el.style[attr] = val + "px";
  }
}
