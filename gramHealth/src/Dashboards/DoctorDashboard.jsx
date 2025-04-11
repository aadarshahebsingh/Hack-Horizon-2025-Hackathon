import React from "react";
import { Button } from "../components/Button";
import {
  CalendarDays,
  Stethoscope,
  Users,
  FileText,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "../components/Card";

const DoctorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Doctor Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, Dr. Jane Smith!</p>
      </header>

      {/* Top Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <Card className="flex items-center gap-4 p-4">
          <Stethoscope size={32} className="text-blue-600" />
          <div>
            <h2 className="text-xl font-semibold">Dr. Jane Smith</h2>
            <p className="text-sm text-gray-500">Cardiologist</p>
          </div>
        </Card>
        
        <Card className="flex items-center gap-4 p-4">
          <Users size={32} className="text-green-600" />
          <div>
            <h2 className="text-xl font-semibold">120</h2>
            <p className="text-sm text-gray-500">Patients This Week</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4 p-4">
          <FileText size={32} className="text-purple-600" />
          <div>
            <h2 className="text-xl font-semibold">32</h2>
            <p className="text-sm text-gray-500">New Reports</p>
          </div>
        </Card>
      </section>

      {/* Appointments & Available Slots */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appointments */}
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Upcoming Appointments</h3>
              <CalendarDays className="text-gray-400" size={20} />
            </div>
            <ul className="space-y-2 text-gray-600">
              <li className="border-b pb-2">10:00 AM – John Doe</li>
              <li className="border-b pb-2">11:30 AM – Alice Johnson</li>
              <li className="border-b pb-2">02:00 PM – Michael Brown</li>
            </ul>
          </CardContent>
        </Card>

        {/* Available Slots */}
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Available Slots</h3>
              <Clock className="text-gray-400" size={20} />
            </div>
            <ul className="space-y-2 text-gray-600">
              <li className="border-b pb-2">4:00 PM</li>
              <li className="border-b pb-2">5:30 PM</li>
              <li className="border-b pb-2">6:00 PM</li>
            </ul>
            <Button className="mt-4">View Full Schedule</Button>
          </CardContent>
          
        </Card>
      </section>
    </div>
  );
};

export default DoctorDashboard;
