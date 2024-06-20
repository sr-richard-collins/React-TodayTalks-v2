import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSelectCategory } from '../actions/categoryAction';
import { fetchCategories } from '../actions/categoryAction';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IMAGE_BASE_URL } from '../config';

const Header = () => {
  const dispatch = useDispatch();
  const { setting } = useSelector((state) => state.setting);
  const { categories, selectCategory } = useSelector((state) => state.categories);
  const [activeLink, setActiveLink] = useState('home');
  const [showSubMenu, setShowSubMenu] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showToggleSubMenu, setShowToggleSubMenu] = useState(false);
  const [showToggleMenu, setShowToggleMenu] = useState(false);
  const moreCategories = categories.filter((category) => category.position === 'more');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    dispatch(fetchSelectCategory(link));
  };

  const handleMobileLinkClick = (link) => {
    setActiveLink(link);
    setShowToggleMenu(!showToggleMenu);
    dispatch(fetchSelectCategory(link));
  };

  const handleViewMoreHover = () => {
    setShowSubMenu(true);
    // debugger;
  };

  const handleViewMoreLeave = () => {
    setShowSubMenu(false);
  };

  const handleMenuToggleOpenClick = () => {
    setShowToggleMenu(!showToggleMenu);
  };
  const handleMenuToggleCloseClick = () => {
    setShowToggleMenu(!showToggleMenu);
  };

  const handleShowToggleSubMenu = () => {
    setShowToggleSubMenu(!showToggleSubMenu);
  };

  const getCurrentDate = () => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <header className='header-style-six'>
      <div id='header-fixed-height'></div>
      <div className='header-top-wrap-four'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-9 col-md-6 col-sm-6'>
              <div className='header-top-left-four'>
                <div className='swiper-container ta-trending-slider'>
                  <div className='swiper-wrapper'>
                    <div className='swiper-slide'>
                      <span className='trending-content-date'>
                        <FontAwesomeIcon icon='fa-regular fa-calendar' /> February 12, 2024
                      </span>
                      {/* <div className="trending-content">
                        <a href="blog-details.html">
                          Here area brands and designers to look out for next
                          year 2023
                        </a>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-md-6'>
              <div className='header-top-social header-top-social-two'>
                <h5 className='title'>Follow Us:</h5>
                <ul className='list-wrap'>
                  <li>
                    <Link to={setting.social_fb} target='blank'>
                      <FontAwesomeIcon icon='fa-brands fa-facebook-f' />
                    </Link>
                  </li>
                  <li>
                    <Link to={setting.social_twitter} target='blank'>
                      <FontAwesomeIcon icon='fa-brands fa-x-twitter' />
                    </Link>
                  </li>
                  <li>
                    <Link to={setting.social_insta} target='blank'>
                      <FontAwesomeIcon icon='fa-brands fa-instagram' />
                    </Link>
                  </li>
                  <li>
                    <Link to={setting.social_linkedin} target='blank'>
                      <FontAwesomeIcon icon='fa-brands fa-linkedin' />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='sticky-header' className='menu-area menu-style-six'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-2 col-md-3 col-3'>
              <Link to='/'>
                <img src={IMAGE_BASE_URL + setting.site_logo} alt='logo' className='logo-style' />
              </Link>
            </div>
            <div className='col-lg-10 col-md-9 col-9'>
              <div>
                <div className='menu-wrap'>
                  <nav className='menu-nav'>
                    <div className='navbar-wrap main-menu d-none d-lg-flex'>
                      <ul className='navigation'>
                        <li className={(selectCategory ? selectCategory : activeLink) === 'home' ? 'active' : ''}>
                          <Link to='/' onClick={() => handleLinkClick('home')} className='nav-bar-link'>
                            Home
                          </Link>
                        </li>
                        {categories.length > 8 &&
                          categories.slice(0, 7).map((category) => (
                            <li key={category.id} className={(selectCategory ? selectCategory : activeLink) === category.name ? 'active' : ''}>
                              <Link to={`/news/${category.data_query}`} onClick={() => handleLinkClick(category.name)} className='nav-bar-link'>
                                {category.name}
                              </Link>
                            </li>
                          ))}
                        <li>
                          <Link
                            to='#'
                            onMouseEnter={handleViewMoreHover}
                            onMouseLeave={handleViewMoreLeave}
                            onClick={() => setShowDropdown(!showDropdown)}
                            className='nav-bar-link'
                          >
                            View More
                            <FontAwesomeIcon icon='fa-solid fa-chevron-down' />
                          </Link>
                          <ul className='sub-menu dropdown-content'>
                            {showDropdown &&
                              categories.slice(7).map((category) => (
                                <li className={activeLink === category.name ? 'active' : ''} key={category.id}>
                                  <div>
                                    <Link key={category.id} to={`/news/${category.data_query}`} onClick={() => handleLinkClick(category.name)}>
                                      {category.name}
                                    </Link>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </nav>
                  <div className='mobile-nav-toggler'>
                    <Link to='#' onClick={handleMenuToggleOpenClick} className='nav-bar-link'>
                      <FontAwesomeIcon icon='fas fa-bars' />
                    </Link>
                  </div>
                </div>
                {showToggleMenu && (
                  <div className='mobile-menu' onMouseLeave={handleMenuToggleCloseClick}>
                    <nav className='menu-box'>
                      <div className='close-btn'>
                        <Link to='#' onClick={handleMenuToggleCloseClick} className='nav-bar-link'>
                          <FontAwesomeIcon icon='fas fa-times' />
                        </Link>
                      </div>
                      <div className='nav-logo'>
                        <Link to='/'>
                          <img src={IMAGE_BASE_URL + setting.site_logo} alt='logo' />
                        </Link>
                      </div>
                      <div className='menu-outer'>
                        <ul className='navigation'>
                          <li className={(selectCategory ? selectCategory : activeLink) === 'home' ? 'active' : ''}>
                            <Link to='/' onClick={() => handleMobileLinkClick('home')} className='nav-bar-link'>
                              Home
                            </Link>
                          </li>
                          {categories.slice(0, 7).map((category, index) => (
                            <li className={(selectCategory ? selectCategory : activeLink) === category.name ? 'active' : ''} key={index}>
                              <Link
                                to={`/news/${category.data_query}`}
                                onClick={() => handleMobileLinkClick(category.name)}
                                className='nav-bar-link'
                                key={category.id}
                              >
                                {category.name}
                              </Link>
                            </li>
                          ))}
                          <li className='menu-item-has-children nav-bar-link'>
                            <Link to={`/`} onClick={handleShowToggleSubMenu}>
                              View More <FontAwesomeIcon icon='fa-solid fa-chevron-down' />
                            </Link>
                            <ul className='sub-menu' style={{ display: 'block' }}>
                              {showToggleSubMenu &&
                                categories.slice(7).map((category) => (
                                  <li key={category.id} className={(selectCategory ? selectCategory : activeLink) === category.name ? 'active' : ''}>
                                    <Link key={category.id} to={`/news/${category.data_query}`} onClick={() => handleMobileLinkClick(category.name)}>
                                      {category.name}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          </li>
                        </ul>
                      </div>

                      <div className='social-links'>
                        <ul className='clearfix list-wrap'>
                          <li>
                            <Link to={setting.social_fb} target='blank'>
                              <FontAwesomeIcon icon='fa-brands fa-facebook-f' />
                            </Link>
                          </li>
                          <li>
                            <Link to={setting.social_twitter} target='blank'>
                              <FontAwesomeIcon icon='fa-brands fa-x-twitter' />
                            </Link>
                          </li>
                          <li>
                            <Link to={setting.social_insta} target='blank'>
                              <FontAwesomeIcon icon='fa-brands fa-instagram' />
                            </Link>
                          </li>
                          <li>
                            <Link to={setting.social_linkedin} target='blank'>
                              <FontAwesomeIcon icon='fa-brands fa-linkedin' />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
