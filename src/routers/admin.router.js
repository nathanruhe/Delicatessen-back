const { Router } = require("express");
const router = Router();
const adminCtrl = require("../controller/admin.controller");

router.post('/admin', adminCtrl.getAdmin);

module.exports = router;