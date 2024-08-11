import axios from 'axios';
import { useEffect, useState } from 'react';
import Hospital from './Hospital';
import { createUrl } from 'layouts/createUrl';

const HospitalContainer = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fullUrl = createUrl('hospitals');
    axios.get(fullUrl)
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
