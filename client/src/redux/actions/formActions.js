import { types } from "./actionTypes";

//Action to update store with the inputs

export function submitForm(input) {
  // action to be dispatched after submitting form
  return { type: types.SUBMIT_FORM, input };
}

export function resetForm() {
  // action to be dispatched to reset form
  return { type: types.RESET_FORM };
}

export function setSubmitted() {
  // action to set submitted as true
  return { type: types.SET_SUBMITTED };
}

export function unsetSubmitted() {
  // action to set submitted as false
  return { type: types.UNSET_SUBMITTED };
}
