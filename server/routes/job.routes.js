import express from "express";
import {
  applyToJob,
  createJob,
  deleteJob,
  getJobs,
  getMyApplications,
} from "../controller/job.controller.js";
import { verifyToken } from "../middleware/auth.js";

const jobRoutes = express.Router();

jobRoutes.use(verifyToken);

jobRoutes.get("/", getJobs);
jobRoutes.post("/", createJob);
jobRoutes.get("/applications/mine", getMyApplications);
jobRoutes.post("/:id/apply", applyToJob);
jobRoutes.delete("/:id", deleteJob);

export default jobRoutes;
