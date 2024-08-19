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

      // 지도 초기화 및 마커 추가
      const newMarkers = hospitals.map(hospital => {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(hospital.hospitalLati, hospital.hospitalLongi),
          map: mapInstance
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

        window.kakao.maps.event.addListener(marker, 'mouseover', () => {
          infoWindow.open(mapInstance, marker);
        });

        window.kakao.maps.event.addListener(marker, 'mouseout', () => {
          infoWindow.close();
        });

        window.kakao.maps.event.addListener(marker, 'click', () => {
          onHospitalSelect(hospital);
        });

        return marker;
      });

      setMarkers(newMarkers);

      // 지도 마우스 드래그로 이동 기능 (기본적으로 Kakao 지도 API는 지원)
    });
  }, [hospitals, onHospitalSelect]);

  useEffect(() => {
    if (selectedHospital && map) {
      const latLng = new window.kakao.maps.LatLng(selectedHospital.hospitalLati, selectedHospital.hospitalLongi);
      map.setCenter(latLng);
      map.setLevel(3);

      // 기존 마커 이미지 초기화
      markers.forEach(marker => {
        marker.setImage(
          new window.kakao.maps.MarkerImage(
            'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
            new window.kakao.maps.Size(24, 35)
          )
        );
      });

      // 선택된 병원의 마커를 빨간색으로 변경
      const selectedMarker = markers.find(marker => 
        marker.getPosition().equals(latLng)
      );

      if (selectedMarker) {
        selectedMarker.setImage(
          new window.kakao.maps.MarkerImage(
            'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
            new window.kakao.maps.Size(24, 35)
          )
        );
        window.kakao.maps.event.trigger(selectedMarker, 'click');
      }
    }
  }, [selectedHospital, map]);

  return (
    <div id="map" style={{ width: "100%", height: "100%" }}></div>
  );
};

export default KakaoMap;
