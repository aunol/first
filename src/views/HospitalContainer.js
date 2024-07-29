import axios from 'axios';
import { useEffect, useState } from 'react';
import Hospital from './Hospital';

const HospitalContainer = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/hospitals')
      .then(response => {
        console.log(response.data);
        setHospitals(response.data);
      })
      .catch(error => {
        console.error('Error fetching hospitals:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Hospital hospitals={hospitals} />;
};

export default HospitalContainer;
