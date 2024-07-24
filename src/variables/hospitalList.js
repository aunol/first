import './Hospital.css'; // 스타일을 별도의 CSS 파일로 분리

function HospitalList({ hospitals }) {
  return (
    <div className="hospital-list">
      {hospitals.map((hospital, index) => (
        <div key={index} className="hospital-card">
          <h5 className="hospital-name" style={{ paddingLeft:'2px'}}>{hospital.name}</h5>
          <p className="hospital-phone"><strong>전화번호:</strong> {hospital.phone}</p>
          <p className="hospital-address"><strong>주소:</strong> {hospital.address}</p>
          <p className="hospital-department"><strong>진료과목:</strong> {hospital.department}</p>
          <p className="hospital-hours"><strong>근무시간:</strong> {hospital.hours}</p>

        </div>
      ))}
    </div>
  );
}

export default HospitalList;
