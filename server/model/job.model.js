import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    description: { type: String, trim: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  },
  { timestamps: true },
);

export default mongoose.model("jobs", jobSchema);
