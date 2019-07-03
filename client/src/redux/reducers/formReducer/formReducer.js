import initialState from "./../initialState";
import { types } from "../../actions/actionTypes";

export default function formReducer(state = initialState.form, action) {
  switch (action.type) {
    case types.SUBMIT_FORM:
      return { ...state, input: action.input };
    case types.RESET_FORM:
      return { ...state, input: initialState.form.input };
    case types.SET_SUBMITTED:
      return { ...state, submitted: true };
    case types.UNSET_SUBMITTED:
      return { ...state, submitted: false };
    default:
      return state;
  }
}
