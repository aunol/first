import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Collapse, ListGroup, ListGroupItem } from 'reactstrap';
import './HospitalList.css'; // CSS 파일을 import 합니다.

const HospitalList = ({ hospitals = [], onHospitalClick, selectedHospital }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = (hospital) => {
    onHospitalClick(hospital);
  };

  // Helper function to provide default values
  const getDefaultValue = (value) => value || "";

  return (
    <>
      <Button color="link" onClick={() => setIsOpen(!isOpen)}>        
      </Button>
      <Collapse isOpen={isOpen}>
        <div className="hospital-list-container"> {/* 이 div로 ListGroup을 감쌉니다. */}
          <ListGroup>
            {Array.isArray(hospitals) && hospitals.length > 0 ? (
              hospitals.map((hospital) => (
                <ListGroupItem
                  key={hospital.hospitalNo}
                  onClick={() => handleClick(hospital)}
                  className={`hospital-list-item ${selectedHospital?.hospitalNo === hospital.hospitalNo ? 'active' : ''}`} // 'active' 클래스 추가
                >
                  <div className="hospital-item-label"><strong>이름:</strong> {getDefaultValue(hospital.hospitalName)}</div>
                  <div className="hospital-item-label"><strong>주소:</strong> {getDefaultValue(hospital.hospitalAddr)}</div>
                  <div className="hospital-item-label"><strong>전화:</strong> {getDefaultValue(hospital.hospitalPhone)}</div>
                  <div className="hospital-item-label"><strong>진료:</strong> {getDefaultValue(hospital.hospitalType)}</div>
                  <div className="hospital-item-label"><strong>과목:</strong> {getDefaultValue(hospital.hospitalSpecies)}</div>
                </ListGroupItem>
              ))
            ) : (
              <div>No hospitals data available.</div>
            )}
          </ListGroup>
        </div>
      </Collapse>
    </>
  );
};

HospitalList.propTypes = {
  hospitals: PropTypes.arrayOf(
    PropTypes.shape({
      hospitalNo: PropTypes.number.isRequired,
      hospitalName: PropTypes.string.isRequired,
      hospitalAddr: PropTypes.string.isRequired,
      hospitalPhone: PropTypes.string.isRequired,
      hospitalType: PropTypes.string.isRequired,
      hospitalSpecies: PropTypes.string.isRequired,
      hospitalLati: PropTypes.number,
      hospitalLongti: PropTypes.number
    })
  ).isRequired,
  onHospitalClick: PropTypes.func.isRequired,
  selectedHospital: PropTypes.object // 클릭된 병원 정보를 담을 객체
};

export default HospitalList;
