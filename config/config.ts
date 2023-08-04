import dotenv from "dotenv";

dotenv.config();
const { env } = process;

interface Config {
  PORT: number;
  SECRET_KEY: string;
  ConnectionString?: string;
}

const config: Config = {
  PORT: Number(env.PORT) || 4000,
  SECRET_KEY: env.SECRET_KEY || "key",
  ConnectionString: env.ConnectionString,
};

export default config;
