import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import {
  getJobs,
  addJob,
  removeJob,
  applyToJob,
  getMyApplications,
} from "../api/job";
import { logout } from "./authSlice";

export const loadJobs = createAsyncThunk("jobs/loadJobs", async () => {
  return await getJobs();
});

export const createJob = createAsyncThunk("jobs/createJob", async (job) => {
  return await addJob(job);
});

export const deleteJob = createAsyncThunk("jobs/deleteJob", async (id) => {
  await removeJob(id);
  return id;
});

export const apply = createAsyncThunk("jobs/apply", async (id) => {
  return await applyToJob(id);
});

export const loadApplications = createAsyncThunk("jobs/loadApplications", async () => {
  return await getMyApplications();
});

const allThunks = [loadJobs, createJob, deleteJob, apply, loadApplications];

const jobSlice = createSlice({
  name: "jobs",
  initialState: { jobs: [], applications: [], error: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.jobs.unshift(action.payload);
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter((j) => j._id !== action.payload);
      })
      .addCase(apply.fulfilled, (state, action) => {
        state.applications.push(action.payload);
      })
      .addCase(loadApplications.fulfilled, (state, action) => {
        state.applications = action.payload;
      })
      // when someone logs out, clear their data from the store
      .addCase(logout, (state) => {
        state.jobs = [];
        state.applications = [];
        state.error = "";
      })
      .addMatcher(isPending(...allThunks), (state) => {
        state.error = "";
      })
      .addMatcher(isRejected(...allThunks), (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default jobSlice.reducer;
