import { Ref, isRef } from "vue";

export const element = (el: Ref<Element> | string | Element) => {
  if (typeof el === "string") {
    return document.querySelector(el);
  } else if (isRef(el)) {
    return el.value;
  }
  return el;
};
