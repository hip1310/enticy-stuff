module.exports = {
  type: "postgres",
  username: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  entities: ["./src/api/*/*.entity.ts"],
  migrations: ["./src/api/*/*.entity.ts"],
  ssl: process.env.DB_USERNAME === "mentorguser" ? true : false,
  migrationsRun: true,
};
