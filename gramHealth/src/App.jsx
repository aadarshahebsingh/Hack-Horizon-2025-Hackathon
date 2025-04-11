import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Auth from "./components/Auth";
// import DoctorDashboard from "./Dashboards/DoctorDashboard";
// import PatientDashboard from "./Dashboards/PaitentDashboard";




// function App() {
//   return (
//     <Auth/>
//     // <Router>
//     //   <Routes>
//     //     <Route path="/" element={<Login />} />
//     //     <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
//     //     {/* <Route path="/patientdashboard" element={<PatientDashboard />} /> */}
//     //   </Routes>
//     // </Router>
//   );
// }

// export default App;

import React from 'react'
import Auth from './components/Auth'
import { useEffect } from "react";
import DoctorDashboard from './Dashboards/DoctorDashboard'
import PaitentDashboard from './Dashboards/PaitentDashboard'
import {SetLocalStorage} from './localStorage/localStorage'



const App = () => {
  useEffect(() => {
    SetLocalStorage(); // Set the data once on load
  }, []);
  return (
    <div> 
            <PaitentDashboard/>

      {/* <Router>
           <Routes> */}

               {/* <Route path="/" element={<Auth />} />
                <Route path="/DoctorDashboard" element={<DoctorDashboard />} /> */}
               {/* <Route path="/patientdashboard" element={<PatientDashboard />} /> */}

          {/* </Routes>
         </Router>  */}
       {/* <DoctorDashboard/> */}
    </div>
  )
};

export default App
