import Router from "express";
import { check } from "express-validator";

import {
    EMPTY_USERNAME,
    LENGTH_PASSWORD,
} from "../consts/validation-errors.consts.js";
import AuthController from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = new Router();

router.get("/users", [authMiddleware, roleMiddleware], AuthController.getUsers);
router.post(
    "/login",
    [
        check("username", EMPTY_USERNAME).notEmpty(),
        check("password", LENGTH_PASSWORD).isLength({ min: 4, max: 10 }),
    ],
    AuthController.login
);
router.post(
    "/registration",
    [
        check("username", EMPTY_USERNAME).notEmpty(),
        check("password", LENGTH_PASSWORD).isLength({ min: 4, max: 10 }),
    ],
    AuthController.registration
);

export default router;
