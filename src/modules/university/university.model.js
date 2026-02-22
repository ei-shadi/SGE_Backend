import mongoose from "mongoose";

const universitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
    },
    location: {
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
      },
    },
    tuitionFee: {
      type: Number,
      required: true,
    },
    ranking: {
      type: Number,
      required: true,
    },
    establishedYear: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const University = mongoose.model("Universities", universitySchema);

export default University;