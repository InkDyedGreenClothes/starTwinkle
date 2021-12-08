import { ref, onMounted } from "vue";
export function useCanvas(id = "canvas") {
  let canvas = ref("");
  let ctx = ref("");
  onMounted(() => {
    canvas.value = document.getElementById(id);
    let w = document.body.offsetWidth;
    let h = document.body.offsetHeight;
    canvas.value.height = h;
    canvas.value.width = w;
    ctx.value = canvas.value.getContext("2d");
  });
  return { canvas, ctx };
}

