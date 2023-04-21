import React, { useContext } from 'react';
import { useState } from 'react';
import './SignUp.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';


 
const SignUp = () => {
    const [error, setError] = useState('');

    const {createUser} = useContext(AuthContext)

    
    const handleSignUp =(event) =>{
        
        event.preventDefault()
        const form = event.target;

        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log( email, password, confirm);

        setError('');

        if(password !== confirm){
            setError('Password not matched')
        }
        else if(password.length < 6){
            setError('Password should have 6 characters')
        }
        createUser(email, password)
        .then(result =>{
           const loggedUser = result.user;
           console.log(loggedUser)
        })
        .catch(error =>{
            console.error(error);
            setError(error.message)
        })
    }


    return (
        <div className='form-container'>
            <h3 className='form-title'>Sign Up</h3>
            <form onSubmit={handleSignUp} className='form-control'>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' placeholder='Your Email' required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' placeholder='Your Password' required />
                </div>
                <div>
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" name='confirm' placeholder='Confirm Password' required />
                </div>
                <input className='btn-submit' type="submit" value="sign up" />
            </form>
            <p><small>Already have an account? <Link to='/login'>Please Login</Link></small></p>
            <p className='error'>{error}</p>

        </div>
    );
};

export default SignUp;