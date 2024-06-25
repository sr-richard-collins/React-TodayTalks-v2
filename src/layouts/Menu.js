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
  const [activeLink, setActiveLink] = useState("home");
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [showDropleft, setShowDropleft] = useState(false);
  const [showSportsSubCategory, setShowSportsSubCategory] = useState(false);
  const [showToggleSubMenu, setShowToggleSubMenu] = useState(false);
  const [showToggleMenu, setShowToggleMenu] = useState(false);
  const moreCategories = categories.filter(
    (category) => category.position === "more"
  );

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
    setShowSportsSubCategory(false);
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

  const getCurrentDate = () => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date().toLocaleDateString("en-US", options);
  };

  return (
    <>
      <div className='left-sub-menu'>
        <div className="container">
          <div className="row left-menu-content">
            <ul className="dropdown-content mb-10" >
              <li
                className={
                  (selectCategory ? selectCategory : activeLink) === "home"
                    ? "active"
                    : ""
                }
              >
                <Link
                  to="/"
                  onClick={() => handleLinkClick("home")}
                  className="nav-bar-link"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => setShowSubCategory(!showSubCategory)}
                  className="nav-bar-link"
                >
                  Categories
                  <FontAwesomeIcon icon='fa-solid fa-chevron-right' className='mx-2' />
                </Link>
                <ul className={`left-menu-dropleft sub-category dropdown-content ${showSubCategory ? 'show-dropleft' : ''}`} onMouseLeave={handleShowSubCategory}>
                  {categories.slice(0, 3).map((category) => (
                    <li
                      className={activeLink === category.name ? "active" : ""}
                      key={category.id}
                    >
                      <Link
                        key={category.id}
                        to={`/news/${category.data_query}`}
                        onClick={() => handleLinkClick(category.name)}
                        className="nav-bar-link"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {categories.length > 8 &&
                categories.slice(0, 7).map((category) => (
                  <li
                    key={category.id}
                    className={
                      (selectCategory ? selectCategory : activeLink) ===
                        category.name
                        ? "active"
                        : ""
                    }
                  >
                    <Link
                      to={`/news/${category.data_query}`}
                      onClick={() => handleLinkClick(category.name)}
                      className="nav-bar-link"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              <li>
                <Link
                  to="#"
                  onClick={() => setShowDropleft(!showDropleft)}
                  className="nav-bar-link"
                >
                  View More
                  <FontAwesomeIcon icon='fa-solid fa-chevron-right' className='mx-2' />
                </Link>
                <ul className={`left-menu-dropleft view-more dropdown-content ${showDropleft ? 'show-dropleft' : ''}`} onMouseLeave={handleViewMoreLeave}>
                  {categories.slice(7).map((category) => (
                    <li
                      className={activeLink === category.name ? "active" : ""}
                      key={category.id}
                    >
                      <Link
                        key={category.id}
                        to={`/news/${category.data_query}`}
                        onClick={() => handleLinkClick(category.name)}
                        className="nav-bar-link"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      to="#"
                      onClick={() => setShowSportsSubCategory(!showSportsSubCategory)}
                      className="nav-bar-link"
                    >
                      Sports
                      <FontAwesomeIcon icon='fa-solid fa-chevron-right' className='mx-2' />
                    </Link>
                    <ul className={`left-menu-dropleft sports-sub-category dropdown-content ${showSportsSubCategory ? 'show-dropleft' : ''}`} onMouseLeave={handleSportsSubCategory}>
                      {categories.slice(0,2).map((category) => (
                        <li
                          className={activeLink === category.name ? "active" : ""}
                          key={category.id}
                        >
                          <Link
                            key={category.id}
                            to={`/news/${category.data_query}`}
                            onClick={() => handleLinkClick(category.name)}
                            className="nav-bar-link"
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="row left-menu-store">
            <Link to="https://play.google.com/store/" className="mb-10"> <img src={googleplayimg} /> </Link>
          </div>
          <div className="row">
            <span className="mt-2 left-menu-footer mb-10"> <Link to={'/about'}>About Us &middot; </Link><Link to={'/about'}>Privacy Policy</Link></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;