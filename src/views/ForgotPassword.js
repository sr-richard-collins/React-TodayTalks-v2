import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthContext';

const ForgotPassword = () => {
  const { forgotPassword } = useContext(AuthContext);

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
            <div className='col-md-9 col-lg-6 col-xl-5'>
              <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg' className='img-fluid' alt='Sample image' />
            </div>
            <div className='col-md-8 col-lg-6 col-xl-4 offset-xl-1'>
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
                  />
                </div>

                <div className='text-center mt-4 pt-2'>
                  <button type='submit' className='btn btn-primary' style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                    Submit
                  </button>
                  <p className='small fw-bold mt-2 pt-1 mb-0'>
                    Remembered your password? <Link to='/login'>Log In</Link>
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
