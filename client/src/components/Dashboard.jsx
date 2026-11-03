import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { loadJobs, loadApplications, createJob } from "../store/jobSlice";
import JobItem from "./JobItem";

const emptyForm = { title: "", company: "", location: "", description: "" };

function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { jobs, applications, error } = useSelector((state) => state.jobs);

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    dispatch(loadJobs());
    if (user.role === "seeker") dispatch(loadApplications());
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const result = await dispatch(createJob(form));
    if (createJob.fulfilled.match(result)) setForm(emptyForm);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <span>
          Logged in as: <strong>{user.name}</strong> ({user.role})
        </span>
        <button onClick={handleLogout} className="logout-btn">
          Log Out
        </button>
      </div>

      <h1>Job Portal</h1>
      {error && <p className="auth-error">{error}</p>}

      {user.role === "recruiter" && (
        <form onSubmit={handlePost} className="job-form">
          <input name="title" placeholder="Job title" value={form.title} onChange={handleChange} />
          <input name="company" placeholder="Company" value={form.company} onChange={handleChange} />
          <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
          <button type="submit">Post Job</button>
        </form>
      )}

      <h2>All Jobs</h2>
      <ul className="job-list">
        {jobs.map((job) => (
          <JobItem key={job._id} job={job} />
        ))}
      </ul>

      {user.role === "seeker" && (
        <>
          <h2>My Applications</h2>
          <ul className="job-list">
            {applications.map((a) => (
              <li key={a._id} className="job-item">
                {a.job.title} at {a.job.company}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Dashboard;
