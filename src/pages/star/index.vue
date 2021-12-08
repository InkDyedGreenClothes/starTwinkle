<template>
  <canvas id="myCanvas"></canvas>
</template>

<script setup>
import LoginBg from "@/assets/images/lg-bg2.jpg";
import { ref, onMounted, watch } from "vue";
import { useCanvas } from "@/uses/useCanvas.js";
import { useStar } from "@/uses/useStar.js";
import { useLine } from "@/uses/useLine.js";
let { canvas, ctx } = useCanvas("myCanvas");
let lastTime = ref(0);
let deltaTime = ref(0);
let timer = ref(0);
let drawStarsfn = null;
let aliveUpdateFn = null;
let animateFn = null;
let switchy = ref(false);
let stop = null;

let img = new Image();
img.src = LoginBg;
onMounted(() => {
  init();
});
// 监听鼠标是否离开
watch(switchy, (newVal) => {
  aliveUpdateFn(switchy.value);
});
function init() {
  lastTime.value = Date.now();
  // 星星
  let { starInit, drawStars, aliveUpdate } = useStar(ctx.value, canvas.value);
  // 线条
  let { lineInit, animate } = useLine({ ctx: ctx.value, canvas: canvas.value });
  lineInit(80);
  animateFn = animate;
  aliveUpdateFn = aliveUpdate;
  drawStarsfn = drawStars;
  starInit(0);
  document.addEventListener("mousemove", mousemove, false);
  document.addEventListener("mouseleave", mouseLeave, false);
  loop();
}
function mousemove(e) {
  if (e.offsetX || e.layerX) {
    let px = e.offsetX ? e.offsetX : e.layerX;
    let py = e.offsetY ? e.offsetY : e.layerY;
    if (
      px < 0 ||
      px > canvas.value.width ||
      py < 0 ||
      py > canvas.value.height
    ) {
      switchy.value = false;
    } else {
      switchy.value = true;
      window.cancelAnimationFrame(stop);
      animateFn();
    }
  }
}
function mouseLeave(e) {
  switchy.value = false;
  aliveUpdateFn(switchy.value);
}

function loop() {
  window.requestAnimationFrame(loop);
  let nowTime = Date.now();
  deltaTime.value = nowTime - lastTime.value;
  lastTime.value = Date.now();
  timer.value += deltaTime.value;
  if (timer.value > 160) {
    drawBg();
    drawStarsfn(deltaTime.value);
    timer.value = 0;
  }
}
function drawBg() {
  ctx.value.drawImage(img, 0, 0, canvas.value.width, canvas.value.height);
}
</script>

<style lang="scss" scoped>
</style>