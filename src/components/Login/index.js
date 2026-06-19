import React , {useState} from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './index.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsgShow, setErrorMsgShow] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e)  => {
        e.preventDefault();
        setLoading(true);
        // Handle login logic here
        const url = "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin";
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        };
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        if(response.ok) {
            console.log(data?.data);
            const jwtToken = data?.data?.token;
            console.log(jwtToken);
            Cookies.set('jwt_token', jwtToken, { expires: 7 }); // Store JWT token in cookies for 7 days
            navigate('/');
        } else {
            setError(data.message);
            setErrorMsgShow(true);
        }
        setLoading(false);
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h1 className="login-title"> Go Bussiness </h1>
                <p className="login-subtitle"> Sign in to open your referral dashboard. </p>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label className="login-label" htmlFor="Email">Email</label>
                    <br/>
                    <input className="login-input" id="Email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <br/>
                    <label className="login-label" htmlFor="Password">Password</label>
                    <br/>
                    <input className="login-input" id="Password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <br/>
                    {errorMsgShow && <p className="login-error">{error}</p>}
                    <button className="login-button" type="submit" disabled={loading}>
                        {loading ? "Signing in…" : "Sign in"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;