



function Login(){
    var userid = document.forms["form"]["userid"].value;
    var password = document.forms["form"]["password"].value;

    return(
        <div>
            <h1>Login</h1>
            <form>
                <input type="text" placeholder="Enter Userid" name="userid" />
                <input type="password" placeholder="Enter Password" name="password" />
                <button onClick={Login}>Login</button>
            </form>
        </div>
    )

}
export default Login;