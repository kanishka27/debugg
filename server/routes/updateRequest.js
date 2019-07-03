var express = require("express");
var router = express.Router();

const fetch = require("node-fetch");
const apiUtils = require("../apiUtils");

function processPostRequest(url, body) {
  // TODO: handle exception and server side exceptions here only
  console.log(body);
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  }).then(response => {
    if (response.ok) return response.text();
    throw new Error("Server side error!!");
  });
}

router.post("/", (req, res) => {
  const body = req.body;
  processPostRequest(
    "https://hawkbackend.azurewebsites.net/api/updatependingrequest",
    body
  )
    .then(response => {
      console.log(response);
      res.send({ response });
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

module.exports = router;
