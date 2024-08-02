import axios from 'axios';
import { useEffect, useState } from 'react';
import { CardTitle } from 'reactstrap';

const HomeTitle = () => {
  const [title, setTitle] = useState(''); // 사용자 제목
  const [tempTitle, setTempTitle] = useState(''); // 수정 중인 제목
  const [isEditing, setIsEditing] = useState(false); // 편집 모드 여부

  // 사용자 제목을 sessionStorage에서 가져오기
  useEffect(() => {
    const userTitle = sessionStorage.getItem('UserTitle') || 'Plz login'; // 기본 제목 설정
    setTitle(userTitle);
    setTempTitle(userTitle);
  }, []);

  // 편집 모드 활성화
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // 제목 입력 변경 처리
  const handleTitleChange = (e) => {
    setTempTitle(e.target.value);
  };

  // 제목 저장 처리
  const handleTitleSave = async () => {
    const userId = sessionStorage.getItem('UserId');
    console.log('Sending request with userId:', userId, 'and newTitle:', tempTitle);
    
    try {
        if (!userId) {
            alert('사용자 정보를 찾을 수 없습니다.');
            return;
        }

        // 서버 요청 보내기
        const response = await axios.post('http://localhost:8080/titleFix', null, {
            params: { userId, newTitle: tempTitle }
        });

        // 응답 상태 코드 확인
        if (response.status === 200) {
            // 서버 응답이 성공적일 때 제목과 세션 스토리지 업데이트
            setTitle(tempTitle);
            sessionStorage.setItem('UserTitle', tempTitle);
            alert('제목이 업데이트되었습니다.');
        } else {
            // 서버 응답이 실패일 때 처리
            alert('제목 업데이트에 실패했습니다.');
        }
    } catch (error) {
        console.error('제목 업데이트 중 오류 발생:', error);
        alert('제목 업데이트 중 오류가 발생했습니다.');
    } finally {
        setIsEditing(false);
    }
  };

  // 제목 수정 취소 처리
  const handleTitleCancel = () => {
    setTempTitle(title);
    setIsEditing(false);
  };

  return (
    <CardTitle tag="h4" className="title">
      {isEditing ? (
        <div>
          <input 
            type="text" 
            value={tempTitle} 
            onChange={handleTitleChange} 
            style={{ marginRight: '10px' }} // 예시 스타일링
          />
          <button 
            onClick={handleTitleSave} 
            style={{ marginRight: '5px' }} // 예시 스타일링
          >
            Save
          </button>
          <button 
            onClick={handleTitleCancel}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          {title} 
          <a 
            style={{ cursor: 'pointer', marginLeft: '10px' }} 
            onClick={handleEditClick}
          > + </a>
        </div>
      )}
    </CardTitle>
  );
};

export default HomeTitle;
