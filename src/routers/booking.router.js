const { Router } = require("express");
const router = Router();
const bookingCtrl = require("../controller/booking.controller");

router.get("/dashboard", bookingCtrl.getBooking);
router.post("/booking", bookingCtrl.addBooking);
router.put("/dashboard/status", bookingCtrl.updateBookingStatus);
router.delete("/dashboard", bookingCtrl.deleteBooking);

module.exports = router;