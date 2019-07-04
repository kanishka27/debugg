import initialState from "../initialState";
import { types } from "../../actions/actionTypes";

export default function paramReducer(state = initialState.params, action) {
  switch (action.type) {
    case types.UPDATE_CLIENT_ID: // to update clientId in parameters
      return { ...state, clientId: action.clientId };
    case types.UPDATE_DOMAIN_KEY: // to update domain account key in parameters
      return { ...state, domainAccountKey: action.domainAccountKey };
    case types.UPDATE_ENVIRONMENT: // to update environment in parameters
      return { ...state, environment: action.environment };
    case types.UPDATE_SERVICE: // to update SAP service in parameters
      return { ...state, sapService: action.sapService };
    case types.UPDATE_SYSTEM: // to update SAP system in parameters
      return { ...state, sapSystem: action.sapSystem };
    case types.UPDATE_URL: // to update url in parameters
      return { ...state, url: action.url };
    case types.UPDATE_ACCESS_TOKEN: // to update access token in parameters
      return { ...state, accessToken: action.accessToken };
    case types.UPDATE_RES_ID: // to update resource id in parameters
      return { ...state, resourceId: action.resourceId };
    case types.UPDATE_SAP_USERNAME: // to update clientId in parameters
      return { ...state, sapUsername: action.sapUsername };
    case types.RESET_PARAMETERS: // to reset all the parameters to empty string
      return initialState.params;
    default:
      return state;
  }
}
