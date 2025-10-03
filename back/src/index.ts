import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import postRouter from "./routes/postRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/posts", postRouter);

app.get("/", (req, res) => res.send("SSR Board API is running"));

const PORT = Number(process.env.PORT) || 4000

AppDataSource.initialize()
.then(() => {
    console.log("Data Source initialized");
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
})
.catch((err) => {
    console.error("Data Source initialization error:", err);
});