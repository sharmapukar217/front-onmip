import { readMe } from "@directus/sdk";
import { client } from "@/utilities/directus";

export const useCurrentUser = () => {
  const accessToken = useCookie("access_token");
  //   TODO: HANDLE REFRESH TOKEN IF `access_token` IS EXPIRED
  //   const refreshToken = useCookie("refresh_token");

  return useAsyncData("currentUser", async (ctx) => {
    if (accessToken.value) client.setToken(accessToken.value);
    return client.request(readMe());
  });
};
