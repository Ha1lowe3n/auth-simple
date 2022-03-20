export const roleMiddleware = (req, res, next) => {
    try {
        if (!req.user.userRoles.includes("admin")) {
            return res
                .status(403)
                .json({ message: "Пользователь не администратор" });
        }
        next();
    } catch (error) {
        console.log(error);
        return res
            .status(403)
            .json({ message: "Пользователь не администратор" });
    }
};
