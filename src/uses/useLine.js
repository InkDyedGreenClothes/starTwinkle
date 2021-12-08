import { ref, onMounted } from "vue";

export function useLine({ canvas, ctx }) {
  let stars = ref([]);
  //生成随机位置的小方块

  let random = Math.random;
  function lineInit(num) {
    ctx.strokeStyle = "white";
    ctx.shadowColor = "white";
    for (let i = 0; i < num; i++) {
      let obj = new Star();
      stars.value.push(obj);
      stars.value[i].init();
    }
    ctx.shadowBlur = 0;
  }
  function animate() {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    for (var i in stars.value) {
      stars.value[i].move();
    }
    //     for (var i in dots) {
    //       dots.value[i].move();
    //     }
  }
  class Star {
    constructor() {
      this.id;
      this.x;
      this.y;
      this.r;
      this.color;
    }
    init() {
      this.x = Math.floor(Math.random() * canvas.width);
      this.y = Math.floor(Math.random() * canvas.height);
      this.r = Math.floor(Math.random() * 2) + 1;
      this.r = 10;
      var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
      this.color = "rgba(255,255,255," + alpha + ")";
    }
    draw() {
      //       ctx.fillStyle = this.color;
      ctx.shadowBlur = this.r * 2;
      ctx.beginPath();
      ctx.lineTo(this.x, this.y);
      ctx.lineTo(this.x + 100, this.y);
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();
    }
    move() {
      this.y -= 0.15;
      if (this.y <= -10) this.y = canvas.height + 10;
      this.draw();
    }
  }
  return { lineInit, animate };
}
