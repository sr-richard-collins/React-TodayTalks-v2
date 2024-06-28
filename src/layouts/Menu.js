import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSelectCategory } from '../actions/categoryAction';
import { fetchCategories } from '../actions/categoryAction';
import googleplayimg from '../assets/img/icon/googleplay.png';
import leftMenuImg from "../assets/img/blog/g_categories_img01.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IMAGE_BASE_URL } from '../config';

const Menu = () => {
  const dispatch = useDispatch();
  const { setting } = useSelector((state) => state.setting);
  const { categories, selectCategory } = useSelector((state) => state.categories);
  const [activeLink, setActiveLink] = useState('home');
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [showDropleft, setShowDropleft] = useState(false);
  const [showMoreSubCategory, setMoreSubCategory] = useState(false);
  const [showToggleSubMenu, setShowToggleSubMenu] = useState(false);
  const [showToggleMenu, setShowToggleMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const moreCategories = categories.filter((category) => category.position === 'more');
  const mainCategories = categories.filter((category) => category.position === 'main');

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
  const handleShowSubCategory = () => {
    setShowSubCategory(false);
  };
  const handleSportsSubCategory = () => {
    setMoreSubCategory(false);
  };
  const handleViewMoreEnter = () => {
    setShowDropleft(true);
  };

  const handleMenuToggleOpenClick = () => {
    setShowToggleMenu(true);
  };
  const handleMenuToggleCloseClick = () => {
    setShowToggleMenu(false);
  };

  const handleShowToggleSubMenu = () => {
    setShowToggleMenu(true);
    setShowToggleSubMenu(!showToggleSubMenu);
  };

  const handleCategoryClick = (categoryName) => {
    if (activeCategory === categoryName) {
      setActiveCategory(null); // Toggle off if already active
    } else {
      setActiveCategory(categoryName); // Set active category
    }
  };

  const handleCategoryMouseEnter = (categoryName) => {
    setActiveCategory(categoryName);
  };

  const handleCategoryMouseLeave = () => {
    setActiveCategory(null);
  };

  const handleLinkMouseEnter = (category) => {
    if (!category.child) {
      setActiveCategory(null);
    }
  };

  const getCurrentDate = () => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <>
      <div className='left-sub-menu'>
        <div className='row left-menu-content'>
          <ul className='dropdown-content mb-10'>
            <li className={(selectCategory ? selectCategory : activeLink) === 'home' ? 'active' : ''}>
              <Link to='/' onClick={() => handleLinkClick('home')} className='nav-bar-link'>
                <FontAwesomeIcon icon="fa-solid fa-house" className='img-icon-left-menu rounded-circle mx-2' />
                Home
              </Link>
            </li>
            {mainCategories.map((category) => (
              <>
                <li key={category.id} className={(selectCategory ? selectCategory : activeLink) === category.name ? 'active' : ''}>
                  {!category.child ? (
                    <Link
                      to={`/news/${category.data_query}`}
                      onClick={() => handleLinkClick(category.name)}
                      className='nav-bar-link'
                      key={category.id}
                      onMouseEnter={() => handleLinkMouseEnter(category)}
                    >
                      {category.name}
                    </Link>
                  ) : (
                    <>
                      <div className='category-link-with-dropdown' onMouseLeave={handleCategoryMouseLeave}
                      onClick={() => handleCategoryClick(category.name)}>
                        <Link
                          to={`/news/${category.data_query}`}
                          onMouseEnter={() => handleCategoryMouseEnter(category.name)}
                          
                          className='nav-bar-link'
                          key={category.id}
                        >
                          <div className='col-95'>
                            <img className='img-icon-left-menu rounded-circle mx-2'
                              src={leftMenuImg} />
                            {category.name}
                          </div>
                          <div className='col-05'>
                            <FontAwesomeIcon icon={['fas', 'chevron-right']} />
                          </div>
                        </Link>

                        {activeCategory === category.name && (
                          <ul className='left-menu-dropleft sub-category dropdown-content show-dropleft' onMouseLeave={handleCategoryMouseLeave}>
                            {category.child &&
                              category.child.map((subCategory) => (
                                <li
                                  key={subCategory.id}
                                  className={activeLink === subCategory.name ? 'active' : ''}
                                  onMouseOver={(e) => e.currentTarget.classList.add('hovered')}
                                  onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')}
                                >
                                  <Link
                                    to={`/news/${subCategory.data_query}`}
                                    onClick={() => handleLinkClick(subCategory.name)}
                                    onMouseEnter={() => setActiveLink(subCategory.name)}
                                  >
                                    {subCategory.name}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                    </>
                  )}
                </li>
              </>
            ))}
            {moreCategories.length ? (
              <li>
                <Link to='#' onMouseEnter={() => setShowDropleft(!showDropleft)} className='nav-bar-link'>
                  View More
                  <FontAwesomeIcon icon='fa-solid fa-chevron-right' className='mx-2' />
                </Link>
                <ul
                  className={`left-menu-dropleft view-more dropdown-content ${showDropleft ? 'show-dropleft' : ''}`}
                  onMouseLeave={() => setShowDropleft(!showDropleft)}
                >
                  {moreCategories.map((category) => (
                    <li className={activeLink === category.name ? 'active' : ''} key={category.id}>
                      {!category.child ? (
                        <Link
                          key={category.id}
                          to={`/news/${category.data_query}`}
                          onClick={() => handleLinkClick(category.name)}
                          className='nav-bar-link'
                          onMouseEnter={() => handleLinkMouseEnter(category)}
                        >
                          {category.name}
                        </Link>
                      ) : (
                        <>
                          <div className='category-link-with-moredropdown'>
                            <Link to={`/news/${category.data_query}`} onMouseEnter={() => handleCategoryMouseEnter(category.name)} className='nav-bar-link'>
                              {category.name}
                            </Link>
                            <FontAwesomeIcon icon='fa-solid fa-chevron-right' className='mx-2' style={{ justifyContent: 'end' }} />
                            {activeCategory === category.name && (
                              <ul className={`left-menu-dropleft sports-sub-category dropdown-content show-dropleft`} onMouseLeave={handleCategoryMouseLeave}>
                                {category.child.map((moreSubCategory) => (
                                  <li
                                    className={activeLink === moreSubCategory.name ? 'active' : ''}
                                    key={moreSubCategory.id}
                                    onMouseOver={(e) => e.currentTarget.classList.add('hovered')}
                                    onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')}
                                  >
                                    <Link
                                      to={`/news/${moreSubCategory.data_query}`}
                                      onClick={() => handleLinkClick(moreSubCategory.name)}
                                      onMouseEnter={() => setActiveLink(moreSubCategory.name)}
                                    >
                                      {moreSubCategory.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              ''
            )}
          </ul>
        </div>
        <div className='row left-menu-store'>
          <Link to='https://play.google.com/store/' className='mb-10'>
            {' '}
            <img src={googleplayimg} />{' '}
          </Link>
        </div>
        <div className='row'>
          <span className='mt-2 left-menu-footer mb-10'>
            {' '}
            <Link to={'/about'}>About Us &middot; </Link>
            <Link to={'/about'}>Privacy Policy</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Menu;
