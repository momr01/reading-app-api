const express = require("express");
const router = express.Router();
const baremoController = require("../../controllers/baremoController");
//const auth = require("../../middleware/auth");

router.route("/getAll").get(
  //auth,
  baremoController.getAllBaremos
);

router.route("/add").post(
  //auth,
  baremoController.addBaremo
);

router.route("/edit/:id").put(baremoController.editBaremo);

module.exports = router;
