import mongoose from "mongoose";
import config from "../config/env.js";
import University from "../modules/university/university.model.js";
import universityData from "./university.data.js";

const seed = async () => {
  try {
    await mongoose.connect(config.db_url);

    await University.deleteMany();
    await University.insertMany(universityData);

    console.log("University data seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();