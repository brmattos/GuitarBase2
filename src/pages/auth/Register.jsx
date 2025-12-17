import React, { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';
import '../../styles/auth/register.scss';

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { userLoggedIn } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (!isRegistering) {
      setIsRegistering(true);
      setErrorMessage('');
      try {
        await doCreateUserWithEmailAndPassword(email, password);
        navigate('/');
      } catch (error) {
        // Handle Firebase errors
        switch (error.code) {
          case 'auth/email-already-in-use':
            setErrorMessage('This email is already in use');
            break;
          case 'auth/invalid-email':
            setErrorMessage('Invalid email address');
            break;
          case 'auth/weak-password':
            setErrorMessage('Password is too weak');
            break;
          default:
            setErrorMessage('Failed to register. Please try again.');
        }
        setIsRegistering(false);
      }
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to='/' replace={true} />}
      <main className='register-page'>
        <div className='register-card'>
          <div className='register-header'>
            <h3>Create a New Account</h3>
          </div>

          <form onSubmit={onSubmit} className='register-form'>
            <div className='form-group'>
              <label>Email</label>
              <input
                type='email'
                autoComplete='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label>Password</label>
              <input
                type='password'
                autoComplete='new-password'
                required
                disabled={isRegistering}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label>Confirm Password</label>
              <input
                type='password'
                autoComplete='off'
                required
                disabled={isRegistering}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {errorMessage && <span className='error'>{errorMessage}</span>}

            <button
              type='submit'
              disabled={isRegistering}
              className={`btn-primary ${isRegistering ? 'disabled' : ''}`}>
              {isRegistering ? 'Signing Up...' : 'Sign Up'}
            </button>

            <div className='login-link'>
              Already have an account? <Link to='/login'>Continue</Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;