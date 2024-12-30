const express = require("express");
const cors = require('cors');
const AdminRouters = require("./routers/admin.router");
const AuthRouters = require("./routers/auth.router");
const BookingRouters = require("./routers/booking.router");
const JwtRouters = require("./routers/jwt.router");
const NewsletterRouters = require("./routers/newsletter.router");
const ReviewRouters = require("./routers/review.router");
const ContactRouters = require("./routers/contact.router");
const EventRouters = require("./routers/event.router");
const errorHandling = require("./error/errorHandling");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(AdminRouters);
app.use(AuthRouters);
app.use(BookingRouters);
app.use(JwtRouters);
app.use(NewsletterRouters);
app.use(ReviewRouters);
app.use(ContactRouters);
app.use(EventRouters);
app.use(function(req, res, next) {
    res.status(404).json({error:true, codigo: 404, message: "Endpoint doesnt found"});
});

app.use(errorHandling);

module.exports = app;