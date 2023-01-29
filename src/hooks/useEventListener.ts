import { isRef, onBeforeUnmount, onMounted, Ref } from "vue";

export function useEventListener(
  event: string,
  cb: (e: Event) => void,
  el: Ref<Element> | string | Element,
  options?: boolean | { passive?: boolean | undefined; once?: boolean | undefined; capture?: boolean | undefined }
) {
  const element = () => {
    if (typeof el === "string") {
      return document.querySelector(el);
    } else if (isRef(el)) {
      return el.value;
    }
    return el;
  };
  onMounted(() => {
    element()?.addEventListener(event, cb, options);
  });

  onBeforeUnmount(() => {
    element()?.removeEventListener(event, cb, options);
  });
}
