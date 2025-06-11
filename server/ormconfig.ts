import { DataSource } from "typeorm";
import path from "path";
import { getDBConnectionString } from "@/bikiran/utils/EnvTS";

export const AppDataSource = new DataSource({
  type: "postgres",
  database: getDBConnectionString(),
  synchronize: false,
  logging: false,
  entities: [path.resolve(__dirname, "server/entities/**/*.ts")],
  migrations: [path.resolve(__dirname, "server/migrations/**/*.ts")],
  subscribers: [],
});
