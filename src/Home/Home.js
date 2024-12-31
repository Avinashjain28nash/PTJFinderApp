import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Home() {
  const [jobs, setJobs] = useState([]);
  const [showJobs, setShowJobs] = useState(false);
  const navigate = useNavigate()

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/jobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch("http://127.0.0.1:5000/location", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ latitude, longitude }),
          })
            .then((response) => response.json())
            .then((data) => console.log("Location sent:", data))
            .catch((error) => console.error("Error:", error));
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <button onClick={getLocation}>Get Location</button>
      <button onClick={() => setShowJobs(!showJobs)}>
        {showJobs ? "Hide Jobs" : "View Jobs"}
      </button>
      <button onClick={handleLogout}>Logout</button>

      {showJobs && (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <h3>{job.title}</h3>
              <p>Location: {job.location}</p>
              <p>Description: {job.description}</p>
              <p>Salary: ${job.salary}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
