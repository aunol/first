import axios from 'axios';
import { useState } from 'react';
import { Button } from 'reactstrap';

const PetNew = ({ toggleModal }) => {
  const [pet, setPet] = useState({
    petName: '',
    petSpecies: '',
    petBirth: '',
    petGender: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet((prevPet) => ({
      ...prevPet,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const userNo = sessionStorage.getItem('UserNo');
      const petData = { ...pet, userNo: parseInt(userNo, 10) };
      console.log('Pet data:', petData);
      const response = await axios.post('http://localhost:8080/createPet', petData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Pet created:', response.data);
      toggleModal(); // Close the modal
    } catch (error) {
      console.error('Error creating pet:', error);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <div>
        <label>Name:</label>
        <input type="text" name="petName" value={pet.petName} onChange={handleChange} />
      </div>
      <div>
        <label>Species:</label>
        <input type="text" name="petSpecies" value={pet.petSpecies} onChange={handleChange} />
      </div>
      <div>
        <label>Birth:</label>
        <input type="date" name="petBirth" value={pet.petBirth} onChange={handleChange} />
      </div>
      <div>
        <label>Gender:</label>
        <input type="text" name="petGender" value={pet.petGender} onChange={handleChange} />
      </div>
      <Button type="submit" color="primary">Save</Button>
      <Button type="button" color="secondary" onClick={toggleModal}>Cancel</Button>
    </form>
  );
};

export default PetNew;
