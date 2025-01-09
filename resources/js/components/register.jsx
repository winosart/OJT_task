import React, { useState } from "react";
import axios from "axios";
import "materialize-css/dist/css/materialize.min.css"; // Import Materialize CSS

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [profileSummary, setProfileSummary] = useState("");
  const [workExperience, setWorkExperience] = useState([{ company: "", role: "", duration: "" }]);
  const [education, setEducation] = useState([{ school: "", degree: "", year: "" }]);
  const [skills, setSkills] = useState("");
  const [certifications, setCertifications] = useState("");

  const handleAddWorkExperience = () => {
    setWorkExperience([...workExperience, { company: "", role: "", duration: "" }]);
  };

  const handleAddEducation = () => {
    setEducation([...education, { school: "", degree: "", year: "" }]);
  };

  const handleWorkChange = (index, field, value) => {
    const updatedWork = [...workExperience];
    updatedWork[index][field] = value;
    setWorkExperience(updatedWork);
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        password,
        phone,
        address,
        dob,
        profileSummary,
        workExperience,
        education,
        skills,
        certifications,
      });

      console.log("Response:", response.data);
      alert("Registration successful! Please log in.");
    } catch (err) {
      if (err.response) {
        console.error("Error response:", err.response);
        alert(err.response.data.message || "Registration failed");
      } else {
        alert("Something went wrong.");
      }
    }
  };

  return (
    <div
      className="container"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="row">
        <div
          className="col s12 m10 l8"
          style={{
            maxWidth: "700px",
            width: "100%",
          }}
        >
          <div className="card">
            <div className="card-content">
              <span className="card-title center-align teal-text">Resume-Style Registration</span>
              <form onSubmit={handleSubmit}>
                {/* Basic Information */}
                <h5 className="teal-text">Basic Information</h5>
                <div className="input-field">
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label htmlFor="name" className="active">
                    Full Name
                  </label>
                </div>
                <div className="input-field">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="email" className="active">
                    Email Address
                  </label>
                </div>
                <div className="input-field">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="password" className="active">
                    Password
                  </label>
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <label htmlFor="phone" className="active">
                    Phone Number
                  </label>
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                  <label htmlFor="address" className="active">
                    Address
                  </label>
                </div>
                <div className="input-field">
                  <input
                    type="date"
                    id="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                  />
                  <label htmlFor="dob" className="active">
                    Date of Birth
                  </label>
                </div>

                {/* Profile Summary */}
                <h5 className="teal-text">Profile Summary</h5>
                <div className="input-field">
                  <textarea
                    id="profileSummary"
                    value={profileSummary}
                    onChange={(e) => setProfileSummary(e.target.value)}
                    className="materialize-textarea"
                    required
                  />
                  <label htmlFor="profileSummary" className="active">
                    Summary
                  </label>
                </div>

                {/* Work Experience */}
                <h5 className="teal-text">Work Experience</h5>
                {workExperience.map((work, index) => (
                  <div key={index} className="row">
                    <div className="input-field col s12 m4">
                      <input
                        type="text"
                        placeholder="Company"
                        value={work.company}
                        onChange={(e) => handleWorkChange(index, "company", e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-field col s12 m4">
                      <input
                        type="text"
                        placeholder="Role"
                        value={work.role}
                        onChange={(e) => handleWorkChange(index, "role", e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-field col s12 m4">
                      <input
                        type="text"
                        placeholder="Duration"
                        value={work.duration}
                        onChange={(e) => handleWorkChange(index, "duration", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn-small teal"
                  onClick={handleAddWorkExperience}
                >
                  Add More Experience
                </button>

                {/* Education */}
                <h5 className="teal-text">Education</h5>
                {education.map((edu, index) => (
                  <div key={index} className="row">
                    <div className="input-field col s12 m4">
                      <input
                        type="text"
                        placeholder="School"
                        value={edu.school}
                        onChange={(e) => handleEducationChange(index, "school", e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-field col s12 m4">
                      <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-field col s12 m4">
                      <input
                        type="text"
                        placeholder="Year"
                        value={edu.year}
                        onChange={(e) => handleEducationChange(index, "year", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn-small teal"
                  onClick={handleAddEducation}
                >
                  Add More Education
                </button>

                {/* Skills */}
                <h5 className="teal-text">Skills</h5>
                <div className="input-field">
                  <textarea
                    id="skills"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="materialize-textarea"
                    required
                  />
                  <label htmlFor="skills" className="active">
                    List Your Skills
                  </label>
                </div>

                {/* Certifications */}
                <h5 className="teal-text">Certifications</h5>
                <div className="input-field">
                  <textarea
                    id="certifications"
                    value={certifications}
                    onChange={(e) => setCertifications(e.target.value)}
                    className="materialize-textarea"
                    required
                  />
                  <label htmlFor="certifications" className="active">
                    Certifications
                  </label>
                </div>

                <div className="row">
                  <button
                    type="submit"
                    className="btn waves-effect waves-light teal darken-2"
                    style={{ width: "100%" }}
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>

            <div className="card-action center-align">
              <p>
                Already have an account?{" "}
                <a href="/login" className="teal-text">
                  Login here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
