
function FindId(){
    var email = document.getElementById("email").value;

    return (
        <div>
            <h3> 아이디 찾기 </h3>
            <h5> 이메일 주소를 입력해주세요. </h5>
            <input type="text" id="email" placeholder="이메일 주소 입력" />
            <button onClick={FindId}> 아이디 찾기 </button>

        </div>
    )


}
export default FindId;