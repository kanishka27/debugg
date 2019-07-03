var express = require("express");
var router = express.Router();
const msRestAzure = require("ms-rest-azure");
const KeyVault = require("azure-keyvault");

const KEY_VAULT_URI = "https://hawkvault.vault.azure.net/";

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

router.get("/:keyname", function(req, res, next) {
  getKeyVaultCredentials()
    .then(credentials => {
      getKeyVaultSecret(credentials, req.params.keyname)
        .then(secret => {
          res.send({ secret: secret.value });
        })
        .catch(err => {
          res.status(500).send(err);
        });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
