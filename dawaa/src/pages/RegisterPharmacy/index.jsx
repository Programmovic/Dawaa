import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-control-geocoder';
import Cookies from 'js-cookie';


export default function PharmacyRegistrationPage() {
  const [pharmacyName, setPharmacyName] = useState('');
  const [username, setUsername] = useState('');
  const [pharmacyPassword, setPharmacyPassword] = useState('');
  const [pharmacyAddress, setPharmacyAddress] = useState('');
  const [pharmacyCity, setPharmacyCity] = useState('');
  const [pharmacyState, setPharmacyState] = useState('');
  const [pharmacyZipCode, setPharmacyZipCode] = useState('');
  const [pharmacyCountry, setPharmacyCountry] = useState('');
  const [pharmacyPhoneNumber, setPharmacyPhoneNumber] = useState('');
  const [pharmacyLatitude, setPharmacyLatitude] = useState('');
  const [pharmacyLongitude, setPharmacyLongitude] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageClassName, setErrorMessageClassName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/pharmacies', {
        pharmacy_name: pharmacyName,
        pharmacy_username: username,
        pharmacy_password_hash: pharmacyPassword,
        pharmacy_address: pharmacyAddress,
        pharmacy_city: pharmacyCity,
        pharmacy_state: pharmacyState,
        pharmacy_zip_code: pharmacyZipCode,
        pharmacy_country: pharmacyCountry,
        pharmacy_phone_number: pharmacyPhoneNumber,
        pharmacy_latitude: pharmacyLatitude,
        pharmacy_longitude: pharmacyLongitude
      });

      setErrorMessage('تم تسجيل الصيدلية بنجاح.');
      setErrorMessageClassName('bg-success');

      // You can redirect to a success page here
    } catch (error) {
      if (error.response.status === 400 && error.response.data.message === 'Username already exists') {
        setErrorMessage('اسم المستخدم موجود بالفعل.');
        setErrorMessageClassName('bg-danger');
      } else {
        setErrorMessage('فشل تسجيل الصيدلية.');
        setErrorMessageClassName('bg-danger');
      }
    }
  };

  return (
    <section className='registration'>
      <div className="container p-5 glass rounded-3 login-registration">
        <h1 className='mb-5'>تسجيل صيدلية جديدة</h1>
        {errorMessage && <p className={`text-light text-center p-2 rounded-3 ${errorMessageClassName}`}>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="row w-100">
            <div className="col mb-3">
              <label htmlFor="pharmacyName" className="form-label">
                اسم الصيدلية:
              </label>
              <input
                type="text"
                className="form-control"
                id="pharmacyName"
                value={pharmacyName}
                onChange={(event) => setPharmacyName(event.target.value)}
              />
            </div>
            <div className="col mb-3">
              <label htmlFor="username" className="form-label">
                اسم المستخدم:
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="col mb-3">
              <label htmlFor="pharmacyPassword" className="form-label">
                كلمة المرور:
              </label>
              <input
                type="password"
                className="form-control"
                id="pharmacyPassword"
                value={pharmacyPassword}
                onChange={(event) => setPharmacyPassword(event.target.value)}
              />
            </div>
          </div>
          <div className="row w-100">
            <div className="col mb-3">
              <label htmlFor="pharmacyAddress" className="form-label">
                عنوان الصيدلية:
              </label>
              <input
                type="text"
                className="form-control"
                id="pharmacyAddress"
                value={pharmacyAddress}
                onChange={(event) => setPharmacyAddress(event.target.value)}
              />
            </div>
            <div className="col mb-3">
              <label htmlFor="pharmacyCity" className="form-label">
                المدينة:
              </label>
              <input
                type="text"
                className="form-control"
                id="pharmacyCity"
                value={pharmacyCity}
                onChange={(event) => setPharmacyCity(event.target.value)}
              />
            </div>
            <div className="col mb-3">
              <label htmlFor="pharmacyState" className="form-label">
                الولاية:
              </label>
              <input
                type="text"
                className="form-control"
                id="pharmacyState"
                value={pharmacyState}
                onChange={(event) => setPharmacyState(event.target.value)}
              />
            </div>
          </div>
          <div className="row w-100">
            <div className="col mb-3">
              <label htmlFor="pharmacyZipCode" className="form-label">
                الرمز البريدي:
              </label>
              <input
                type="text"
                className="form-control"
                id="pharmacyZipCode"
                value={pharmacyZipCode}
                onChange={(event) => setPharmacyZipCode(event.target.value)}
              />
            </div>
            <div className="col mb-3">
              <label htmlFor="pharmacyCountry" className="form-label">
                الدولة:
              </label>
              <input
                type="text"
                className="form-control"
                id="pharmacyCountry"
                value={pharmacyCountry}
                onChange={(event) => setPharmacyCountry(event.target.value)}
              />
            </div>
            <div className="col mb-3">
              <label htmlFor="pharmacyPhoneNumber" className="form-label">
                رقم الهاتف:
              </label>
              <input
                type="text"
                className="form-control"
                id="pharmacyPhoneNumber"
                value={pharmacyPhoneNumber}
                onChange={(event) => setPharmacyPhoneNumber(event.target.value)}
              />
            </div>
          </div>
          <div className="row w-100">
            <div className="col mb-3">
              <label htmlFor="pharmacyLatitude" className="form-label">
                خط العرض:
              </label>
              <input
                type="text"
                className="form-control"
                id="pharmacyLatitude"
                value={pharmacyLatitude}
                onChange={(event) => setPharmacyLatitude(event.target.value)}
              />
            </div>
            <div className="col mb-3">
              <label htmlFor="pharmacyLongitude" className="form-label">
                خط الطول:
              </label>
              <input
                type="text"
                className="form-control"
                id="pharmacyLongitude"
                value={pharmacyLongitude}
                onChange={(event) => setPharmacyLongitude(event.target.value)}
              />
            </div>{/* Add an empty column to align the button to the right */}
          </div>
          <div className="row">
            <div className="col"></div> {/* Add an empty column to align the button to the right */}
            <div className="col mb-3">
              <button className="btn btn-primary float-end" type="submit">تسجيل</button>
            </div>
            <div className="col"></div> {/* Add an empty column to align the button to the right */}
          </div>
        </form>
      </div>
    </section>
  );
}