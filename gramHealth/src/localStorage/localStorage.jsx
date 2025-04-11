// localStorage.jsx

const doctors = [
  {
    name: "Dr. Jane Smith",
    specialization: "Cardiologist",
    reports: 32,
    patientsThisWeek: 120,
    email: "jane.smith@example.com",
    password: "doctor123"
  },
  {
    name: "Dr. Rahul Verma",
    specialization: "Neurologist",
    reports: 25,
    patientsThisWeek: 95,
    email: "rahul.verma@example.com",
    password: "neuropass"
  },
  {
    name: "Dr. Aisha Khan",
    specialization: "Dermatologist",
    reports: 18,
    patientsThisWeek: 85,
    email: "aisha.khan@example.com",
    password: "derma456"
  },
  {
    name: "Dr. Michael Lee",
    specialization: "Orthopedic Surgeon",
    reports: 40,
    patientsThisWeek: 110,
    email: "michael.lee@example.com",
    password: "ortho789"
  },
  {
    name: "Dr. Sofia Garcia",
    specialization: "Pediatrician",
    reports: 20,
    patientsThisWeek: 98,
    email: "sofia.garcia@example.com",
    password: "kidsdoc321"
  },
  {
    name: "Dr. Ibrahim Al-Mansoori",
    specialization: "Oncologist",
    reports: 35,
    patientsThisWeek: 76,
    email: "ibrahim.mansoori@example.com",
    password: "onco321"
  },
  {
    name: "Dr. Emily Chen",
    specialization: "ENT Specialist",
    reports: 15,
    patientsThisWeek: 89,
    email: "emily.chen@example.com",
    password: "entpass999"
  },
  {
    name: "Dr. Rajesh Mehta",
    specialization: "General Physician",
    reports: 22,
    patientsThisWeek: 130,
    email: "rajesh.mehta@example.com",
    password: "genphys001"
  },
  {
    name: "Dr. Olivia Wilson",
    specialization: "Psychiatrist",
    reports: 12,
    patientsThisWeek: 60,
    email: "olivia.wilson@example.com",
    password: "mindcare456"
  },
  {
    name: "Dr. Daniel Brooks",
    specialization: "Endocrinologist",
    reports: 28,
    patientsThisWeek: 105,
    email: "daniel.brooks@example.com",
    password: "endopass777"
  }
];

export const SetLocalStorage = () => {
  const alreadySet = localStorage.getItem('doctors');
  if (!alreadySet) {
    localStorage.setItem('doctors', JSON.stringify(doctors));
  }
};

export const getLocalStorage = ()=>{
  const doctors =   JSON.parse(localStorage.getItem('doctors'))
  // const admin = JSON.parse(localStorage.getItem('admin'))

  return {doctors}
}
