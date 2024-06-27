import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../provider/AuthContext';

const Login = () => {
  const { setting } = useSelector((state) => state.setting);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Error logging in', error);
    }
  };
  return (
    <>
      <section className='vh-100'>
        <div className='container pt-60 h-custom'>
          <div className='row d-flex justify-content-center align-items-center h-100'>
            <div className='col-md-9 col-lg-6 col-xl-5'>
              <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg' className='img-fluid' alt='Sample image' />
            </div>
            <div className='col-md-8 col-lg-6 col-xl-4 offset-xl-1'>
              <form onSubmit={handleSubmit}>
                <div className='form-outline mb-4'>
                  <input
                    type='email'
                    id='form3Example3'
                    className='form-control form-control-lg'
                    placeholder='Enter a valid email address'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className='form-label'>Email address</label>
                </div>

                <div className='form-outline mb-3'>
                  <input
                    type='password'
                    id='form3Example4'
                    className='form-control form-control-lg'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className='form-label'>Password</label>
                </div>

                <div className='d-flex justify-content-between align-items-center'>
                  <div className='form-check my-0'>
                    <input className='form-check-input me-2' type='checkbox' value='' id='form2Example3' />
                    <label className='form-check-label'>Remember me</label>
                  </div>
                  <a href='/forgot-password' className='text-body'>
                    Forgot password?
                  </a>
                </div>

                <div className='text-center mt-4 pt-2'>
                  <button type='submit' className='btn btn-primary' style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                    Log In
                  </button>
                  <p className='small fw-bold mt-2 pt-1 mb-0'>
                    Don't have an account? <a href='/register'>Register</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
