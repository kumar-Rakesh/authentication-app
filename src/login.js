import { useRef, useState, useEffect, useContext } from 'react';
// import AuthContext from "./context/AuthProvider";
import jwt_decode from 'jsonwebtoken'
 import axios from 'axios';
const LOGIN_URL = '/auth';

const Login = () => {
    // const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    
    function handleCallback(response){
    console.log('Information', response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden= "true";
    }

    /*useEffect(() => {
        userRef.current.focus();
        google.accounts.id.initialize({
            client_id: "665467607674-5eff832n19f75lofr6ga9oocsfdmpg55.apps.googleusercontent.com",
            callback: handleCallback
        });
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "large"}
        )
    }, []) */

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
           const response = await axios.post("https://comp-8967-authentication-app.herokuapp.com/api/auth/login" ,
                JSON.stringify({ email: user, password: pwd })
                
            );
           console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            //const roles = response?.data?.roles;
            //setAuth({ user, pwd, roles, accessToken });
            //setUser('');
            //setPwd('');
            //setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
            
        }
        
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            placeholder='Username'
                        />

                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            placeholder='Password'
                        />
                        <input type="submit" value="Submit" />
                    </form>
                    <p>
                        Need an Account?
                        <span className="line">
                            
                            <a href="#">Register</a>
                        </span>
                    </p>
                    <div className="google" id="signInDiv"></div>

                </section>
            )}
        </>
    )
}

export default Login