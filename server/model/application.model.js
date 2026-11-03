import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "jobs", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  },
  { timestamps: true },
);

export default mongoose.model("applications", applicationSchema);
