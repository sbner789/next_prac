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

const PORT = process.env.PORT || 4000;

AppDataSource.initialize()
.then(() => {
    console.log("Data Source initialized");
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
})
.catch((err) => {
    console.error("Data Source initialization error:", err);
});