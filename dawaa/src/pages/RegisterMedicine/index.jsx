import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function MedicineRegistrationPage() {
  const [medicineName, setMedicineName] = useState('');
  const [medicineDescription, setMedicineDescription] = useState('');
  const [medicineBrand, setMedicineBrand] = useState('');
  const [medicineCategory, setMedicineCategory] = useState('');
  const [medicinePrice, setMedicinePrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageClassName, setErrorMessageClassName] = useState('');


  const pharmacyId = Cookies.get('id');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3001/pharmacies/${pharmacyId}/medicines`, {
        medicine_name: medicineName,
        medicine_description: medicineDescription,
        medicine_brand: medicineBrand,
        medicine_category: medicineCategory,
        medicine_price: medicinePrice,
        pharmacy_id: pharmacyId
      });

      setErrorMessage('تم تسجيل الدواء بنجاح.');
      setErrorMessageClassName('bg-success');

      // You can redirect to a success page here
    } catch (error) {
      setErrorMessage('فشل تسجيل الدواء.');
      setErrorMessageClassName('bg-danger');
    }
  };

  return (
    <section className='registration'>
      <div className="container p-5 glass rounded-3 login-registration" dir="rtl">
        <h1 className="mb-5">تسجيل الدواء</h1>
        {errorMessage && <p className={`text-light text-center p-2 rounded-3 ${errorMessageClassName}`}>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col mb-3">
              <label htmlFor="medicineName" className="form-label">
                اسم الدواء:
              </label>
              <input
                type="text"
                className="form-control"
                id="medicineName"
                value={medicineName}
                onChange={(event) => setMedicineName(event.target.value)}
                required
              />
            </div>

            <div className="col mb-3">
              <label htmlFor="medicineBrand" className="form-label">
                ماركة الدواء:
              </label>
              <input
                type="text"
                className="form-control"
                id="medicineBrand"
                value={medicineBrand}
                onChange={(event) => setMedicineBrand(event.target.value)}
                required
              />
            </div>
            <div className="col mb-3">
              <label htmlFor="medicineCategory" className="form-label">
                فئة الدواء:
              </label>
              <input
                type="text"
                className="form-control"
                id="medicineCategory"
                value={medicineCategory}
                onChange={(event) => setMedicineCategory(event.target.value)}
                required
              />
            </div>
            <div className="col mb-3">
              <label htmlFor="medicinePrice" className="form-label">
                سعر الدواء:
              </label>
              <input
                type="number"
                className="form-control"
                id="medicinePrice"
                value={medicinePrice}
                onChange={(event) => setMedicinePrice(event.target.value)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col mb-3">
              <label htmlFor="medicineDescription" className="form-label">
                وصف الدواء:
              </label>
              <textarea
                className="form-control"
                id="medicineDescription"
                value={medicineDescription}
                onChange={(event) => setMedicineDescription(event.target.value)}
              ></textarea>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">تسجيل</button>
        </form>
      </div>
    </section>
  );
}