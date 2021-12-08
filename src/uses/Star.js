export default class StarObj {
  constructor(opt = {}) {
    this.img = opt.img;
    this.x = 0;
    this.y = 0;
    this.start;
    this.timer;
    this.ctx = opt.ctx || null;
    this.canvas = opt.canvas;
    this.xSpd;
    this.ySpd;
  }
  init() {
    this.x = Math.floor(Math.random() * this.canvas.width);
    this.y = Math.floor(Math.random() * (this.canvas.height - 350));
    this.start = Math.random() * 7;
    this.xSpd = Math.random() * 3 - 1.5;
    this.ySpd = Math.random() * 3 - 1.5;
  }
  draw() {
    this.ctx.drawImage(
      this.img,
      this.start * 25.71,
      0,
      25.71,
      28,
      this.x,
      this.y,
      7,
      7
    );
  }
  update(deltaTime) {
    this.x += this.xSpd * deltaTime.value * 0.03;
    this.y += this.ySpd * deltaTime.value * 0.03;
    this.start += 1;
    this.start %= 7;
    if (
      this.x > this.canvas.width ||
      this.y > this.canvas.height - 350 ||
      this.x < 0 ||
      this.y < 0
    ) {
      this.init();
    }
    this.draw();
  }
  aliveUpdate(switchy) {
    if (switchy) {
    } else {
    }
  }
}
