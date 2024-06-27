import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../config/';

const Register = () => {
   return (
      <>
         <section className='vh-100'>
            <div className='container pt-60 h-custom'>
               <div className='row d-flex justify-content-center align-items-center h-100'>
                  <div className='col-md-8 col-lg-6 col-xl-4'>
                     <p className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>Sign up</p>

                     <form className='mx-1 mx-md-4'>

                        <div className='d-flex flex-row align-items-center mb-4'>
                           <FontAwesomeIcon icon='fa-solid fa-user' className='me-3' />
                           <div className='flex-fill mb-0'>
                              <input type='text' id='form3Example1c' className='form-control' placeholder='Your Name' />
                           </div>
                        </div>

                        <div className='d-flex flex-row align-items-center mb-4'>
                           <FontAwesomeIcon icon='fa-solid fa-envelope' className='me-3' />
                           <div className='flex-fill mb-0'>
                              <input type='email' id='form3Example3c' className='form-control' placeholder='Your Email' />
                           </div>
                        </div>

                        <div className='d-flex flex-row align-items-center mb-4'>
                           <FontAwesomeIcon icon='fa-solid fa-lock' className='me-3' />
                           <div className='flex-fill mb-0'>
                              <input type='password' id='form3Example4c' className='form-control' placeholder='Password' />
                           </div>
                        </div>

                        <div className='d-flex flex-row align-items-center mb-4'>
                           <FontAwesomeIcon icon='fa-solid fa-key' className='me-3' />
                           <div className='flex-fill mb-0'>
                              <input type='password' id='form3Example4cd' className='form-control' placeholder='Confirm Password' />
                           </div>
                        </div>

                        <div className='form-check d-flex justify-content-center mb-5'>
                           <input className='form-check-input me-2' type='checkbox' value='' id='form2Example3c' />
                           <label className='form-check-label'>
                              I agree all statements in <Link to={'/terms'}>Terms of service</Link>
                           </label>
                        </div>

                        <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
                           <button type='button' className='btn'>Register</button>
                        </div>

                     </form>

                  </div>
                  <div className='col-md-9 col-lg-6 col-xl-5 offset-xl-1'>
                     <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp'
                        className='img-fluid' alt='Sample image' />
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default Register;
