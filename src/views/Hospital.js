import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Card, CardBody, CardHeader, Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import CheckBoxList from 'variables/checkBoxList';
import Hour24 from 'variables/hour24';
import Kakao from 'variables/kakao'; // 올바른 경로 확인

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

const Hospital = ({ hospitals }) => {
  const [dropdownOpen, setDropdownOpen] = useState({
    hospitalList: false,
    checkBoxList: false,
    hour24: false
  });
  const [selectedHours, setSelectedHours] = useState(new Set());
  const [selectedSpecies, setSelectedSpecies] = useState(new Set());
  const [selectedHospital, setSelectedHospital] = useState(null);

  const toggleDropdown = (dropdown) => {
    setDropdownOpen({
      ...dropdownOpen,
      [dropdown]: !dropdownOpen[dropdown]
    });
  };

  const handleHourChange = (selectedNames) => {
    setSelectedHours(new Set(selectedNames));
  };

  const handleSpeciesChange = (selectedNames) => {
    setSelectedSpecies(new Set(selectedNames));
  };

  const handleHospitalSelect = (hospital) => {
    setSelectedHospital(hospital);
  };

  const filterHospitals = () => {
    return hospitals.filter(hospital => {
      const isHourMatch = selectedHours.size === 0 || 
        Array.from(selectedHours).some(hour => hospital.hospitalType.includes(hour));
        
      const isSpeciesMatch = selectedSpecies.size === 0 || 
        Array.from(selectedSpecies).some(species => hospital.hospitalSpecies.includes(species));
      
      return isHourMatch && isSpeciesMatch;
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ flex: '1', margin: '0 5px' }}>
          {/* Empty span */}
        </span>
        <span style={{ flex: '1', margin: '0 5px' }}>
          {/* <Dropdown isOpen={dropdownOpen.hospitalList} toggle={() => toggleDropdown('hospitalList')}>
            <DropdownToggle color="link" style={{ display: 'inline-block', textAlign: 'center', backgroundColor: '#343a40', color: 'white', width: '100%' }}>
              Hospital List
            </DropdownToggle>
            <DropdownMenu right style={{ minWidth: '300px', marginTop: '5px' }}>
              <Card>
                <CardHeader style={{ paddingTop: '5px', paddingBottom: '2px' }} />
                <CardBody style={{ paddingTop: '2px', paddingBottom: '2px', height: '13cm' }}>
                  <HospitalList
                    hospitals={filterHospitals()}
                    onHospitalClick={handleHospitalSelect}
                    selectedHospital={selectedHospital}
                  />
                </CardBody>
              </Card>
            </DropdownMenu>
          </Dropdown> */}
        </span>
        <span style={{ flex: '1', margin: '0 5px' }}>
          <Dropdown isOpen={dropdownOpen.checkBoxList} toggle={() => toggleDropdown('checkBoxList')}>
            <DropdownToggle color="link" style={{ display: 'inline-block', textAlign: 'center', backgroundColor: '#343a40', color: 'white', width: '100%' }}>
              CheckBox List
            </DropdownToggle>
            <DropdownMenu right style={{ minWidth: '300px', marginTop: '5px' }}>
              <Card>
                <CardHeader style={{ paddingTop: '5px', paddingBottom: '2px' }} />
                <CardBody style={{ paddingTop: '2px', paddingBottom: '2px' }}>
                  <CheckBoxList 
                    options={speciesRows}
                    onChange={handleSpeciesChange}
                  />
                </CardBody>
              </Card>
            </DropdownMenu>
          </Dropdown>
        </span>
        <span style={{ flex: '1', margin: '0 5px' }}>
          <Dropdown isOpen={dropdownOpen.hour24} toggle={() => toggleDropdown('hour24')}>
            <DropdownToggle color="link" style={{ display: 'inline-block', textAlign: 'center', backgroundColor: '#343a40', color: 'white', width: '100%' }}>
              Hour24
            </DropdownToggle>
            <DropdownMenu right style={{ minWidth: '300px', marginTop: '5px' }}>
              <Card>
                <CardHeader style={{ paddingTop: '5px', paddingBottom: '2px' }} />
                <CardBody style={{ paddingTop: '2px', paddingBottom: '2px' }}>
                  <Hour24
                    options={hour24Rows}
                    onChange={handleHourChange}
                  />
                </CardBody>
              </Card>
            </DropdownMenu>
          </Dropdown>
        </span>
      </div>
      <div style={{ position: 'relative', overflow: 'hidden', height: '600px', flexGrow: 1 }}>
        <Kakao hospitals={filterHospitals()} selectedHospital={selectedHospital} onHospitalSelect={handleHospitalSelect} />
      </div>
    </div>
  );
};

export default Hospital;
