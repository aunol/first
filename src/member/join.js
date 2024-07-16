


function Join(){
    var userid = document.getElementById("userid").value;
    var password = document.getElementById("password").value;
    var checkpassword = document.getElementById("checkpassword").value;
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;

    return (
        <div>
            <div className="join">join</div>
            아이디 : <input type="text" id="userid" name="userid" placeholder="아이디를 입력하세요."/><br/>
            비밀번호 : <input type="password" id="password" name="password" placeholder="비밀번호를 입력하세요."/><br/>
            비밀번호 확인 : <input type="password" id="checkPassword" name="checkpassword" placeholder="비밀번호를 다시 입력하세요."/><br/>
            이메일 : <input type="email" id="email" name="email" placeholder="이메일을 입력하세요."/><br/>
            닉네임 : <input type="text" id="username" name="username" placeholder="닉네임을 입력하세요."/><br/>
            <button onClick={Join}>Join</button>

        </div>

    )


}
export default Join;