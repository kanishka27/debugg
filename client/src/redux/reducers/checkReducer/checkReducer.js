import initialState from "../initialState";
import { types } from "../../actions/actionTypes";
import * as constants from "../../../constants";

export default function checkReducer(state = initialState.checkStatus, action) {
  switch (action.type) {
    case types.CHECK_START:
      return state.length === 0
        ? state
        : state.map(check =>
            action.check.dependent === constants.dependencies[check.id]
              ? {
                  ...check,
                  isLoading: action.check.isLoading,
                  response: action.check.response,
                  aborted: action.check.aborted
                }
              : check
          );
    case types.CHECK_LOAD_SUCCESS:
      return state.length === 0
        ? state
        : state.map(check =>
            action.checkIdentifier === check.id
              ? { ...check, isLoading: false, response: action.response }
              : check
          );
    case types.CHECK_LOAD_FAILURE:
      return state.length === 0
        ? state
        : state.map(check =>
            action.checkIdentifier === check.id
              ? { ...check, response: action.response }
              : check
          );
    case types.TERMINATE_CHECK:
      return state.map(check =>
        check.id === action.id ? { ...check, isLoading: false } : check
      );
    case types.RESET_CHECKS:
      return initialState.checkStatus;
    default:
      return state;
  }
}
