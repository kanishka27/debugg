import initialState from "../initialState";
import { types } from "../../actions/actionTypes";
import * as constants from "../../../constants";

export default function checkReducer(state = initialState.checkStatus, action) {
  switch (action.type) {
    case types.CHECK_START: // to start the execution of checks having dependencies equal to action.check.dependent
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
    case types.CHECK_LOAD_SUCCESS: // to be executed after successful check response
      return state.length === 0
        ? state
        : state.map(check =>
            action.checkIdentifier === check.id
              ? { ...check, isLoading: false, response: action.response }
              : check
          );
    case types.CHECK_LOAD_FAILURE: // to be executed after unsuccessful check response
      return state.length === 0
        ? state
        : state.map(check =>
            action.checkIdentifier === check.id
              ? { ...check, response: action.response }
              : check
          );
    case types.TERMINATE_CHECK: // to abort a particular check
      return state.map(check =>
        check.id === action.id ? { ...check, isLoading: false } : check
      );
    case types.RESET_CHECKS: // to reset all checks to the initial state
      return initialState.checkStatus;
    default:
      // default case
      return state;
  }
}
