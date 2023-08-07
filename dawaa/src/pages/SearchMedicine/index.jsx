import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MedicineSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/medicines?search=${searchTerm}&priority=name,others`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('An error occurred while fetching medicines:', error);
      }
    };

    // Fetch medicines only if the search term is not empty
    if (searchTerm.trim() !== '') {
      fetchMedicines();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <section className='search_for_medicine'>
      <div className="container">
        <h2 className="text-center mb-4">بحث عن الأدوية</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control glass border-0 text-light"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="ابحث عن دواء"
          />
        </div>
        <ul className="list-group glass">
          {searchResults.map((medicine) => (
            <li key={medicine._id} className="w-100 list-group-item bg-transparent border-0 text-light">
              {medicine.medicine_name || 'بدون اسم'}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default MedicineSearch;