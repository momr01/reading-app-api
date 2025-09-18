const express = require("express");
const router = express.Router();
const metaController = require("../../controllers/metaController");
//const auth = require("../../middleware/auth");

router.route("/getAll").get(
  //auth,
  metaController.getAllMetas
);

router.route("/add").post(
  //auth,
  metaController.addMeta
);

module.exports = router;
