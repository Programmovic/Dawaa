import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import LogoutButton from '../../components/Logout/Logout';
import './LoginPharmacy.css'

export default function PharmacyLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const id = Cookies.get('id');
  const name = Cookies.get('name');

  useEffect(() => {
    const pharmacyData = localStorage.getItem('pharmacyData');
    if (pharmacyData) {
      const { pharmacy_username, token } = JSON.parse(pharmacyData);
      setUsername(pharmacy_username);
      Cookies.set('token', token);
      if (rememberMe) {
        Cookies.set('id', id, { expires: 365 });
        localStorage.setItem('pharmacyData', JSON.stringify({ pharmacy_username, token }));
      }
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', {
        pharmacy_username: username,
        pharmacy_password_hash: password
      });

      Cookies.set('token', response.data.token);
      if (rememberMe) {
        Cookies.set('id', response.data.pharmacyId, { expires: 365 });
        Cookies.set('name', response.data.pharmacyName, { expires: 365 });
        localStorage.setItem('pharmacyData', JSON.stringify(response.data));
      } else {
        Cookies.set('id', response.data.pharmacyId);
        Cookies.set('name', response.data.pharmacyName);
      }
      // You can redirect to a success page here
      window.location.reload();
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessage('اسم المستخدم أو كلمة المرور غير صحيحة');
      } else {
        setErrorMessage('فشل تسجيل الدخول');
      }
    }
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  return (
    <section className='login-registration-section pt-0'>
      <div className="glass login-registration">
        {!id ? <h1>تسجيل دخول الصيدلية</h1> : <h1>مرحبا {name}!</h1>}
        {errorMessage && <p className='p-3 bg-danger rounded-3'>{errorMessage}</p>}
        {!id ? (
          <form onSubmit={handleSubmit} >
            <label>
              اسم المستخدم:
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
            <br />
            <label>
              كلمة المرور:
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <br />
            <label className='d-flex flex-row'>
              <input
                className='w-25'
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <span>تذكرني</span>
            </label>
            <br />
            <button type="submit">تسجيل الدخول</button>
          </form>
        ) : (
            <div className="actions d-flex justify-content-between">
              <button className='ms-2 '><Link to={`/${id}/medicines`} className='mt-0 text-light'>الذهاب إلى الأدوية</Link></button>

              <LogoutButton />
            </div>
        )}
      </div>

    </section>
  );
}