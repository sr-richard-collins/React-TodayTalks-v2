import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthContext';
import { IMAGE_BASE_URL } from '../config';
import { DEFAULT_LOGO } from '../config/constant';

const ForgotPassword = () => {
  const { forgotPassword } = useContext(AuthContext);
  const { setting } = useSelector((state) => state.setting);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement your logic to handle the forgot password request
    try {
      await forgotPassword(email);
      // Example: Send email to server for password reset instructions
      setMessage('Password reset instructions sent to your email.');
    } catch (error) {
      setMessage('Error sending reset instructions. Please try again.');
      console.error('Error sending reset instructions:', error);
    }
  };

  return (
    <>
      <section className='vh-100'>
        <div className='container pt-60 h-custom'>
          <div className='row d-flex justify-content-center align-items-center h-100'>
            <div className='col-md-9 col-lg-6 col-xl-5 mb-5'>
              <div className='brand_logo_container'>
                <img
                  src={setting.site_logo !== undefined ? IMAGE_BASE_URL + setting.site_logo : DEFAULT_LOGO}
                  alt='logo'
                  className='my-4'
                  style={{ height: '4rem', width: '12rem' }}
                />
              </div>
              <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg' className='img-fluid' alt='Sample image' />
            </div>
            <div className='col-md-8 col-lg-6 col-xl-4 offset-xl-1 my-5'>
              <div className='justify-content-end d-flex'>
                <Link to='/' className='nav-bar-link'>
                  <FontAwesomeIcon icon='fa-solid fa-house' className='img-icon-left-menu' />
                </Link>
              </div>
              <form onSubmit={handleSubmit}>
                {message && (
                  <div className='alert alert-success' role='alert'>
                    {message}
                  </div>
                )}
                <div className='form-outline mb-4'>
                  <label className='form-label'>Email address</label>
                  <input
                    type='email'
                    id='form3Example3'
                    className='form-control form-control-lg'
                    placeholder='Enter your email address'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className='text-center mt-4 pt-2'>
                  <button type='submit' className='btn btn-primary' style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                    Submit
                  </button>
                  <p className='small fw-bold mt-2 pt-1 mb-0'>
                    Remembered your password? <Link to='/login'>Log In</Link> Or <Link to='/'> Home</Link>
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

export default ForgotPassword;
