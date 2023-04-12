import { useLocalStorage } from "@vueuse/core";
import { EXPRESS_AT_KEY, ISSUED_AT_KEY, TOKEN_KEY } from "@/utils/keys";

export function useToken() {
  const token = useLocalStorage(TOKEN_KEY, "");
  const issued_at = useLocalStorage(ISSUED_AT_KEY, "");
  const express_at = useLocalStorage(EXPRESS_AT_KEY, "");

  const setTokenInfo = (t: string, i: string, e: string) => {
    token.value = t;
    issued_at.value = i;
    express_at.value = e;
  };

  const clearTokenInfo = () => {
    token.value = "";
    issued_at.value = "";
    express_at.value = "";
  };

  return {
    token,
    issuedAt: issued_at,
    expressAt: express_at,
    setTokenInfo,
    clearTokenInfo,
  };
}
