import initialState from "./../initialState";
import { types } from "../../actions/actionTypes";

export default function formReducer(state = initialState.form, action) {
  switch (action.type) {
    case types.SUBMIT_FORM: // to be executed after the form is submitted
      return { ...state, input: action.input };
    case types.RESET_FORM: // to reset the inputs of the form
      return { ...state, input: initialState.form.input };
    case types.SET_SUBMITTED: // to set submitted store variable as true
      return { ...state, submitted: true };
    case types.UNSET_SUBMITTED: // to set submitted store variable as false
      return { ...state, submitted: false };
    default:
      // default case
      return state;
  }
}
