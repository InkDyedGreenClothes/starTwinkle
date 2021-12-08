<template>
  <canvas id="myCanvas"></canvas>
</template>

<script setup>
import LoginBg from "@/assets/images/lg-bg2.jpg";
import Star from "@/assets/images/star.png";
import { ref, onMounted } from "vue";
import { useCanvas } from "@/uses/useCanvas.js";
import StarObj from "@/uses/Star.js";
let { canvas, ctx } = useCanvas("myCanvas");
onMounted(() => {
  init();
});
let img = new Image();
let num = ref(60);
let starArr = ref([]);
let lastTime = ref(0);
let deltaTime = ref(0);
let timer = ref(0);
let switchy = ref(false);
img.src = LoginBg;
function init() {
  document.addEventListener("mousemove", mousemove, false);
  let starImg = new Image();
  starImg.src = Star;
  for (let index = 0; index < num.value; index++) {
    let obj = new StarObj({ ctx, canvas, img: starImg });
    starArr.value.push(obj);
    starArr.value[index].init();
  }
  lastTime.value = Date.now();
  loop();
}
function mousemove(e) {
  if (e.offsetX || e.layerX) {
    let px = e.offsetX == undefined ? e.layerX : e.offsetX;
    let py = e.offsetY == undefined ? e.layerY : e.offsetY;
    switchy.value =
      px <= canvas.value.width && px > 0 && py > 0 && py <= canvas.value.height;
  }
}
function loop() {
  window.requestAnimationFrame(loop);
  let now = Date.now();
  deltaTime.value = now - lastTime.value;
  lastTime.value = now;
  timer.value += deltaTime.value;

  if (timer.value > 50) {
    timer.value = 0;
    drawBg();
    drawStar();
  }
}
function drawBg() {
  ctx.value.drawImage(img, 0, 0, canvas.value.width, canvas.value.height);
}
function drawStar() {
  for (let index = 0; index < starArr.value.length; index++) {
    const element = starArr.value[index];
    element.update(deltaTime, switchy);
  }
}
</script>

<style lang="scss" scoped>
</style>