import axios from 'axios';
import { useState } from 'react';
import { Button } from 'reactstrap';

const PetFix = ({ petData, toggleModal }) => {
  const [pet, setPet] = useState({ ...petData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet((prevPet) => ({ ...prevPet, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:8080/update-pet', pet);
      console.log('Pet updated:', response.data);
      toggleModal(); // Close the modal
    } catch (error) {
      console.error('Error updating pet:', error);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <div>
        <label>Name:</label>
        <input type="text" name="PetName" value={pet.PetName} onChange={handleChange} />
      </div>
      <div>
        <label>Species:</label>
        <input type="text" name="PetSpecies" value={pet.PetSpecies} onChange={handleChange} />
      </div>
      <div>
        <label>Birth:</label>
        <input type="text" name="PetBirth" value={pet.PetBirth} onChange={handleChange} />
      </div>
      <div>
        <label>Gender:</label>
        <input type="text" name="PetGender" value={pet.PetGender} onChange={handleChange} />
      </div>
      <Button type="submit" color="primary">Save</Button>
      <Button type="button" color="secondary" onClick={toggleModal}>Cancel</Button>
    </form>
  );
};

export default PetFix;
