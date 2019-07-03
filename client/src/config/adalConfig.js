import { AuthenticationContext, adalFetch, withAdalLogin } from "react-adal";

export const adalConfig = {
  tenant: '72f988bf-86f1-41af-91ab-2d7cd011db47',
  clientId: '210a3879-cbf0-47a3-b7c3-079754fcc5cc',
  endpoints: {
    api: '210a3879-cbf0-47a3-b7c3-079754fcc5cc',
  },
  cacheLocation: 'localStorage',
  postLogoutRedirectUri: window.location.origin,
  // redirectUri: 'http://localhost:3000/user'
};
export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const getToken = () => {
  return authContext.getCachedToken(authContext.config.clientId);
};

export const withAdalLoginApi = withAdalLogin(
  authContext,
  adalConfig.endpoints.api
);
