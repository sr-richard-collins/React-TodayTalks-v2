import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSelectCategory } from '../actions/categoryAction';
import { fetchCategories } from '../actions/categoryAction';
import googleplayimg from '../assets/img/icon/googleplay.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IMAGE_BASE_URL } from '../config';

const Menu = () => {
  const dispatch = useDispatch();
  const { setting } = useSelector((state) => state.setting);
  const { categories, selectCategory } = useSelector(
    (state) => state.categories
  );
  const [activeLink, setActiveLink] = useState('home');

  const [showDropleft, setShowDropleft] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    dispatch(fetchSelectCategory(link));
  };

  const handleViewMoreLeave = () => {
    setShowDropleft(false);
  };

  return (
    <header className='header-style-six'>
      <div id='header-fixed-height'></div>
      <div id='sticky-left-menu' className='left-sub-menu'>
        <div className='sticky-logo-container'>
          <img id='sticky-logo' src={IMAGE_BASE_URL + setting.site_logo} alt='logo' />
        </div>
        <div className='container'>
          <div className='row left-menu-content'>
            <ul className='dropdown-content mb-10' >
              <li className={ (selectCategory ? selectCategory : activeLink) === 'home' ? 'active' : '' } >
                <Link to='/' onClick={() => handleLinkClick('home')} className='nav-bar-link' >
                  Home
                </Link>
              </li>
              {categories.length > 8 &&
                categories.slice(0, 7).map((category) => (
                  <li
                    key={category.id}
                    className={ (selectCategory ? selectCategory : activeLink) === category.name ? 'active' : '' }
                  >
                    <Link to={`/news/${category.data_query}`} onClick={() => handleLinkClick(category.name)} className='nav-bar-link' >
                      {category.name}
                    </Link>
                  </li>
                ))}
              <li>
                <Link to='#' onClick={() => setShowDropleft(!showDropleft)} className='nav-bar-link' >
                  View More
                  <FontAwesomeIcon icon='fa-solid fa-chevron-right' className='mx-2' />
                </Link>
                <ul className={`left-menu-dropleft dropdown-content ${showDropleft ? 'show-dropleft' : ''}`}  onMouseLeave={handleViewMoreLeave}>
                    {categories.slice(7).map((category) => (
                      <li className={activeLink === category.name ? 'active' : ''} key={category.id} >
                        <Link key={category.id} to={`/news/${category.data_query}`} onClick={() => handleLinkClick(category.name)} className='nav-bar-link' >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
            </ul>
          </div>
          <div className='row left-menu-store'>
            <Link to='https://play.google.com/store/' className='mb-10'><img src={googleplayimg} /></Link>
            <div className='left-menu-social social-container mb-10'>
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
                  <span >
                    <Link to={setting.social_youtube} target='blank'>
                      <FontAwesomeIcon icon='fa-brands fa-youtube' />
                    </Link>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className='row'>
            <span className='mt-2 left-menu-footer mb-10'> <Link to={'/about'}>About Us &middot; </Link><Link to={'/about'}>Privacy Policy</Link></span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Menu;
