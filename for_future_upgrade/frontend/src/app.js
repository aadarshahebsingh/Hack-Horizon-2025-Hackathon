import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [problem, setProblem] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [doctors, setDoctors] = useState([]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/find-doctor", {
        problem,
      });
      setSpecialization(res.data.specialization);
      setDoctors(res.data.doctors);
    } catch (err) {
      alert("Failed to get doctors");
    }
  };

  return (
    <div className="App">
      <h1>🩺 Doctor Finder</h1>
      <input
        type="text"
        value={problem}
        placeholder="Describe your health issue..."
        onChange={(e) => setProblem(e.target.value)}
      />
      <button onClick={handleSubmit}>Find Doctors</button>

      {specialization && <h3>Suggested Specialization: {specialization}</h3>}

      {doctors.map((doc, i) => (
        <div key={i} className="card">
          <h4>{doc.name}</h4>
          <p><strong>Specialization:</strong> {doc.specialization}</p>
          <p><strong>Contact:</strong> {doc.contact}</p>
          <p><strong>Phone:</strong> {doc.phone_number}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
