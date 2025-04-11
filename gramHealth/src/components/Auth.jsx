import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const doctors = JSON.parse(localStorage.getItem("doctors")) || [];

    // Check in doctors
    const doctor = doctors.find(doc => doc.email === email && doc.password === password);

    if (doctor) {
      localStorage.setItem("userType", "doctors");
      localStorage.setItem("currentUser", JSON.stringify(doctor));
      navigate("/DoctorDashboard");
      return;
    }

    // You can similarly add patient check if needed here...

    alert("Invalid credentials!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
    <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={e => setEmail(e.target.value)}
      className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={e => setPassword(e.target.value)}
      className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <button
      onClick={handleLogin}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-300"
    >
      Login
    </button>
  </div>
</div>

  );
};

export default Auth;
