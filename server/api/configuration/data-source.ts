import { config } from "dotenv";
import { DataSource } from "typeorm";
config();

const connectionPool = new DataSource({
  type: "postgres",
  username: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  entities: [__dirname + "/entity/*.{js,ts}"],
  ssl: process.env.DB_USERNAME === "mentorguser" ? true : false,
});

connectionPool
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
export default connectionPool;
