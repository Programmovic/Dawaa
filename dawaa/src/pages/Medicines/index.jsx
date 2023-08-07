import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import './medicines.css'

const MedicinesPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const pharmacyId = Cookies.get('pharmacyId');

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get('http://localhost:3001/medicines', {
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
        {pharmacyId &&
          <Link to="/medicines/add-new" className="btn btn-primary mb-3">
            إضافة دواء جديد
          </Link>}
        {errorMessage && (
          <p className="alert alert-danger">
            {medicines.length > 0 ? errorMessage : 'لا توجد أدوية لعرضها'}
          </p>
        )}
        <table className='medicines-table glass'>
          <thead>
            <tr>
              <th>اسم الدواء</th>
              <th>الوصف</th>
              <th>الشركة المصنعة</th>
              <th>الفئة</th>
              <th>السعر</th>
              <th>رقم الصيدلية</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map(medicine => (
              <tr key={medicine._id}>
                <td>{medicine.medicine_name || '-'}</td>
                <td>{medicine.medicine_description || '-'}</td>
                <td>{medicine.medicine_brand || '-'}</td>
                <td>{medicine.medicine_category || '-'}</td>
                <td>{medicine.medicine_price || '-'}</td>
                <td>{medicine.pharmacy_id || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MedicinesPage;