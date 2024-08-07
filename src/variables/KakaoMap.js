import { useEffect, useState } from 'react';
import { loadKakaoMaps } from 'variables/kakao';

const KakaoMap = ({ hospitals, selectedHospital, onHospitalSelect }) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    loadKakaoMaps(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 7 // 지도의 확대 레벨
      };

      const mapInstance = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(mapInstance);

      const newMarkers = hospitals.map(hospital => {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(hospital.lat, hospital.lng),
          map: mapInstance,
        });

        // 마커 클릭 이벤트 추가
        window.kakao.maps.event.addListener(marker, 'click', () => {
          onHospitalSelect(hospital);
        });

        return marker;
      });

      setMarkers(newMarkers);
    });
  }, [hospitals, onHospitalSelect]);

  return (
    <div id="map" style={{ width: "100%", height: "100%" }}></div>
  );
};

export default KakaoMap;
