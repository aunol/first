import { useState } from 'react';
import Slider from 'react-slick'; // Import react-slick
import { Button, Card, CardBody, CardHeader, CardTitle, Modal, ModalBody, ModalHeader } from 'reactstrap';
import PetFix from './PetFix';
import './PetInfo.css';
import PetNew from './PetNew';

const PetInfo = ({ petData }) => {
  console.log("펫인포", petData);

  const [isFixModalOpen, setIsFixModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const toggleFixModal = () => setIsFixModalOpen(!isFixModalOpen);
  const toggleNewModal = () => setIsNewModalOpen(!isNewModalOpen);

  const handleEditPet = (pet) => {
    setSelectedPet(pet);
    toggleFixModal();
  };

  const handleDelete = (petId) => {
    alert(`Delete Pet Info with ID: ${petId}`);
    // Add delete logic here
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Enable arrows for navigation
  };

  if (!petData || petData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="card-title-container">
            <h4>Pet Info</h4>
            <Button color="primary" onClick={toggleNewModal}>New</Button>
          </div>
        </CardHeader>
        <CardBody>
          <div>No Pet Data Available</div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="card-title-container">
          <h4>Pet Info</h4>
          <Button color="primary" onClick={toggleNewModal}>New</Button>
        </div>
      </CardHeader>
      <CardBody>
        <Slider {...sliderSettings}>
          {petData.map(pet => (
            <Card key={pet.petId} className="mb-3">
              <CardHeader>
                <div className="card-header-container">
                  <CardTitle tag="h5">{pet.petName}</CardTitle>
                  <div className="card-header-actions">
                    <Button color="secondary" onClick={() => handleEditPet(pet)}>Fix</Button>
                    <Button color="danger" onClick={() => handleDelete(pet.petId)}>Del</Button>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div><strong>Species:</strong> {pet.petSpecies}</div>
                <div><strong>Birth:</strong> {pet.petBirth}</div>
                <div><strong>Gender:</strong> {pet.petGender}</div>
              </CardBody>
            </Card>
          ))}
        </Slider>

        {/* Fix Modal */}
        {selectedPet && (
          <Modal isOpen={isFixModalOpen} toggle={toggleFixModal}>
            <ModalHeader toggle={toggleFixModal}>Edit Pet Info</ModalHeader>
            <ModalBody>
              <PetFix petData={selectedPet} toggleModal={toggleFixModal} />
            </ModalBody>
          </Modal>
        )}

        {/* New Modal */}
        <Modal isOpen={isNewModalOpen} toggle={toggleNewModal}>
          <ModalHeader toggle={toggleNewModal}>New Pet Info</ModalHeader>
          <ModalBody>
            <PetNew toggleModal={toggleNewModal} />
          </ModalBody>
        </Modal>
      </CardBody>
    </Card>
  );
};

export default PetInfo;
