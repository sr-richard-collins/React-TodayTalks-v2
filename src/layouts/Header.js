import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSelectCategory } from "../actions/categoryAction";
import { fetchCategories } from "../actions/categoryAction";
import { Helmet } from "react-helmet";

import logo from "../assets/img/logo/Today_Talks_Logo2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IMAGE_BASE_URL } from "../config/config";
import axios from "../axiosConfig";
import Spotlight from "../views/Spotlight";

const Header = () => {
  const dispatch = useDispatch();
  const { categories, selectCategory } = useSelector((state) => state.categories);
  const [activeLink, setActiveLink] = useState("home");
  const [setting, setSetting] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const moreCategories = categories.filter(
    (category) => category.position === "more"
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const fetchSetting = async () => {
      const response = await axios.get(`/api/user/setting`);
      setSetting(response.data);
    };
    fetchSetting();
  }, []);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    dispatch(fetchSelectCategory(link));
  };
  
  const handleDropdownHover = () => {
    setShowDropdown(true);
  };

  const handleDropdownLeave = () => {
    setShowDropdown(false);
  };

  const getCurrentDate = () => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date().toLocaleDateString("en-US", options);
  };

  return (
    <header className="header-style-six">
      <div id="header-fixed-height"></div>
      <div className="header-top-wrap-four">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="header-top-left-four">
                <div className="trending-box">
                  <div className="icon">
                    <img src="assets/img/icon/trending_icon.svg" alt="" />
                  </div>
                  <span>Trending</span>
                  <div className="shape">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 122 36"
                      preserveAspectRatio="none"
                      fill="none"
                    >
                      <path
                        d="M0 18C0 8.05888 8.05887 0 18 0H110L121.26 16.8906C121.708 17.5624 121.708 18.4376 121.26 19.1094L110 36H18C8.05888 36 0 27.9411 0 18Z"
                        fill="url(#trending_shape)"
                      />
                      <defs>
                        <linearGradient
                          id="trending_shape"
                          x1="12"
                          y1="36"
                          x2="132"
                          y2="36"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stopColor="#3F6088" />
                          <stop
                            offset="1"
                            stopColor="#2A4970"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="swiper-container ta-trending-slider">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div className="trending-content">
                        <a href="blog-details.html">
                          Here area brands and designers to look out for next
                          year 2023
                        </a>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="trending-content">
                        <a href="blog-details.html">
                          Here area brands and designers to look out for next
                          year 2023
                        </a>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="trending-content">
                        <a href="blog-details.html">
                          Here area brands and designers to look out for next
                          year 2023
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="header-top-social header-top-social-two">
                <h5 className="title">Follow Us:</h5>
                <ul className="list-wrap">
                  <li>
                    <a href={setting.social_fb} target="blank">
                      <FontAwesomeIcon icon="fa-brands fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a href={setting.social_twitter} target="blank">
                      <FontAwesomeIcon icon="fa-brands fa-x-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href={setting.social_insta} target="blank">
                      <FontAwesomeIcon icon="fa-brands fa-instagram" />
                    </a>
                  </li>
                  <li>
                    <a href={setting.social_linkedin} target="blank">
                      <FontAwesomeIcon icon="fa-brands fa-linkedin" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="sticky-header" className="menu-area menu-style-six">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <a>
                <img
                  src={IMAGE_BASE_URL + setting.site_logo}
                  alt="logo"
                  className="logo-style"
                />
              </a>
            </div>
            <div className="col-8">
              <div className="menu-wrap">
                <nav className="menu-nav">
                  <div className="navbar-wrap main-menu d-none d-lg-flex">
                    <ul className="navigation">
                      <li className={(selectCategory ? selectCategory : activeLink)  === "home" ? "active" : ""}>
                        <Link to="/" onClick={() => handleLinkClick("home")}>
                          Home
                        </Link>
                      </li>
                      {categories.map((category) =>
                        category.position === "main" ? (
                          <li
                            key={category.id}
                            className={
                              (selectCategory ? selectCategory : activeLink) === category.name ? "active" : ""
                            }
                          >
                            <Link
                              to={`/news/${category.data_query}`}
                              onClick={() => handleLinkClick(category.name)}
                            >
                              {category.name}
                            </Link>
                          </li>
                        ) : (
                          ""
                        )
                      )}
                      <li
                        className={`nav-item dropdown dropdown-hover ${
                          showDropdown ? "show" : ""
                        }`}
                        onMouseEnter={handleDropdownHover}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <Link
                          to="#"
                          className="nav-link dropdown-toggle btn-link"
                          id="moreCategoriesDropdown"
                          role="button"
                          aria-expanded={showDropdown ? "true" : "false"}
                        >
                          More Categories
                        </Link>
                        <div
                          className={`dropdown-menu ${
                            showDropdown ? "show" : ""
                          }`}
                          aria-labelledby="moreCategoriesDropdown"
                        >
                          {moreCategories.map((category) => (
                            <Link
                              key={category.id}
                              to={`/news/${category.data_query}`}
                              className="dropdown-item"
                              onClick={() => handleLinkClick(category.name)}
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>

            <div className="col-2">
              <span className="date">
                <FontAwesomeIcon icon="fa-regular fa-calendar" />
                {getCurrentDate()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
