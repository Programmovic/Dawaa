import Cookies from 'js-cookie';

export default function LogoutButton(props) {
  
  const handleLogout = () => {
    // Clear cookies and local storage
    Cookies.remove('id');
    Cookies.remove('token');
    localStorage.removeItem('id');
    localStorage.removeItem('token');

    // Reload the page to force a new login
    window.location.reload();
  };

  return (
    <button onClick={handleLogout}>{props.children} تسجيل خروج</button>
  );
}