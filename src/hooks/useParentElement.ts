import { Ref } from "vue";
import { element } from "./shared";

export function useParentElement(el: Ref<Element> | string | Element) {
  const e = element(el);
  return e?.parentNode;
}
