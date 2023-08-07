import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PharmacyLoginPage from './pages/LoginPharmacy/index.jsx';
import PharmacyRegistrationPage from './pages/RegisterPharmacy';
import MedicineRegistrationPage from './pages/RegisterMedicine';
import MedicineSearch from './pages/SearchMedicine';
import MedicinesPage from './pages/Medicines';
import ReactDOM from 'react-dom/client';
import HomePage from './pages/Home';
import PharmacyMedicinesPage from './pages/Medicines_of_Pharmacy';

export default function App() {
  return (
    <>

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<PharmacyLoginPage />} />
          <Route path="/register" element={<PharmacyRegistrationPage />} />
          <Route path="/:id/medicines" element={<PharmacyMedicinesPage />} />
          <Route path="/medicines" element={<MedicinesPage />} />
          <Route path="/search" element={<MedicineSearch />} />
          <Route path="/:id/medicines/add-new" element={<MedicineRegistrationPage />} />
        </Routes>
      </Router>
    </>
  );
}

const rootElement = document.getElementById('app');
ReactDOM.createRoot(rootElement).render(<App />);