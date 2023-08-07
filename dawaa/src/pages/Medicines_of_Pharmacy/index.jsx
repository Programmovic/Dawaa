import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

export default function PharmacyMedicinesPage() {
  const [medicines, setMedicines] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const pharmacyId = Cookies.get('id');
  const pharmacyName = Cookies.get('name');
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const token = Cookies.get('token');
        // Assuming you have a cookie that stores the pharmacy's ID

        const response = await axios.get(`http://localhost:3001/pharmacies/${pharmacyId}/medicines`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMedicines(response.data);
        console.log(medicines);
      } catch (error) {
        if (error.response.status === 401) {
          setErrorMessage('غير مصرح به');
        } else {
          setErrorMessage('فشل جلب الأدوية');
        }
      }
    };

    fetchMedicines();
  }, []);

  return (
    <section>
      <div className="container mt-4">
      <h1 className='text-capitalize'>قائمة الأدوية لصيدلية {pharmacyName}</h1>
      <button><Link to={`/${pharmacyId}/medicines/add-new`} className='text-light'>إضافة دواء جديد</Link></button>
      {errorMessage && (
        <p>{medicines.length > 0 ? errorMessage : 'لا يوجد أدوية للعرض'}</p>
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
              <td title={medicine.pharmacy_id}>...{medicine.pharmacy_id.slice(0, 3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </section>
  );
}