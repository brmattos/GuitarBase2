import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from '../../firebase/auth';
import '../../styles/auth/login.scss'

const Login = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      setErrorMessage('');

      try {
        await doSignInWithEmailAndPassword(email, password);
        // TODO: doSendEmailVerification()
      } catch (error) {
        console.error('Login failed:', error);
        // handle Firebase auth errors
        switch (error.code) {
          case 'auth/user-not-found':
            setErrorMessage('No user found with this email.');
            break;
          case 'auth/wrong-password':
            setErrorMessage('Incorrect password.');
            break;
          case 'auth/invalid-email':
            setErrorMessage('Invalid email address.');
            break;
          case 'auth/invalid-credential':
            setErrorMessage('Invalid login credentials.');
            break;
          default:
            setErrorMessage('Failed to sign in. Please try again.');
        }
        setIsSigningIn(false);
      }
    }
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((err) => {
        setIsSigningIn(false);
      });
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to='/' replace={true} />}
      <main className='login-page'>
        <div className='login-card'>
          <div className='login-header'>
            <h3>Welcome Back</h3>
          </div>

          <form onSubmit={onSubmit} className='login-form'>
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
                autoComplete='current-password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {errorMessage && <span className='error'>{errorMessage}</span>}

            <button
              type='submit'
              disabled={isSigningIn}
              className={`btn-primary ${isSigningIn ? 'disabled' : ''}`}>
              {isSigningIn ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className='register-text'>
            Don't have an account? <Link to='/register'>Sign up</Link>
          </p>

          <div className='divider'>
            <span>OR</span>
          </div>

          <button
            disabled={isSigningIn}
            onClick={onGoogleSignIn}
            className={`btn-google ${isSigningIn ? 'disabled' : ''}`}>
            <img src='images/google-icon.png' alt='google icon' className='google-icon' />
            {isSigningIn ? 'Signing In...' : 'Continue with Google'}
          </button>
        </div>
      </main>
    </>
  );
};

export default Login;
