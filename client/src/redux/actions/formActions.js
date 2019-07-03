import { types } from "./actionTypes";

//Action to update store with the inputs

export function submitForm(input) {
  return { type: types.SUBMIT_FORM, input };
}

export function resetForm() {
  return { type: types.RESET_FORM };
}

export function setSubmitted() {
  return { type: types.SET_SUBMITTED };
}

export function unsetSubmitted() {
  return { type: types.UNSET_SUBMITTED };
}
