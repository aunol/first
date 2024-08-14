import axios from 'axios';
import { createUrl } from 'layouts/createUrl';
import { Button, ModalBody } from "reactstrap";

const Fmodal = ({ currentUserName, toggleModal, refreshBlockList }) => {
    const userNo = sessionStorage.getItem("UserNo");
    const userName = sessionStorage.getItem("UserName"); // 친구 신청자의 이름
    const friendName = currentUserName;

    // 친구신청 버튼 클릭 시 실행될 함수
    const handleFriendRequest = async () => {
        const fullUrl = createUrl('askFriend');
       
        console.log("신청확인", userNo, userName, friendName);
        try {            
            const response = await axios.post(fullUrl, null, {
                params: {
                    userNo,
                    userName,
                    friendName
                }
            });
            const result = response.data;

            if (result.message === "success") {
                alert(`${friendName}님에게 친구 신청을 보냈습니다.`);
            } else if (result.message === "alreadyFriend") {
                alert(`${friendName}님은 이미 친구입니다.`);
            } else if (result.message === "alreadySent") {
                alert(`${friendName}님에게 이미 친구 신청을 보냈습니다.`);
            }     

        } catch (error) {
            console.error("Error sending friend request", error);
            alert("친구 신청을 보내는 중 오류가 발생했습니다.");
        } finally{
            toggleModal(); // 모달 창 닫기
        }
    };

    // 차단 버튼 클릭 시 실행될 함수
    const handleBlock = async () => {
        const fullUrl = createUrl('block');
        
        console.log("차단확인", userNo, friendName);
        try {
            await axios.post(fullUrl, null, {
                params: {
                    userNo,
                    friendName
                }
            });
            
            alert(`${friendName}님을 차단했습니다.`);
            refreshBlockList(); // 차단 목록 갱신 함수 호출
            toggleModal(); // 모달 창 닫기
        } catch (error) {
            console.error("Error blocking user", error);
            alert("차단하는 중 오류가 발생했습니다.");
        }
    };

    return (
        <ModalBody>
            <Button color="primary" onClick={handleFriendRequest}>친구신청</Button>{' '}
            <Button color="danger" onClick={handleBlock}>차단</Button>
        </ModalBody>
    );
};

export default Fmodal;
