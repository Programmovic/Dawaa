import './Home.css'
import { Link } from 'react-router-dom';

const HomePage = () => {

  return (
    <section className='hero h-100 d-flex p-0'>
      <div className="container-fluid d-flex align-items-center justify-content-center p-0">
      <div className="text col-lg-6 col-md-6 col-sm-12 bg-gradient-secondary text-white p-5 d-flex flex-column align-items-start justify-content-center">
        <h1 className="mb-4 hero-title">محتاج دواء بسرعة ومش عارف فين اقرب مكان تجيبه منه؟</h1>
        <Link to="/medicines" className="btn btn-primary mb-3">
          تصفح الأدوية
        </Link>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12 bg-transparent p-5">
        
        
      </div>
    </div>
    </section>
  );
};

export default HomePage;