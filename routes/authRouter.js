import Router from "express";
import controller from "../controllers/authController.js";

const router = new Router();

router.get("/users", controller.getUsers);
router.get("/login", controller.login);
router.get("/registration", controller.registration);

export default router;
