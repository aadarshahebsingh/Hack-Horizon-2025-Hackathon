import React, { useState } from "react";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button";

const doctors = [
  { name: "Dr. Jane Smith", specialization: "Cardiologist", keyword: "heart" },
  { name: "Dr. Aisha Khan", specialization: "Dermatologist", keyword: "skin" },
  { name: "Dr. Rahul Verma", specialization: "Neurologist", keyword: "headache" },
  { name: "Dr. Sofia Garcia", specialization: "Pediatrician", keyword: "child" },
  { name: "Dr. Olivia Wilson", specialization: "Psychiatrist", keyword: "anxiety" },
];

const PatientDashboard = () => {
  const [problem, setProblem] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = () => {
    const lower = problem.toLowerCase();
    const matches = doctors.filter((doc) =>
      lower.includes(doc.keyword)
    );
    setSuggestions(matches.length ? matches : [{ name: "No matching doctors found", specialization: "" }]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Patient Dashboard</h1>

      {/* Patient Info */}
      <Card className="mb-6">
        <CardContent className="flex items-center gap-4">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Patient"
            className="w-16 h-16 rounded-full"
          />
          <div className="flex items-start justify-between w-full">
            <div>
                <h2 className="text-xl font-semibold">Emily Watson</h2>
                <p className="text-gray-500 text-sm">emily.watson@example.com</p>
            </div>
            <div >
                <button>Medic</button>
                <button className="text-white rounded-2xl p-4 font-semibold border-2 bg-red-500">SoS</button>
                <button className="bg-white rounded-2xl p-4 font-semibold border-2 border-green-600">Login As Doctor</button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Problem Input */}
      <Card className="mb-6">
        <CardContent>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Describe Your Problem</h3>
          <textarea
            rows="4"
            className="w-full p-3 border rounded-md outline-none resize-none"
            placeholder="e.g. I've been having frequent headaches and dizziness..."
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          ></textarea>
          <Button className="mt-4" onClick={handleSubmit}>
            Suggest Doctors
          </Button>
        </CardContent>
      </Card>

      
      
    </div>
  );
};

export default PatientDashboard;

