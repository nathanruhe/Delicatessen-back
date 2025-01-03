const { Router } = require("express");
const router = Router();
const eventCtrl = require("../controller/event.controller");

router.get("/events", eventCtrl.getEvent);
router.post("/dashboard", eventCtrl.addEvent);
router.put("/dashboard", eventCtrl.putEvent);
router.delete("/events", eventCtrl.deleteEvent);

module.exports = router;