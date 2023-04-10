import { Authority } from "@/types/user";
import { AUTHROITIES_KEY } from "@/utils/keys";
import { useLocalStorage } from "@vueuse/core";



export function useAuthorities() {
  const authorities = useLocalStorage<Authority[]>(AUTHROITIES_KEY, []);

  const setAuthorities = (auths: Authority[]) => {
    authorities.value = auths;
  };

  const clearAuthorities = () => {
    authorities.value = [];
  };

  return {
    authorities,
    setAuthorities,
    clearAuthorities,
  };
}
