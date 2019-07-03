var express = require("express");
var router = express.Router();

/* GET users listing. */
router.post("/", function(req, res, next) {
  res.send({ status: false, result: { message: "galaaaaat" } });
});

module.exports = router;
