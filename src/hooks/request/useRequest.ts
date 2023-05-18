import { HttpResponse, Get, Post } from "@/utils/http";
import { ref, toRefs } from "vue";

export function useRequest<T>(initialState: T, method: "Get" | "Post") {
  const isLading = ref(true);
  const ieError = ref(false)
  const initState = ref<T>(initialState)

  const send = (url: string, parameter: any) => {
    switch (method) {
      case "Get":
        return Get(url, parameter);
      case "Post":
        return Post(url, parameter);
    }
  };

  return [isLading, send];
}
