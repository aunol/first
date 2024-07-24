import { useState } from 'react';
import { hour24Rows } from 'views/Hospital';

function Hour24({ onChange }) {
  const [checkedIdsSet, setCheckedIdsSet] = useState(new Set());

  const updateSet = (set, id) => {
    const updatedSet = new Set(set);
    if (updatedSet.has(id)) {
      updatedSet.delete(id);
    } else {
      updatedSet.add(id);
    }
    return updatedSet;
  };

  const handleOnChange = (id) => {
    setCheckedIdsSet((prevSet) => {
      const newSet = updateSet(prevSet, id);
      const selectedHours = Array.from(newSet).map((id) => hour24Rows.find(row => row.id === id).name);
      onChange(selectedHours);  // 부모에게 선택된 hours를 전달
      console.log("선택된 시간대들:", selectedHours); // 선택된 시간대를 콘솔에 출력
      return newSet;
    });
  };

  return (
    <>
      <div style={{ textAlign: 'center', fontSize: '15px' }}>서비스</div>
      <div>
        {hour24Rows.map(({ id, name }) => (
          <div key={id} style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={checkedIdsSet.has(id)}
              onChange={() => handleOnChange(id)}
              style={{
                transform: 'scale(0.8)', // 체크박스를 80% 크기로 축소
                marginRight: '2px',     // 라벨과의 간격을 줄입니다
                cursor: 'pointer'       // 체크박스 클릭 시 커서 모양 변경
              }}
              disabled // 체크박스 클릭을 비활성화하여 상태만 표시
            />
            <label
              style={{
                fontSize: '11px',
                margin: '3px',            // 기본 여백을 제거합니다
                lineHeight: '1.2',        // 체크박스와 라벨의 수직 정렬을 조정합니다
                paddingTop: '3px',       // 라벨의 상단 여백을 제거합니다
                cursor: 'pointer'        // 이름 클릭 시 커서 모양 변경
              }}
              onClick={() => handleOnChange(id)} // 이름 클릭 시 체크박스 상태 변경
            >
              {name}
            </label>
          </div>
        ))}
      </div>
    </>
  );
}

export default Hour24;
