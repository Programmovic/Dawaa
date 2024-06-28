import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import './medicines.css';

const MedicinesPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const pharmacyId = Cookies.get('pharmacyId');

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get('https://dawaa-bcwc.onrender.com/medicines', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMedicines(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setErrorMessage('غير مصرح بالدخول');
        } else {
          setErrorMessage('فشل في جلب الأدوية');
        }
      }
    };

    fetchMedicines();
  }, []);

  return (
    <section>
      <div className="container mt-4">
        <h1 className="text-center mb-4">قائمة الأدوية</h1>
        {pharmacyId && (
          <Link to="/medicines/add-new" className="btn btn-primary mb-3">
            إضافة دواء جديد
          </Link>
        )}
        {errorMessage && (
          <p className="alert alert-danger">
            {medicines.length > 0 ? errorMessage : 'لا توجد أدوية لعرضها'}
          </p>
        )}
        <div className="medicines-container">
          {medicines.map(medicine => (
            <div key={medicine._id} className="medicine-box">
              <h3>{medicine.name || '-'}</h3>
              <p><strong>الوصف:</strong> {medicine.description || '-'}</p>
              <p><strong>الشركة المصنعة:</strong> {medicine.medicine_brand || '-'}</p>
              <p><strong>الفئة:</strong> {medicine.medicine_category || '-'}</p>
              <p><strong>السعر:</strong> {medicine.medicine_price || '-'}</p>
              <p><strong>رقم الصيدلية:</strong> {medicine.pharmacy_id || '-'}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MedicinesPage;
