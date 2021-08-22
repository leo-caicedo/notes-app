const { Router } = require("express");

const router = Router();
// services
const UserServices = require("../services/users.services");
const userServices = new UserServices();

router.get("/home", userServices.home);
// auht
router.get("/signup", userServices.signUpForm);
router.post("/signup", userServices.signup);
router.get("/signin", userServices.signInForm);
router.post("/signin", userServices.signin);
router.get("/logout", userServices.logOut);

module.exports = router;
