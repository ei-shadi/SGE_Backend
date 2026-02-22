import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import universityModel from './modules/university/university.model.js';

const app = express();

// Middlewares
app.use(express.json());

// Connect to Database
connectDB();

// Get EndPoints - To Fetch University Data
app.get("/universities", async (req, res) => {
  try {
    const universities = await universityModel.find();
    res.status(200).json({
      message: "Data Fetched Successfully!",
      data: universities,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

// Post EndPoints - To Store University Data
app.post("/add-university", async (req, res) => {
  try {
    const { name, country, city, state, tuitionFee, ranking, establishedYear } = req.body;

    if (!name || !country || !city) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

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