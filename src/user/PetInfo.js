import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, CardTitle, Table } from 'reactstrap';
import PetFix from './PetFix';
import './PetInfo.css'; // CSS 파일을 import 합니다.
import PetNew from './PetNew';

const PetInfo = ({ petData, fetchPetData }) => {
  const [pets, setPets] = useState(petData || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPet, setCurrentPet] = useState(pets[0] || {});
  const [isPetNewOpen, setPetNewOpen] = useState(false);
  const [isPetFixOpen, setPetFixOpen] = useState(false);
  const navigate = useNavigate(); // 리다이렉트 훅

  useEffect(() => {
    setPets(petData || []);
  }, [petData]);

  useEffect(() => {
    setCurrentPet(pets[currentIndex] || {});
  }, [currentIndex, pets]);

  const handleNextPet = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % pets.length);
  };

  const handlePreviousPet = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + pets.length) % pets.length);
  };

  const isPetDataEmpty = pets.length === 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">
          Pet Info
          <Button
            onClick={() => setPetFixOpen(true)}
            color="primary"
            size="sm"
            className="ml-2"
          >
            수정하기
          </Button>
          <Button
            onClick={() => setPetNewOpen(true)}
            color="secondary"
            size="sm"
            className="ml-2"
          >
            새로 만들기
          </Button>
          {isPetNewOpen && (
            <PetNew
              isOpen={isPetNewOpen}
              toggle={() => setPetNewOpen(false)}
              onSave={fetchPetData}
            />
          )}
          {isPetFixOpen && (
            <PetFix
              isOpen={isPetFixOpen}
              toggle={() => setPetFixOpen(false)}
              pet={currentPet}
              onSave={fetchPetData}
              onDelete={fetchPetData}
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
          <Button onClick={handlePreviousPet} size="sm" disabled={pets.length <= 1}>
            ←
          </Button>
          {pets.length > 0 ? (
            <Table className="pet-info-table">
              <tbody>
                <tr>
                  <td><strong>Name:</strong></td>
                  <td>{currentPet.petName || ''}</td>
                </tr>
                <tr>
                  <td><strong>Species:</strong></td>
                  <td>{currentPet.petSpecies || ''}</td>
                </tr>
                <tr>
                  <td><strong>Birth:</strong></td>
                  <td>{currentPet.petBirth || ''}</td>
                </tr>
                <tr>
                  <td><strong>Gender:</strong></td>
                  <td>{currentPet.petGender || ''}</td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <p>펫이 없습니다. 등록하세요.</p>
          )}
          <Button onClick={handleNextPet} size="sm" disabled={pets.length <= 1}>
            →
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default PetInfo;
