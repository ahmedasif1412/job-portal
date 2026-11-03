import { useDispatch, useSelector } from "react-redux";
import { apply, deleteJob } from "../store/jobSlice";

function JobItem({ job }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const applications = useSelector((state) => state.jobs.applications);

  const hasApplied = applications.some((a) => a.job._id === job._id);

  return (
    <li className="job-item">
      <h3>{job.title}</h3>
      <p>
        {job.company} - {job.location}
      </p>
      <p>{job.description}</p>

      {user.role === "seeker" && (
        <button disabled={hasApplied} onClick={() => dispatch(apply(job._id))}>
          {hasApplied ? "Applied" : "Apply"}
        </button>
      )}

      {job.postedBy === user.id && (
        <button onClick={() => dispatch(deleteJob(job._id))}>Delete</button>
      )}
    </li>
  );
}

export default JobItem;
