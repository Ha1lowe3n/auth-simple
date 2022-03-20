import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    if (req.method === "OPTIONS") next();

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decodedData;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: "Пользователь не авторизован" });
    }
};
