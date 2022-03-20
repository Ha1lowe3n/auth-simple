import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import authRouter from "./routes/authRouter.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use("/auth", authRouter);

(async function () {
    await connectDB();
    app.listen(PORT, console.log(`Server running on port ${PORT}`));
})();
