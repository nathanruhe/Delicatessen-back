const { Router } = require("express");
const router = Router();
const newsletterCtrl = require("../controller/newsletter.controller");

router.post("/newsletter", newsletterCtrl.addNewsLetter);

module.exports = router;