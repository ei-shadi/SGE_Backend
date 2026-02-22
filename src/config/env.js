import dotenv from "dotenv";

dotenv.config();

const config = {
  db_url: process.env.MONGO_URI,
};

export default config;