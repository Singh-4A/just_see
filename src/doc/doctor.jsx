// src/.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// MUI imports
import Button from '@mui/material/Button';

// Icons



import DoctorsList from './DoctorsList';
import AppointmentForm from './Appointment';
import WhatsAppContact from './WhatsAppContact';
import Dashboard from './Dashboard';
import { BriefcaseMedical, Calendar, Home } from 'lucide-react';
import AddDoctorForm from './AddDoctorForm';
import DoctorProfile from './DoctorProfile';



const DoctorApp = () => (
  <Router>
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <BriefcaseMedical size={32} className="text-blue-600" />
            <span className="text-xl font-semibold">MediCare</span>
          </div>
          <div className="flex space-x-4">
            {[
              { to: '/', icon: <Home size={16} />, label: 'Dashboard' },
              { to: '/doctors', icon: <BriefcaseMedical size={16} />, label: 'Doctors' },
              { to: '/appointments', icon: <Calendar size={16} />, label: 'Appointments' },
              // { to: '/whatsapp', icon: <Message size={16} />, label: 'WhatsApp' },
            ].map(link => (
              <Button
                key={link.to}
                component={Link}
                to={link.to}
                startIcon={link.icon}
                size="small"
                variant="text"
              >
                {link.label}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/doctors" element={<DoctorsList />} />
          <Route path="/appointments" element={<AppointmentForm />} />
          <Route path="/appointments/new" element={<AppointmentForm />} />
          <Route path="/whatsapp" element={<WhatsAppContact />} />
          <Route path="/doctors/add" element={<AddDoctorForm />} />
          <Route path="/doctors/:id" element={<DoctorProfile />} />

        </Routes>
      </main>
    </div>
  </Router>
);

export default DoctorApp;
