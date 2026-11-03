import jobs from "../model/job.model.js";
import applications from "../model/application.model.js";

export const createJob = async (req, res) => {
  try {
    if (req.role !== "recruiter") {
      return res.status(403).json({ message: "Only recruiters can post jobs" });
    }

    const { title, company, location, description } = req.body;
    if (!title || !company) {
      return res.status(400).json({ message: "Title and company are required" });
    }

    const job = await jobs.create({
      title,
      company,
      location,
      description,
      postedBy: req.userId,
    });
    return res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getJobs = async (req, res) => {
  try {
    const allJobs = await jobs.find().sort({ createdAt: -1 });
    return res.json(allJobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    // only the recruiter who posted the job can delete it
    const job = await jobs.findOneAndDelete({ _id: id, postedBy: req.userId });
    if (!job) return res.status(404).json({ message: "Job not found" });

    await applications.deleteMany({ job: id });
    return res.json({ message: "Job successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const applyToJob = async (req, res) => {
  try {
    if (req.role !== "seeker") {
      return res.status(403).json({ message: "Only job seekers can apply" });
    }

    const { id } = req.params;
    const job = await jobs.findById(id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const alreadyApplied = await applications.findOne({ job: id, user: req.userId });
    if (alreadyApplied) {
      return res.status(400).json({ message: "You already applied to this job" });
    }

    const application = await applications.create({ job: id, user: req.userId });
    await application.populate("job");
    return res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const myApplications = await applications
      .find({ user: req.userId })
      .populate("job");
    return res.json(myApplications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
