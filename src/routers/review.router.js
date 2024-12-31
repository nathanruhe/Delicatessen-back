const { Router } = require("express");
const router = Router();
const reviewCtrl = require("../controller/review.controller");

router.get("/review", reviewCtrl.getReview);
router.post("/review", reviewCtrl.addReview);

module.exports = router;