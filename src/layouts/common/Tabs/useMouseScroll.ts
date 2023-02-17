import { Ref, onMounted, onBeforeUnmount } from "vue";

export function useMouseScroll(el: Ref<Element>) {
  const EVEMENT_NAME = `wheel`;
  function onScroll(e: Event) {
    const { deltaY } = e as WheelEvent;
    const element = el.value;
    element.scrollLeft += deltaY;
  }
  onMounted(() => {
    el.value.addEventListener(EVEMENT_NAME, onScroll, { passive: true });
  });

  onBeforeUnmount(() => {
    el.value.removeEventListener(EVEMENT_NAME, onScroll);
  });
}
