import { useEffect, useState } from 'react';
import { loadKakaoMaps } from 'variables/kakao';

const KakaoMap = ({ hospitals, selectedHospital, onHospitalSelect }) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null); // 현재 활성화된 마커

  useEffect(() => {
    loadKakaoMaps(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 7 // 지도의 확대 레벨
      };

      const mapInstance = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(mapInstance);

      // 병원 마커 생성
      const newMarkers = hospitals.map(hospital => {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(hospital.hospitalLati, hospital.hospitalLongi),
          map: mapInstance,
          // 기본 마커 아이콘 설정
          image: new window.kakao.maps.MarkerImage(
            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
            new window.kakao.maps.Size(24, 35)
          ),
        });

        const content = `
          <div style="padding:5px; width:200px;">
            <h5>${hospital.hospitalName}</h5>
            <p><strong>주소:</strong> ${hospital.hospitalAddr}</p>
            <p><strong>전화번호:</strong> ${hospital.hospitalPhone}</p>
            <p><strong>진료동물:</strong> ${hospital.hospitalSpecies}</p>
            <p><strong>진료시간:</strong> ${hospital.hospitalType}</p>
          </div>
        `;
        const infoWindow = new window.kakao.maps.InfoWindow({
          content: content,
          removable: true
        });

        // 마커 이벤트 설정
        window.kakao.maps.event.addListener(marker, 'mouseover', () => {
          infoWindow.open(mapInstance, marker);
        });

        window.kakao.maps.event.addListener(marker, 'mouseout', () => {
          infoWindow.close();
        });

        window.kakao.maps.event.addListener(marker, 'click', () => {
          onHospitalSelect(hospital);
        });

        return { marker, hospital }; // 마커와 병원 정보 결합
      });

      setMarkers(newMarkers);
    });
  }, [hospitals, onHospitalSelect]);

  useEffect(() => {
    if (selectedHospital && map) {
      const latLng = new window.kakao.maps.LatLng(selectedHospital.hospitalLati, selectedHospital.hospitalLongi);
      map.setCenter(latLng);
      // map.setLevel(3);

      // 이전에 활성화된 마커의 상태 복원
      if (activeMarker) {
        activeMarker.setImage(
          new window.kakao.maps.MarkerImage(
            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
            new window.kakao.maps.Size(24, 35)
          )
        );
      }

      // 현재 선택된 마커의 색상 변경
      const newActiveMarker = markers.find(markerObj =>
        markerObj.hospital.hospitalNo === selectedHospital.hospitalNo
      );

      if (newActiveMarker) {
        newActiveMarker.marker.setImage(
          new window.kakao.maps.MarkerImage(
            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
            new window.kakao.maps.Size(24, 35)
          )
        );

        setActiveMarker(newActiveMarker.marker);
        window.kakao.maps.event.trigger(newActiveMarker.marker, 'click');
      }
    }
  }, [selectedHospital, map, markers, activeMarker]);

  return <div id="map" style={{ width: "100%", height: "100vh" }}></div>;
};

export default KakaoMap;
