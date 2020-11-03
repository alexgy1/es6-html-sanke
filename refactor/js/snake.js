export default class Snake {
  constructor(food) {
    this.data = [
      { x: 6, y: 4, color: "blue" },
      { x: 5, y: 4, color: "white" },
      { x: 4, y: 4, color: "white" },
      { x: 3, y: 4, color: "white" },
      { x: 3, y: 4, color: "white" }
    ];
    this.food = food;
    this.direction = "right";
  }

  move() {
    //在移动之后，才能加新的
    let i = this.data.length - 1;
    this.lastData = {
      x: this.data[i].x,
      y: this.data[i].y,
      color: this.data[i].color
    };
    /*让后面每一个格走到前面 处理蛇身体部分*/
    for (i; i > 0; i--) {
      this.data[i].x = this.data[i - 1].x;
      this.data[i].y = this.data[i - 1].y;
    }
    //处理蛇头部分
    switch (this.direction) {
      case "left":
        this.data[0].x--;
        break;
      case "right":
        this.data[0].x++;
        break;
      case "top":
        this.data[0].y--;
        break;
      case "bottom":
        this.data[0].y++;
        break;
    }
  }

  changeDir(dir) {
    let lr = ["left", "right"];
    let tp = ["top", "bottom"];
    //在左右移动 只能修改上下 ，如果是上下移动 修改只能左右移动
    if (lr.includes(this.direction)) {
      if (lr.includes(dir)) return false;
    } else {
      if (tp.includes(this.direction)) {
        if (tp.includes(dir)) return false;
      }
    }
    this.direction = dir;
    return true;
  }

  eatFood() {
    //吃到食物， 长变长
    this.data.push(this.lastData);
  }
}
