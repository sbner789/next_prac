import "reflect-metadata";
import { DataSource } from "typeorm";
import { Post } from "./entity/Post";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "root",
    database: process.env.DB_NAME || "ssr_board",
    synchronize: true,
    logging: false,
    entities: [Post]
})