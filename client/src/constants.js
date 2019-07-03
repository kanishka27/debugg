export const VALIDATE_URL = 0;
export const GET_CLIENT_ID = 3;
export const VALIDATE_CLIENT_ID = 4;
export const CHECK_TOKEN_PERMISSIONS = 5;
export const CHECK_WITH_TOKEN = 7;
export const SERVICE_DEPLOYMENT_DATE = 2;
export const CHECK_SNC_MATCH = 6;
export const CHECK_SAP_DOWN = 1;
//INTRODUCE NEW CHECK BY ASSIGNING IT AN UNIQUE INDEX (0 <= INDEX < NUMBER_OF_CHECKS)

export const NUMBER_OF_CHECKS = 8;
//UPDATE NUMBER OF CHECKS

export const INITIAL_CHECK = -1;

export const START_CHECK = {
  isLoading: true,
  aborted: false,
  response: null
};
export const ABORT_CHECK = {
  isLoading: true,
  aborted: true,
  response: {
    status: false,
    result: {
      message: "Aborted"
    }
  }
};

function assignCheckNames() {
  //add name of new check
  var checkNames = Array(NUMBER_OF_CHECKS).fill("");
  checkNames[VALIDATE_URL] = "Check Validity of URL";
  checkNames[GET_CLIENT_ID] = "Extract Client Id from AAD Token";
  checkNames[VALIDATE_CLIENT_ID] = "Check if client id is onboarded";
  checkNames[CHECK_TOKEN_PERMISSIONS] =
    "Check for necessary permissions in AAD Token";
  checkNames[CHECK_WITH_TOKEN] = "Test connection with AAD token";
  checkNames[SERVICE_DEPLOYMENT_DATE] = "Last Service Deployment Date";
  checkNames[CHECK_SNC_MATCH] = "Validate SNC Mapping";
  checkNames[CHECK_SAP_DOWN] = "Check if SAP System is down";
  return checkNames;
}

export const CHECKS_NAME = assignCheckNames();

function assignDependencies() {
  //assign dependency of any new check(if any)
  var dependency = Array(NUMBER_OF_CHECKS).fill(INITIAL_CHECK);
  dependency[GET_CLIENT_ID] = VALIDATE_URL;
  dependency[VALIDATE_CLIENT_ID] = GET_CLIENT_ID;
  dependency[CHECK_TOKEN_PERMISSIONS] = GET_CLIENT_ID;
  dependency[CHECK_WITH_TOKEN] = VALIDATE_CLIENT_ID;
  dependency[SERVICE_DEPLOYMENT_DATE] = VALIDATE_URL;
  dependency[CHECK_SNC_MATCH] = VALIDATE_CLIENT_ID;
  dependency[CHECK_SAP_DOWN] = VALIDATE_URL;
  return dependency;
}

export const dependencies = assignDependencies();

function assignIdentifiers() {
  var identifiers = Array(NUMBER_OF_CHECKS).fill("");
  identifiers[VALIDATE_URL] = "VALIDATE-URL";
  identifiers[GET_CLIENT_ID] = "GET-CLIENT-ID";
  identifiers[VALIDATE_CLIENT_ID] = "VALIDATE-CLIENT-ID";
  identifiers[CHECK_TOKEN_PERMISSIONS] = "CHECK-TOKEN-PERMISSIONS";
  identifiers[CHECK_WITH_TOKEN] = "CHECK-WITH-TOKEN";
  identifiers[SERVICE_DEPLOYMENT_DATE] = "SERVICE-DEPLOYMENT-DATE";
  identifiers[CHECK_SNC_MATCH] = "CHECK-SNC-MATCH";
  identifiers[CHECK_SAP_DOWN] = "CHECK-SAP";
  return identifiers;
}

export const checkIdentifier = assignIdentifiers();

function assignContacts() {
  var contacts = Array(NUMBER_OF_CHECKS).fill("");
  contacts[VALIDATE_URL] = "sapwsdev@microsoft.com";
  contacts[GET_CLIENT_ID] = "";
  contacts[VALIDATE_CLIENT_ID] = "https://eusapim.portal.azure-api.net";
  contacts[CHECK_TOKEN_PERMISSIONS] = "";
  contacts[CHECK_WITH_TOKEN] = "sapwsdev@microsoft.com";
  contacts[SERVICE_DEPLOYMENT_DATE] = "sapwsdev@microsoft.com";
  contacts[CHECK_SNC_MATCH] = "sapwsdev@microsoft.com";
  contacts[CHECK_SAP_DOWN] = "saptecops@microsoft.com/SAPTECSO@microsoft.com";
  return contacts;
}

export const contacts = assignContacts();

//TODO: remove after successful integration
// function assignParams() {
//   var params = Array(NUMBER_OF_CHECKS).fill(Array());
//   params[VALIDATE_URL] = ["url"];
//   params[GET_CLIENT_ID] = ["accessToken"];
//   params[VALIDATE_CLIENT_ID] = ["service", "clientId"];
//   params[CHECK_TOKEN_PERMISSIONS] = ["url", "resId"];
//   params[CHECK_WITH_TOKEN] = ["accessToken", "url"];
//   params[SERVICE_DEPLOYMENT_DATE] = ["system", "service", "environment"];
//   params[CHECK_SNC_MATCH] = ["url", "domainAccountKey"];
//   params[CHECK_SAP_DOWN] = ["accessToken"];
//   return params;
// }

// export const requiredParams = assignParams();

// function assignApis() {
//   var api = Array(NUMBER_OF_CHECKS).fill({
//     url: "http://localhost:3001/responseSuccess",
//     type: "get"
//   });
//   api[VALIDATE_URL] = {
//     url: "https://debugged20190610010641.azurewebsites.net/api/CheckUrl",
//     type: "get"
//   };
//   api[GET_CLIENT_ID] = {
//     url: "https://debugged20190610010641.azurewebsites.net/api/ClientId",
//     type: "get"
//   };
//   api[SERVICE_DEPLOYMENT_DATE] = {
//     url: "https://debugged20190610010641.azurewebsites.net/api/Release",
//     type: "get"
//   };
//   api[CHECK_TOKEN_PERMISSIONS] = {
//     url: "https://clientonbapi2.azurewebsites.net/api/TestPerm",
//     type: "post"
//   };
//   api[VALIDATE_CLIENT_ID] = {
//     url: "https://clientonbapi2.azurewebsites.net/api/clientOnB",
//     type: "get"
//   };
//   api[CHECK_SNC_MATCH] = {
//     url: "https://clientonbapi2.azurewebsites.net/api/SNC",
//     type: "get"
//   };
//   api[CHECK_WITH_TOKEN] = {
//     url: "https://clientonbapi2.azurewebsites.net/api/TestConn",
//     type: "post"
//   };
//   return api;
// }

// export const API = assignApis();

//

// export const KEY_VAULT_URI = null || process.env["KEY_VAULT_URI"];
