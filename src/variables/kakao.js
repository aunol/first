import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import './Kakao.css'; // CSS 파일을 import합니다.

const ITEMS_PER_PAGE = 14;

const Kakao = ({ hospitals, selectedHospital, onHospitalSelect }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log("Component mounted or hospitals/selectedHospital updated");
    console.log("Hospitals:", hospitals);
    console.log("Selected Hospital:", selectedHospital);
  }, [hospitals, selectedHospital]);

  // 페이지네이션 로직
  const totalPages = Math.ceil(hospitals.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentHospitals = hospitals.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="map-wrapper">
      <div className="map-container">
        <Map 
          center={{ lat: 33.450701, lng: 126.570667 }} // 기본 중앙 위치
          style={{ width: '100%', height: '100%' }}
          level={7} // 지도 확대 수준 (1~14, 숫자가 작을수록 확대됨)
        >
          {currentHospitals.map(hospital => {
            console.log("Rendering marker for hospital:", hospital);

            return (
              <MapMarker
                key={hospital.hospitalNo}
                position={{ lat: hospital.hospitalLati, lng: hospital.hospitalLongi }}
                title={hospital.hospitalName}
                onClick={() => {
                  console.log("Hospital marker clicked:", hospital);
                  onHospitalSelect(hospital);
                }}
                image={{
                  src: selectedHospital && selectedHospital.hospitalNo === hospital.hospitalNo 
                    ? 'selected-marker.png' // 선택된 병원 마커 이미지
                    : 'default-marker.png', // 기본 병원 마커 이미지
                  size: { width: 24, height: 35 },
                }}
              />
            );
          })}
        </Map>
      </div>
      <div className="list-overlay">
        <div className="list-header">
          <span>Total: {hospitals.length} hospitals</span>
        </div>
        <ul>
          {currentHospitals.map(hospital => (
            <li key={hospital.hospitalNo} onClick={() => onHospitalSelect(hospital)}>
              {hospital.hospitalName}
            </li>
          ))}
        </ul>
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            &laquo; Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Kakao;
