const BASE_URL = `${import.meta.env.VITE_API_URL}/api/jobs`;
//const BASE_URL = "http://localhost:5000/api/jobs";

export const getJobs = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const addJob = async (job) => {
  const token = localStorage.getItem("token");

  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(job),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const removeJob = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const applyToJob = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/${id}/apply`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const getMyApplications = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/applications/mine`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};
