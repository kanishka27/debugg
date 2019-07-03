import { combineReducers } from "redux";
import checkStatus from "./checkReducer/checkReducer";
import form from "./formReducer/formReducer";
import params from "./paramsReducer/paramsReducer";

const rootReducer = combineReducers({
  form,
  checkStatus,
  params
});

export default rootReducer;
