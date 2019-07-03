import { types } from "./actionTypes";

export function updateClient(clientId) {
  return {
    type: types.UPDATE_CLIENT_ID,
    clientId
  };
}

export function updateDomainKey(domainAccountKey) {
  return {
    type: types.UPDATE_DOMAIN_KEY,
    domainAccountKey
  };
}

export function updateSystem(sapSystem) {
  return {
    type: types.UPDATE_SYSTEM,
    sapSystem
  };
}

export function updateService(sapService) {
  return {
    type: types.UPDATE_SERVICE,
    sapService
  };
}

export function updateEnvironment(environment) {
  return {
    type: types.UPDATE_ENVIRONMENT,
    environment
  };
}

export function updateUrl(url) {
  return {
    type: types.UPDATE_URL,
    url
  };
}

export function updateAccessToken(accessToken) {
  return {
    type: types.UPDATE_ACCESS_TOKEN,
    accessToken
  };
}

export function updateResId(resourceId) {
  return {
    type: types.UPDATE_RES_ID,
    resourceId
  };
}

export function resetParams() {
  return {
    type: types.RESET_PARAMETERS
  };
}
export function updateSapUsername(sapUsername) {
  return {
    type: types.UPDATE_SAP_USERNAME,
    sapUsername
  };
}
