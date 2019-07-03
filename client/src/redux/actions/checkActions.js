import { types } from "./actionTypes";
import * as checkApi from "../../api/processChecksApi";
import * as constants from "../../constants";
import * as paramsActions from "./paramsAction";
import * as formActions from "./formActions";

// Actions to manage processing of various checks

export function startCheck(check) {
  // starts the processing of checks
  return { type: types.CHECK_START, check };
}

export function resetChecks() {
  // action to reset all checks
  return { type: types.RESET_CHECKS };
}

export function terminateCheck(id) {
  // action to terminate a check
  return { type: types.TERMINATE_CHECK, id };
}

export function loadCheckSuccess(response, checkIdentifier) {
  return {
    type: types.CHECK_LOAD_SUCCESS,
    response,
    checkIdentifier
  };
}

export function loadCheckFailure(response, checkIdentifier) {
  return { type: types.CHECK_LOAD_FAILURE, response, checkIdentifier };
}

function processBody(checkId, params) {
  // generates body for post call
  return { ...params, checkId: constants.checkIdentifier[checkId] }; //TODO: hardcode keys of different endpoints in constants.js and get them here
}

export function loadCheck(checkIdentifier, params) {
  // thunk to start the processing of a check
  var body = JSON.stringify(processBody(checkIdentifier, params));
  var url = "/api/processCheck";

  return function(dispatch, getState) {
    return checkApi
      .getResponse(url, body, "POST")
      .then(response => {
        console.log(JSON.stringify(response));
        if (getState().form.submitted) {
          if (response.status) {
            dispatch(loadCheckSuccess(response, checkIdentifier));
            var result = response.result;
            // dispatching actions to update store with the recieved parameters
            //START
            if (result.clientId !== undefined)
              dispatch(paramsActions.updateClient(result.clientId));
            if (result.domainAccountKey !== undefined)
              dispatch(paramsActions.updateDomainKey(result.domainAccountKey));
            if (result.sapSystem !== undefined)
              dispatch(paramsActions.updateSystem(result.sapSystem));
            if (result.sapService !== undefined)
              dispatch(paramsActions.updateService(result.sapService));
            if (result.environment !== undefined)
              dispatch(paramsActions.updateEnvironment(result.environment));
            if (result.resourceId !== undefined)
              dispatch(paramsActions.updateResId(result.resourceId));
            if (result.sapUsername !== undefined)
              dispatch(paramsActions.updateSapUsername(result.sapUsername));
            //END
            dispatch(
              startCheck({
                ...constants.START_CHECK,
                dependent: checkIdentifier
              })
            );
          } else {
            dispatch(loadCheckFailure(response, checkIdentifier));
          }
        } else {
          dispatch(terminateCheck(checkIdentifier));
        }
      })
      .catch(error => {
        console.log("aa");
        if (getState().form.submitted) {
          dispatch(
            loadCheckFailure(
              {
                status: false,
                result: {
                  message: error.message
                }
              },
              checkIdentifier
            )
          );
        } else {
          dispatch(terminateCheck(checkIdentifier));
        }
      });
  };
}
