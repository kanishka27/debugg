import * as constants from "../../constants";

function initializaStatus() {
  var arr = [];
  var i = 0;
  for (i = 0; i < constants.NUMBER_OF_CHECKS; i++) {
    arr = arr.concat([
      {
        id: i,
        isLoading: false,
        aborted: false,
        response: null
      }
    ]);
  }
  return arr;
}

export default {
  form: {
    input: {
      url: "",
      accessToken: ""
    },
    submitted: false
  },
  checkStatus: initializaStatus(),
  params: {
    url: "",
    accessToken: "",
    clientId: "",
    domainAccountKey: "", //TODO:change names
    sapSystem: "",
    sapService: "",
    environment: "",
    resourceId: "",
    sapUsername: ""
  }
};
