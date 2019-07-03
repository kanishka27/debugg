var express = require("express");
var router = express.Router();

const fetch = require("node-fetch");
const apiUtils = require("../apiUtils");

const msRestAzure = require("ms-rest-azure");
const KeyVault = require("azure-keyvault");

const KEY_VAULT_URI = "https://hawkvault.vault.azure.net";

let clientId = process.env["CLIENT_ID"]; // service principal
let domain = process.env["domain"]; //process.env['DOMAIN']; // tenant id
let secret = process.env["APPLICATION_SECRET"];

function getKeyVaultCredentials() {
  if (process.env.APPSETTING_WEBSITE_SITE_NAME) {
    return msRestAzure.loginWithAppServiceMSI({
      resource: "https://vault.azure.net"
    });
  } else {
    return msRestAzure.loginWithServicePrincipalSecret(
      clientId,
      secret,
      domain
    );
  }
}

function getKeyVaultSecret(credentials, keyName) {
  let keyVaultClient = new KeyVault.KeyVaultClient(credentials);
  return keyVaultClient.getSecret(KEY_VAULT_URI, keyName, "");
}

// const appInsights = require("applicationinsights");
// appInsights.setup("ae1dfef0-78fa-42c9-8afd-9e2f76605123").start();
// const key = appInsights.defaultClient.context.keys.cloudRole;
// appInsights.defaultClient.context.tags[key] = "FrontEnd-Api";
// appInsights.start();

function processGetRequest(url) {
  // TODO: handle exception and server side exceptions here only
  return fetch(url).then(apiUtils.handleResponse);
  // .catch(handleException);
}

function processPostRequest(url, body) {
  // TODO: handle exception and server side exceptions here only
  return fetch(url, {
    method: "post",
    body,
    headers: {
      "Content-Type": "application/json"
    }
  }).then(apiUtils.handleResponse);
}

function processSecret(secret) {
  // TODO: if values.length <2
  var values = secret.split(";");
  var url = values[0];
  var type = values[1].toUpperCase();
  var params = values.slice(2, values.length);
  return {
    url,
    type,
    params
  };
}

function processUrl(endpoint, params) {
  // to generate url for get request
  var param = endpoint.params;

  url = endpoint.url.concat("?");
  param.forEach(element => {
    url = url.concat(element, "=", params[element], "&");
  });
  return url.substr(0, url.length - 1);
}

function processBody(endpoint, params) {
  // generates body for post call
  var param = endpoint.params;
  var body = {};
  param.forEach(element => {
    body = { ...body, [element]: params[element] };
  });
  return body;
}

router.post("/", function(req, res, next) {
  // TODO: handle exception and server side exceptions here only
  // requires body to constitute: {call params(to be passed in calls as required), checkId(to identify check)}
  const body = req.body;
  getKeyVaultCredentials()
    .then(credentials => {
      getKeyVaultSecret(credentials, body.checkId)
        .then(secret => {
          const value = secret.value;
          const endpoint = processSecret(value);
          if (endpoint.type === "GET") {
            const url = processUrl(endpoint, body);
            processGetRequest(url)
              .then(response => {
                console.log(response);
                res.send(response);
              })
              .catch(err => {
                console.log(err);
                res.status(500).send(err);
              });
          } else if (endpoint.type === "POST") {
            const requestBody = JSON.stringify(processBody(endpoint, body));
            console.log(requestBody);
            processPostRequest(endpoint.url, requestBody)
              .then(response => {
                console.log(response);
                res.send(response);
              })
              .catch(err => {
                console.log("sddfdefsdf");
                console.log(err);
                res.status(500).send(err);
              });
          } else {
            console.log("Invalid data in keyvault!!");
            res.status(500).send("Server is not responding!!");
          }
        })
        .catch(error => {
          console.log(error);
          res.status(500).send(error);
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
});

module.exports = router;
