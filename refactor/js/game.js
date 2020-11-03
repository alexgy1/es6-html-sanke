import Event from "./event.js";
import Map from "./map.js";
import Food from "./food.js";
import Snake from "./snake.js";

export default class Game extends Event {
  //游戏的控制类
  constructor(el, rect) {
    super();
    this.map = new Map(el, rect);
    this.food = new Food(this.map.cells, this.map.rows);
    this.snake = new Snake();
    this.map.setData(this.snake.data);
    this.createFood();
    this.render();
    this.timer = 0;
    this.interval = 200;
    this.keyDown = this.keyDown.bind(this);
    this.score = 0;
    this.control();
  }

  //递归
  createFood() {
    this.food.create();
    if (this.map.include(this.food.data)) {
      this.createFood();
    }
  }
  start() {
    this.move();
  }

  stop() {
    clearInterval(this.timer);
  }

  //分数改变
  changeScore(score) {
    //用户自定义的改变
    this.dispatch("score:change", score);
  }

  //向地图渲染数据s
  render() {
    this.map.clearData();
    this.map.setData(this.snake.data);
    this.map.setData(this.food.data);
    this.map.render();
  }
  //控制移动
  move() {
    this.stop();
    this.timer = setInterval(() => {
      this.snake.move();
      //吃食物
      if (this.isEat()) {
        this.score++;
        this.snake.eatFood();
        this.createFood();
        //更新分数
        this.changeScore(this.score);

        //设置更新间隔
        this.interval *= 0.9;
        this.stop();
        this.start();
        if (this.score >= 20) {
          this.over(1);
        }
      }
      //判断是否结束
      if (this.isOver()) {
        this.over(0);
        return;
      }
      this.render();
    }, this.interval);
  }

  isEat() {
    //判断是否吃到食物
    return (
      this.snake.data[0].x === this.food.data.x &&
      this.snake.data[0].y === this.food.data.y
    );
  }
  isOver() {
    //判断蛇头
    if (
      this.snake.data[0].x < 0 ||
      this.snake.data[0].x >= this.map.cells ||
      this.snake.data[0].y < 0 ||
      this.snake.data[0].y >= this.map.rows
    ) {
      return true;
    }
    //判断蛇撞到自己
    for (let i = 1; i < this.snake.data.length; i++) {
      if (
        this.snake.data[0].x === this.snake.data[i].x &&
        this.snake.data[0].y === this.snake.data[i].y
      ) {
        return true;
      }
    }
    return false;
  }
  /*
    ovarState:
      0 中间停止
      1 胜利了游戏结束
  */
  over(overState = 0) {
    if (overState) {
      //胜利
      // this.toWin && this.toWin();
      this.dispatch("win");
    } else {
      // this.toOver && this.toOver();
      this.dispatch("over");
    }
    this.stop();
  }

  keyDown({ keyCode }) {
    let isDir;
    switch (keyCode) {
      case 37:
        isDir = this.snake.changeDir("left");
        break;
      case 38:
        isDir = this.snake.changeDir("top");
        break;
      case 39:
        isDir = this.snake.changeDir("right");
        break;
      case 40:
        isDir = this.snake.changeDir("bottom");
        break;
    }
  }
  //游戏控制器
  control() {
    //用户是否添加控制器
    if (this.toControl) {
      this.toControl();
      return;
    }
    window.addEventListener("keydown", this.keyDown);
  }

  addControl(fn) {
    fn.call(this);
    window.removeEventListener("keydown", this.keyDown);
  }
}
