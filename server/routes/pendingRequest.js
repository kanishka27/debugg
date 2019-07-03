var express = require("express");
var router = express.Router();

const fetch = require("node-fetch");
const apiUtils = require("../apiUtils");

function processGetRequest(url) {
  // TODO: handle exception and server side exceptions here only
  return fetch(url, {
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  }).then(apiUtils.handleResponse);
  // .catch(handleException);
}

router.get("/", (req, res) => {
  processGetRequest("https://hawkbackend.azurewebsites.net/api/pendingrequest")
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

module.exports = router;
