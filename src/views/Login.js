import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../provider/AuthContext';

const Login = () => {
   const { setting } = useSelector((state) => state.setting);
   return (
      <>
         <section className='vh-100'>
            <div className='container pt-60 h-custom'>
               <div className='row d-flex justify-content-center align-items-center h-100'>
                  <div className='col-md-9 col-lg-6 col-xl-5'>
                     <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg'
                        className='img-fluid' alt='Sample image' />
                  </div>
                  <div className='col-md-8 col-lg-6 col-xl-4 offset-xl-1'>
                     <form>
                        <div className='d-flex flex-row align-items-center justify-content-center justify-content-lg-start'>
                           <p className='lead fw-normal mb-0 me-3'>Sign in with</p>
                           <Link to={setting.social_fb} target='blank' className='login-social-icon btn' style={{ padding: 'unset' }}>
                              <FontAwesomeIcon icon='fa-brands fa-facebook-f' />
                           </Link>

                           <Link to={setting.social_twitter} target='blank' className='login-social-icon btn' style={{ padding: 'unset' }}>
                              <FontAwesomeIcon icon='fa-brands fa-twitter' />
                           </Link>

                           <Link to={setting.social_linkedin} target='blank' className='login-social-icon btn' style={{ padding: 'unset' }}>
                              <FontAwesomeIcon icon='fa-brands fa-linkedin' />
                           </Link>
                        </div>

                        <div className='divider d-flex align-items-center my-4'>
                           <p className='text-center fw-bold mx-3 mb-0'>Or</p>
                        </div>

                        <div data-mdb-input-init className='form-outline mb-4'>
                           <input type='email' id='form3Example3' className='form-control form-control-lg'
                              placeholder='Enter a valid email address' />
                           <label className='form-label'>Email address</label>
                        </div>

                        <div data-mdb-input-init className='form-outline mb-3'>
                           <input type='password' id='form3Example4' className='form-control form-control-lg'
                              placeholder='Enter password' />
                           <label className='form-label'>Password</label>
                        </div>

                        <div className='d-flex justify-content-between align-items-center'>
                           <div className='form-check my-0'>
                              <input className='form-check-input me-2' type='checkbox' value='' id='form2Example3' />
                              <label className='form-check-label'>
                                 Remember me
                              </label>
                           </div>
                           <Link to={'/'} className='text-body'>Forgot password?</Link>
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
