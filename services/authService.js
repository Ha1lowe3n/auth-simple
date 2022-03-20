import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Role from "../models/role.model.js";
import User from "../models/user.model.js";

class AuthService {
    async getUsers() {
        return await User.find().select("-password");
    }
    async login(username, password) {
        const user = await User.findOne({ username });
        if (!user) throw new Error(`Пользователь ${username} не найден`);

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new Error("Неверный пароль");

        const token = this.generateAccessToken(user._id, user.roles);
        return token;
    }
    async registration(username, password) {
        console.log(username + ", " + password);
        const user = await User.findOne({ username });

        if (user) throw new Error("Пользователь с таким именем уже существует");

        const hashPassword = await bcrypt.hash(password, 10);

        return await User.create({
            username,
            password: hashPassword,
            roles: ["user"],
        });
    }

    generateAccessToken(userId, userRoles) {
        const payload = { userId, userRoles };
        return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: "24h",
        });
    }
}

export default new AuthService();
