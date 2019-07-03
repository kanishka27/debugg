import initialState from "../initialState";
import { types } from "../../actions/actionTypes";

export default function paramReducer(state = initialState.params, action) {
  switch (action.type) {
    case types.UPDATE_CLIENT_ID:
      return { ...state, clientId: action.clientId };
    case types.UPDATE_DOMAIN_KEY:
      return { ...state, domainAccountKey: action.domainAccountKey };
    case types.UPDATE_ENVIRONMENT:
      return { ...state, environment: action.environment };
    case types.UPDATE_SERVICE:
      return { ...state, sapService: action.sapService };
    case types.UPDATE_SYSTEM:
      return { ...state, sapSystem: action.sapSystem };
    case types.UPDATE_URL:
      return { ...state, url: action.url };
    case types.UPDATE_ACCESS_TOKEN:
      return { ...state, accessToken: action.accessToken };
    case types.UPDATE_RES_ID:
      return { ...state, resourceId: action.resourceId };
    case types.RESET_PARAMETERS:
      return initialState.params;
    case types.UPDATE_SAP_USERNAME:
      return { ...state, sapUsername: action.sapUsername };
    default:
      return state;
  }
}
