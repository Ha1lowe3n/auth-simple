import AuthService from "../services/authService.js";
import { validationResult } from "express-validator";

class AuthController {
    async getUsers(req, res) {
        try {
            const users = await AuthService.getUsers();
            return res.json(users);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "server can't get users" });
        }
    }
    async login(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "Login error",
                    errors: errors.errors,
                });
            }

            const { username, password } = req.body;
            const token = await AuthService.login(username, password);
            return res.json({ token });
        } catch (error) {
            console.log(error);
            return res.status(400).json(error.message);
        }
    }
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "Registration error",
                    errors: errors.errors,
                });
            }

            const { username, password } = req.body;

            const newUser = await AuthService.registration(username, password);
            return res.json(newUser);
        } catch (error) {
            console.log(error.message);
            return res.status(400).json(error.message);
        }
    }
}

export default new AuthController();
