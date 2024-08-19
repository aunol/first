import { useState } from 'react';
import { Button, DropdownItem, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import KakaoMap from "variables/KakaoMap"; // 경로를 실제 위치로 수정";

export const hour24Rows = [
  { id: 0, name: '24시간' },
  { id: 1, name: '응급진료' }
];

export const speciesRows = [
  { id: 0, name: '강아지' },
  { id: 1, name: '고양이' },
  { id: 2, name: '특수포유류' },
  { id: 3, name: '파충류' },
  { id: 4, name: '조류' },
  { id: 5, name: '어류' }
];

export const locationRows = [
  '서울', '부산', '인천', '광주', '대구', '대전',
  '경기도', '강원도', '충청북도', '충청남도', '전라북도',
  '전라남도', '경상북도', '경상남도', '제주도'
];

const Hospital = ({ hospitals }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHours, setSelectedHours] = useState(new Set());
  const [selectedSpecies, setSelectedSpecies] = useState(new Set());
  const [selectedRegions, setSelectedRegions] = useState(new Set());
  const [selectedHospital, setSelectedHospital] = useState(null);

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleHourChange = (selectedHours) => setSelectedHours(selectedHours);
  const handleSpeciesChange = (selectedSpecies) => setSelectedSpecies(selectedSpecies);
  const handleRegionChange = (selectedRegions) => setSelectedRegions(selectedRegions);

  const handleHospitalSelect = (hospital) => {
    if (selectedHospital && selectedHospital.hospitalNo === hospital.hospitalNo) {
      // 이미 선택된 병원을 클릭하면 선택 해제
      setSelectedHospital(null);
    } else {
      // 새 병원을 선택
      setSelectedHospital(hospital);
    }
  };

  const filterHospitals = () => {
    return hospitals.filter(hospital => {
      const isHourMatch = selectedHours.size === 0 || Array.from(selectedHours).some(hour => hospital.hospitalType.includes(hour));
      const isSpeciesMatch = selectedSpecies.size === 0 || Array.from(selectedSpecies).some(species => hospital.hospitalSpecies.includes(species));
      const isRegionMatch = selectedRegions.size === 0 || Array.from(selectedRegions).some(region => hospital.hospitalAddr.includes(region));
      return isHourMatch && isSpeciesMatch && isRegionMatch;
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ flex: '1', margin: '0 5px' }}>
          <Button color="primary" onClick={toggleModal}>필터 및 병원 리스트</Button>
        </span>
      </div>

      <div style={{ position: 'relative', overflow: 'hidden', width: 'calc(100% - 4px)', height: '800px', flexGrow: 1, marginRight: '4px' }}>
        <KakaoMap hospitals={filterHospitals()} selectedHospital={selectedHospital} onHospitalSelect={handleHospitalSelect} />
      </div>

      <Modal isOpen={modalOpen} toggle={toggleModal} size="lg" style={{ width: '100%', height: '100%' }}>
        <ModalHeader toggle={toggleModal}>필터 및 병원 리스트</ModalHeader>
        <ModalBody>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, paddingRight: '10px' }}>
              <FormGroup>
                <Label>진료시간</Label>
                {hour24Rows.map(hour => (
                  <div key={hour.id}>
                    <Input
                      type="checkbox"
                      value={hour.name}
                      checked={selectedHours.has(hour.name)}
                      onChange={e => {
                        const { value, checked } = e.target;
                        const updatedSet = new Set(selectedHours);
                        if (checked) {
                          updatedSet.add(value);
                        } else {
                          updatedSet.delete(value);
                        }
                        handleHourChange(updatedSet);
                      }}
                    />{' '}
                    {hour.name}
                  </div>
                ))}
              </FormGroup>

              <FormGroup>
                <Label>진료동물</Label>
                {speciesRows.map(species => (
                  <div key={species.id}>
                    <Input
                      type="checkbox"
                      value={species.name}
                      checked={selectedSpecies.has(species.name)}
                      onChange={e => {
                        const { value, checked } = e.target;
                        const updatedSet = new Set(selectedSpecies);
                        if (checked) {
                          updatedSet.add(value);
                        } else {
                          updatedSet.delete(value);
                        }
                        handleSpeciesChange(updatedSet);
                      }}
                    />{' '}
                    {species.name}
                  </div>
                ))}
              </FormGroup>
            </div>
            <div style={{ flex: 1, paddingRight: '10px' }}>
              <FormGroup>
                <Label>지역</Label>
                {locationRows.map(location => (
                  <div key={location}>
                    <Input
                      type="checkbox"
                      value={location}
                      checked={selectedRegions.has(location)}
                      onChange={e => {
                        const { value, checked } = e.target;
                        const updatedSet = new Set(selectedRegions);
                        if (checked) {
                          updatedSet.add(value);
                        } else {
                          updatedSet.delete(value);
                        }
                        handleRegionChange(updatedSet);
                      }}
                    />{' '}
                    {location}
                  </div>
                ))}
              </FormGroup>
            </div>
            <div style={{ flex: 2, paddingLeft: '10px', maxHeight: '400px', overflowY: 'auto' }}>
              <h5>병원 리스트</h5>
              {filterHospitals().length > 0 ? (
                filterHospitals().map(hospital => (
                  <DropdownItem
                    key={hospital.hospitalNo}
                    onClick={() => handleHospitalSelect(hospital)}
                    active={selectedHospital && selectedHospital.hospitalNo === hospital.hospitalNo}
                  >
                    {hospital.hospitalName}
                  </DropdownItem>
                ))
              ) : (
                <DropdownItem disabled>리스트에 병원이 없습니다.</DropdownItem>
              )}
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Hospital;
