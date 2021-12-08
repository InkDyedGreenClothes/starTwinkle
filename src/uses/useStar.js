import { ref, reactive } from "vue";
import Star from "@/assets/images/star.png";

export function useStar(ctx, canvas) {
  let star = new Image();
  star.src = Star;
  let a = 1;
  let stars = [];
  let switchy = ref(false);
  let life = ref(1);
  let deltaTime = ref(0);
  function starInit(num) {
    for (let i = 0; i < num; i++) {
      let obj = new StarObj();
      stars.push(obj);
      stars[i].init();
    }
  }
  function drawStars(time) {
    deltaTime.value = time;
    for (let i = 0; i < stars.length; i++) {
      const item = stars[i];
      item.updateLine();
      item.draw_line();
    }
  }
  function aliveUpdate(flag) {
    switchy.value = flag;
  }

  class StarObj {
    constructor() {
      this.x;
      this.y;
      this.start;
      this.xSpd;
      this.ySpd;
    }
    init() {
      this.x = Math.floor(Math.random() * canvas.width);
      this.y = Math.floor(Math.random() * (canvas.height - 350));
      this.start = Math.floor(Math.random() * 5);
      this.xSpd = Math.random() * 3 - 1.5;
      this.ySpd = Math.random() * 3 - 1.5;
    }
    updateLine() {
      this.x += this.xSpd * deltaTime.value * 0.03;
      this.y += this.ySpd * deltaTime.value * 0.03;
      this.start += 1;
      this.start %= 5;
      if (!switchy.value) {
        life.value += 0.3 * deltaTime.value * 0.03;
        if (life.value > 1) {
          life.value = 1;
        }
      } else {
        life.value -= 0.3 * deltaTime.value * 0.03;
        if (life.value < 0) {
          life.value = 0;
        }
      }
      if (
        this.x > canvas.width ||
        this.x <= 0 ||
        this.y <= 0 ||
        this.y > canvas.height - 350
      ) {
        this.init();
      }
    }
    draw_line(x = this.x, y = this.y, cxt = ctx) {
      cxt.save();
      // cxt.translate(x, y);
      cxt.globalAlpha = life.value;
      this.startLine(cxt);
      cxt.stroke();
      cxt.restore();
    }
    // 画星星
    startLine(cxt) {
      cxt.beginPath();
      let startM = this.start / 3;
      // ctx.moveTo(this.x, this.y - this.start);
      ctx.lineTo(this.x + startM, this.y - startM);
      ctx.lineTo(this.x + this.start, this.y);
      ctx.lineTo(this.x + startM, this.y + startM);
      ctx.lineTo(this.x, this.y + this.start);
      ctx.lineTo(this.x - startM, this.y + startM);
      ctx.lineTo(this.x - this.start, this.y);
      ctx.lineTo(this.x - startM, this.y - startM);
      ctx.lineTo(this.x, this.y - this.start);
      cxt.strokeStyle = "#fff";
      cxt.fillStyle = "#fff";
      cxt.fill();
      cxt.closePath();
    }
    /*****************************
     * cxt 为绘图上下文环境
     * r 为大圆半径
     * x，y 为相对 canvas 原点的坐标位置
     * rot 为顺时针旋转角度
     ****************************/
    draw_start(r = this.start, x = this.x, y = this.y, rot = 0, cxt = ctx) {
      cxt.save();
      cxt.translate(x, y);
      cxt.rotate((rot / 180) * Math.PI);
      cxt.scale(r, r);
      this.startPath(cxt);

      cxt.stroke();
      cxt.restore();
    }
    //五角星标准路径
    startPath(cxt = ctx) {
      cxt.beginPath();
      for (var i = 0; i < 5; i++) {
        var x1 = Math.cos(((54 + i * 72) / 180) * Math.PI);
        var y1 = Math.sin(((54 + i * 72) / 180) * Math.PI);
        var x2 = Math.cos(((18 + i * 72) / 180) * Math.PI) * 0.5;
        var y2 = Math.sin(((18 + i * 72) / 180) * Math.PI) * 0.5;

        cxt.lineTo(x2, y2);
        cxt.lineTo(x1, y1);
        cxt.strokeStyle = "#fff";
      }
      cxt.closePath();
    }
  }
  return { starInit, drawStars, aliveUpdate };
}
