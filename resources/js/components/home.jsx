import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [userData, setUserData] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const navigate = useNavigate();

  useEffect(() => {
    const userDataProfile = localStorage.getItem("user"); // Get stored user data
    const token = localStorage.getItem("token"); // Get the stored JWT token

    // check if both userData && token exist
    if (userDataProfile && token) {
      try {
        // convert the userData from JSON string to JavaScript object
        const parsedUser = JSON.parse(userDataProfile);
        setUserData(parsedUser); // set the parsed user data to state

        // Extract user ID from the stored data (assuming the user object contains a user_id)
        const userId = parsedUser.user_id;

        // Send request to API with user_id
        axios
          .get(`http://127.0.0.1:8000/api/home/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }, // sending Bearer token
          })
          .then((response) => {
            console.log("Home data:", response.data); // Log response data

            // Retrieve user profile data from the response
            const fetchedData = response.data.user.profile;

            // Set the user profile data including work experience and education
            setUserData(fetchedData);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error); // log error
          });
      } catch (error) {
        console.error("Failed to parse user data:", error); // log error
        localStorage.removeItem("user"); // clear the user data from local storage
        localStorage.removeItem("token"); // clear the token from local storage
        navigate("/login"); // redirect to login page
      } finally {
        setLoading(false);
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (loading) {
    // Show loading spinner while data is being fetched
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <div className="row">
        <div className="col-12 text-center">
          <h1>Welcome to Your Profile</h1>
        </div>
      </div>

      {userData ? (
        <div className="row mt-5">
          {/* User Information */}
          <div className="col-md-8">
            <h3>{userData.name}</h3>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Phone:</strong> {userData.phone || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {userData.address || "N/A"}
            </p>
            <p>
              <strong>Skills:</strong> {userData.skills || "N/A"}
            </p>
            <p>
              <strong>Profile Summary:</strong> {userData.profileSummary || "N/A"}
            </p>

            {/* Work Experience */}
            <h5>Work Experience</h5>
            {userData.workExperience && userData.workExperience.length > 0 ? (
              userData.workExperience.map((work, index) => (
                <div key={index}>
                  <p><strong>Company:</strong> {work.company}</p>
                  <p><strong>Role:</strong> {work.role}</p>
                  <p><strong>Duration:</strong> {work.duration}</p>
                </div>
              ))
            ) : (
              <p>No work experience added.</p>
            )}

            {/* Education */}
            <h5>Education</h5>
            {userData.education && userData.education.length > 0 ? (
              userData.education.map((edu, index) => (
                <div key={index}>
                  <p><strong>School:</strong> {edu.school}</p>
                  <p><strong>Degree:</strong> {edu.degree}</p>
                  <p><strong>Year:</strong> {edu.year}</p>
                </div>
              ))
            ) : (
              <p>No education added.</p>
            )}

            {/* Certifications */}
            <h5>Certifications</h5>
            <p>{userData.certifications || "No certifications added."}</p>
          </div>
        </div>
      ) : (
        <div className="text-center mt-5">
          <p>No user data available.</p>
        </div>
      )}
    </div>
  );
}

export default Home;
