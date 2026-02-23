import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import universityModel from "./modules/university/university.model.js";

const app = express();

// Middlewares
app.use(express.json());

// Connect to Database
connectDB();


// Get EndPoints - To Get All Universities or Filter University Data By Country
app.get("/universities", async (req, res) => {
  try {
    const {
      name,
      country,
      city,
      state,
      tuitionFeeMin,
      tuitionFeeMax,
      rankingMin,
      rankingMax,
      establishedYearMin,
      establishedYearMax,
    } = req.query;

    const filter = {};

    // Filter by University Name
    if (name) {
      filter.name = { $regex: new RegExp(name, "i") }; // case-insensitive search
    }

    // Filter by Country
    if (country) {
      filter.country = { $regex: new RegExp(`^${country}$`, "i") };
    }

    // Filter by City
    if (city) {
      filter["location.city"] = { $regex: new RegExp(`^${city}$`, "i") };
    }

    // Filter by State
    if (state) {
      filter["location.state"] = { $regex: new RegExp(`^${state}$`, "i") };
    }

    // Filter by Tuition Fee Range
    if (tuitionFeeMin || tuitionFeeMax) {
      filter.tuitionFee = {};
      if (tuitionFeeMin) filter.tuitionFee.$gte = Number(tuitionFeeMin);
      if (tuitionFeeMax) filter.tuitionFee.$lte = Number(tuitionFeeMax);
    }

    // Filter by Ranking Range
    if (rankingMin || rankingMax) {
      filter.ranking = {};
      if (rankingMin) filter.ranking.$gte = Number(rankingMin);
      if (rankingMax) filter.ranking.$lte = Number(rankingMax);
    }

    // Filter by Established Year Range
    if (establishedYearMin || establishedYearMax) {
      filter.establishedYear = {};
      if (establishedYearMin) filter.establishedYear.$gte = Number(establishedYearMin);
      if (establishedYearMax) filter.establishedYear.$lte = Number(establishedYearMax);
    }

    const universities = await universityModel.find(filter);

    // Empty Validation
    if (universities.length === 0) {
      return res.status(404).json({
        message: "No universities found with the given filters",
      });
    }

    res.status(200).json({
      message: "Data Fetched Successfully!",
      data: universities,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Post EndPoints - To Store University Data
app.post("/add-university", async (req, res) => {
  try {
    const { name, country, city, state, tuitionFee, ranking, establishedYear } = req.body;

      // Validation
    if (!name || !country || !city) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    // Create University
    const university = await universityModel.create({
      name,
      country,
      location: {
        city,
        state,
      },
      tuitionFee,
      ranking,
      establishedYear,
    });

    // Response Data
    res.status(201).json({
      message: "Data Stored Successfully!",
      data: university,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});



export default app;
