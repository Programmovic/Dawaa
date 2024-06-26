import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Header.css';
import LogoutButton from '../Logout/Logout';

export default function Header() {
  const pharmacyId = Cookies.get('id');
  return (
    <header className="header-container py-2">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-auto">
            <Link to="/">
              <h1>فارماكو</h1>
            </Link>
          </div>
          <nav className="col-auto">
            <ul className="list-unstyled d-flex mb-0">
              {pharmacyId ?
                <li className="nav-item">
                  <Link to={`/${pharmacyId}/medicines/add-new`} className="nav-link">
                    تسجيل دواء
                  </Link>
                </li>
                :
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    تسجيل
                  </Link>
                </li>
                }


              <li className="nav-item">
                <Link to="/medicines" className="nav-link">
                  الأدوية
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/search" className="nav-link">
                  البحث عن دواء
                </Link>
              </li>
              <li className="nav-item">
                {pharmacyId ? <LogoutButton></LogoutButton> :
                  <Link to="/Login" className="nav-link">
                    تسجيل الدخول
                  </Link>
                }

              </li>

            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}