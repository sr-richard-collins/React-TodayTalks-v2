import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../config/';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    referralCode: '',
    password: '',
    password_confirmation: '',
    agreeToTerms: false,
    avatar: null,
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);

  const [avatarPreview, setAvatarPreview] = useState('../assets/images/profile.png');

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    if (type === 'file' && files.length > 0) {
      setFormData({
        ...formData,
        avatar: files[0],
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: newValue,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('referralCode', formData.referralCode);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('password_confirmation', formData.password_confirmation);
      formDataToSend.append('agreeToTerms', formData.agreeToTerms ? '1' : '0');
      formDataToSend.append('avatar', formData.avatar);

      const response = await axios.post('/api/user/signup', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsVerificationSent(true);
      alert(response.data.message);
      // Optionally handle success feedback or redirection
    } catch (error) {
      console.error('Error submitting form:', error);
      // Optionally handle error feedback
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/user/verify-email', {
        email: formData.email,
        verification_code: verificationCode,
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <section className='vh-100'>
        <div className='container pt-60 h-custom'>
          <div className='row d-flex justify-content-center align-items-center h-100'>
            <div className='col-md-8 col-lg-6 col-xl-4'>
              <p className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>Sign up</p>
              <div>
                {!isVerificationSent ? (
                  <form className='mx-1 mx-md-4' onSubmit={handleSubmit} encType='multipart/form-data'>
                    <div className='account-profile d-flex align-items-center mb-4'>
                      <div className='ap-img pro_img_wrapper'>
                        <input id='file-upload' type='file' name='avatar' className='d-none' accept='image/*' onChange={handleChange} />
                        <label htmlFor='file-upload'>
                          <img id='profile-pic' className='ap-img__main rounded-circle wh-120 bg-lighter d-flex' src={avatarPreview} alt='profile' />
                          <span className='cross' id='remove_pro_pic'>
                            <img src='../assets/images/camera.svg' alt='camera' className='svg' />
                          </span>
                        </label>
                      </div>
                      <div className='account-profile__title'>
                        <h6 className='fs-15 ms-20 fw-500 text-capitalize'>Profile Photo</h6>
                      </div>
                    </div>
                    <div className='d-flex flex-row align-items-center mb-4'>
                      <FontAwesomeIcon icon='fa-solid fa-user' className='me-3' />
                      <div className='flex-fill mb-0'>
                        <input
                          type='text'
                          id='form3Example1c'
                          className='form-control'
                          placeholder='Your Name'
                          name='name'
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className='d-flex flex-row align-items-center mb-4'>
                      <FontAwesomeIcon icon='fa-solid fa-envelope' className='me-3' />
                      <div className='flex-fill mb-0'>
                        <input
                          type='email'
                          id='form3Example3c'
                          className='form-control'
                          placeholder='Your Email'
                          name='email'
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className='d-flex flex-row align-items-center mb-4'>
                      <FontAwesomeIcon icon='fa-solid fa-envelope' className='me-3' />
                      <div className='flex-fill mb-0'>
                        <input
                          type='text'
                          id='form3Example3c'
                          className='form-control'
                          placeholder='Referral Code'
                          name='referralCode'
                          value={formData.referralCode}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='d-flex flex-row align-items-center mb-4'>
                      <FontAwesomeIcon icon='fa-solid fa-lock' className='me-3' />
                      <div className='flex-fill mb-0'>
                        <input
                          type='password'
                          id='form3Example4c'
                          className='form-control'
                          placeholder='Password'
                          name='password'
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className='d-flex flex-row align-items-center mb-4'>
                      <FontAwesomeIcon icon='fa-solid fa-key' className='me-3' />
                      <div className='flex-fill mb-0'>
                        <input
                          type='password'
                          id='form3Example4cd'
                          className='form-control'
                          placeholder='Confirm Password'
                          name='password_confirmation'
                          value={formData.password_confirmation}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className='form-check d-flex justify-content-center mb-5'>
                      <input
                        className='form-check-input me-2'
                        type='checkbox'
                        id='form2Example3c'
                        name='agreeToTerms'
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        required
                      />
                      <label className='form-check-label' htmlFor='form2Example3c'>
                        I agree to all statements in <Link to='/terms'>Terms of service</Link>
                      </label>
                    </div>
                    <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
                      <button type='submit' className='btn btn-primary'>
                        Register
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleVerificationSubmit}>
                    <div className='d-flex flex-row align-items-center mb-4'>
                      <FontAwesomeIcon icon='fa-solid fa-envelope' className='me-3' />
                      <div className='flex-fill mb-0'>
                        <input
                          type='text'
                          id='verificationCode'
                          className='form-control'
                          placeholder='Verification Code'
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
                      <button type='submit' className='btn btn-primary'>
                        Verify Email
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
            <div className='col-md-9 col-lg-6 col-xl-5 offset-xl-1'>
              <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp' className='img-fluid' alt='Sample image' />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
