import React, { useState } from 'react';
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const Login = () => {
    const [show, setShow] = useState(false);

    const {signIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)

    const from = location.state?.from?.pathname || '/shop';

    const handleSignIn =(event) =>{
        event.preventDefault()

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            form.reset();
            navigate(from, {replace: true})
        })
        .catch(error =>{console.error(error)})
    }
    return (
        <div className='form-container'>
            <h3 className='form-title'>Login</h3>
            <form onSubmit={handleSignIn} className='form-control'>
                <div>
                <label htmlFor="email">Email</label>
                <input type="email" name='email' placeholder='Your Email' required/>
                </div>
                <div>
                <label htmlFor="password">Password</label>
                <input type={show ? "text" : "password"} name='password' placeholder='Your Password' required/>
                </div>
                <p onClick={()=>setShow(!show)}><small>
                    {
                        show ? <span>Hide password</span> : <span>Show password</span>
                    }
                 </small></p>
                <input className='btn-submit' type="submit" value="login" />
            </form>
            <p><small>New to ema-john?? <Link to='/signup'>Please SignUp</Link></small></p>
            
        </div>
    );
};

export default Login;