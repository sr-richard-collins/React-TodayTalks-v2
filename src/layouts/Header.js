import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSelectCategory } from '../actions/categoryAction';
import { fetchCategories } from '../actions/categoryAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IMAGE_BASE_URL } from '../config';
import googleplayimg from '../assets/img/icon/googleplay.png';
import { AuthContext } from '../provider/AuthContext';

const Header = () => {
  const context = useContext(AuthContext);
  const { user, logout } = context;

  const dispatch = useDispatch();
  const { setting } = useSelector((state) => state.setting);
  const { categories, selectCategory } = useSelector((state) => state.categories);
  const [activeLink, setActiveLink] = useState('home');
  const [showToggleSubMenu, setShowToggleSubMenu] = useState(false);
  const [showToggleSubCategory, setShowToggleSubCategory] = useState(false);
  const [showToggleMenu, setShowToggleMenu] = useState(false);
  // const [activeCategory, setActiveCategory] = useState([[null, false],]);
  const [activeCategory, setActiveCategory] = useState({ category: null, show: false });
  const moreCategories = categories.filter((category) => category.position === 'more');
  const mainCategories = categories.filter((category) => category.position === 'main');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    dispatch(fetchSelectCategory(link));
    // setShowToggleSubMenu(false);
    setShowToggleMenu(false);
  };

  const handleMenuToggleOpenClick = () => {
    setShowToggleMenu(!showToggleMenu);
  };
  const handleMenuToggleCloseClick = () => {
    setShowToggleMenu(false);
  };

  const handleShowToggleSubMenu = () => {
    // debugger;
    setShowToggleSubMenu(!showToggleSubMenu);
  };

  return (
    <header className='header-style-six'>
      <div className='header-top-wrap-four'>
        <div className='row align-items-center'>
          <div className='col-3'>
            <div className='header-top-left-four'>
              <div className='swiper-container ta-trending-slider'>
                <div className='swiper-wrapper'>
                  <div className='swiper-slide'>
                    <Link to='/'>
                      <img
                        src={setting.site_logo !== undefined ? IMAGE_BASE_URL + setting.site_logo : '../assets/Today_Talks_Logo.png'}
                        alt='logo'
                        className='logo-style'
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-3'></div>
          <div className='col-6' style={{ alignItems: 'end' }}>
            <div className='header-top-social header-top-social-two'>
              <ul className='list-wrap'>
                <li className='social-icons'>
                  <span>
                    <Link to={setting.social_fb} target='blank'>
                      <FontAwesomeIcon icon='fa-brands fa-facebook-f' />
                    </Link>
                  </span>
                </li>
                <li className='social-icons'>
                  <span>
                    <Link to={setting.social_twitter} target='blank'>
                      <FontAwesomeIcon icon='fa-brands fa-twitter' />
                    </Link>
                  </span>
                </li>
                <li className='social-icons'>
                  <span>
                    <Link to={setting.social_insta} target='blank'>
                      <FontAwesomeIcon icon='fa-brands fa-instagram' />
                    </Link>
                  </span>
                </li>
                <li className='social-icons'>
                  <span>
                    <Link to={setting.social_linkedin} target='blank'>
                      <FontAwesomeIcon icon='fa-brands fa-linkedin' />
                    </Link>
                  </span>
                </li>
                <li className='social-icons'>
                  <span>
                    <Link to={setting.social_youtube} target='blank'>
                      <FontAwesomeIcon icon='fa-brands fa-youtube' />
                    </Link>
                  </span>
                </li>

                {user ? (
                  <>
                    <span>{user.name}</span>
                    <button onClick={logout} className='btn'>
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to='/login' className='btn'>
                      Log In
                    </Link>
                    <Link to='/register' className='btn'>
                      Register
                    </Link>
                  </>
                )}
              </ul>
            </div>
            <div className='mobile-nav-toggler'>
              <Link to='#' onClick={handleMenuToggleOpenClick} className='nav-bar-link'>
                <FontAwesomeIcon icon='fas fa-bars' />
              </Link>
            </div>
            {showToggleMenu && (
              <div
                className='mobile-menu'
                onMouseLeave={handleMenuToggleCloseClick}
              >
                <nav className='menu-box'>
                  <div className='menu-outer'>
                    <ul className='navigation'>
                      <li>
                        <div className='close-btn' onClick={handleMenuToggleCloseClick}>
                          <FontAwesomeIcon icon='fas fa-times' />
                        </div>
                        <Link to='/'>
                          <img src={setting.site_logo !== undefined ? IMAGE_BASE_URL + setting.site_logo : '../assets/Today_Talks_Logo.png'} alt='logo' />
                        </Link>
                      </li>
                      <li className={(selectCategory ? selectCategory : activeLink) === 'home' ? 'active' : ''}>
                        <Link to='/' onClick={() => handleLinkClick('home')} className='nav-bar-link'>
                          Home
                        </Link>
                      </li>

                      {mainCategories.map((category, index) => (
                        <li className={(selectCategory ? selectCategory : activeLink) === category.name ? 'active' : ''} key={index}>
                          {!category.child ? (
                            <Link to={`/news/${category.data_query}`}
                              onClick={() => handleLinkClick(category.name)}
                              className='nav-bar-link' key={category.id}>
                              {category.name}
                            </Link>
                          ) : (
                            <>
                              <Link
                                onClick={() => {
                                  setActiveCategory((prevActiveCategory) => ({
                                    category: category.name,
                                    show: prevActiveCategory.category !== category.name ? true : !prevActiveCategory.show
                                  }));
                                }}
                                className='nav-bar-link' >
                                {category.name} <FontAwesomeIcon icon='fa-solid fa-chevron-down' />
                              </Link>
                              {activeCategory.category === category.name && (
                                <ul className='sub-menu' style={{ display: activeCategory.show ? 'block' : 'none' }}>
                                  {
                                    category.child.map((subCategory) => (
                                      <li key={subCategory.id} className={activeLink === subCategory.name ? 'active' : ''}>
                                        <Link
                                          key={subCategory.id}
                                          to={`/news/${subCategory.data_query}`}
                                          onClick={() => handleLinkClick(subCategory.name)}
                                          className='nav-bar-link'
                                        >
                                          {subCategory.name}
                                        </Link>
                                      </li>
                                    ))}
                                </ul>
                              )
                              }
                            </>
                          )}
                        </li>
                      ))}
                      <li>
                        <Link onClick={handleShowToggleSubMenu} className='nav-bar-link'>
                          View More <FontAwesomeIcon icon='fa-solid fa-chevron-down' />
                        </Link>
                        <ul className='sub-menu' style={{ display: 'block' }}>
                          {showToggleSubMenu &&
                            moreCategories.map((category) => (
                              <li key={category.id} className={activeLink === category.name ? 'active' : ''}>
                                <Link
                                  onClick={() => handleLinkClick(category.name)}
                                  className='nav-bar-link'
                                >
                                  {category.name} <FontAwesomeIcon icon='fa-solid fa-chevron-down' />
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className='row left-menu-store'>
                    <Link to='https://play.google.com/store/' className='my-2'>
                      {' '}
                      <img src={googleplayimg} />{' '}
                    </Link>
                    <div className='left-menu-social mb-10'>
                      <ul className='list-wrap row justify-content-center'>
                        <li className='social-icons col'>
                          <span>
                            <Link to={setting.social_fb} target='blank'>
                              <FontAwesomeIcon icon='fa-brands fa-facebook-f' />
                            </Link>
                          </span>
                        </li>
                        <li className='social-icons col'>
                          <span>
                            <Link to={setting.social_twitter} target='blank'>
                              <FontAwesomeIcon icon='fa-brands fa-twitter' />
                            </Link>
                          </span>
                        </li>
                        <li className='social-icons col'>
                          <span>
                            <Link to={setting.social_insta} target='blank'>
                              <FontAwesomeIcon icon='fa-brands fa-instagram' />
                            </Link>
                          </span>
                        </li>
                        <li className='social-icons col'>
                          <span>
                            <Link to={setting.social_linkedin} target='blank'>
                              <FontAwesomeIcon icon='fa-brands fa-linkedin' />
                            </Link>
                          </span>
                        </li>
                        <li className='social-icons col'>
                          <span>
                            <Link to={setting.social_youtube} target='blank'>
                              <FontAwesomeIcon icon='fa-brands fa-youtube' />
                            </Link>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className='row'>
                    <span className='mt-2 left-menu-footer mb-10'>
                      {' '}
                      <Link to={'/about'}>About Us &middot; </Link>
                      <Link to={'/about'}>Privacy Policy</Link>
                    </span>
                  </div>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div >
    </header >
  );
};

export default Header;
