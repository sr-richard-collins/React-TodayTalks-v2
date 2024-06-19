import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSelectCategory } from "../actions/categoryAction";
import { fetchCategories } from "../actions/categoryAction";
import { Helmet } from "react-helmet";

import logo from "../assets/img/logo/Today_Talks_Logo2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IMAGE_BASE_URL } from "../config";
import axios from "../config";
import Spotlight from "../views/Spotlight";

const Header = () => {
  const dispatch = useDispatch();
  const { setting } = useSelector((state) => state.setting);
  const { categories, selectCategory } = useSelector(
    (state) => state.categories
  );
  const [activeLink, setActiveLink] = useState("home");
  const [showSubMenu, setShowSubMenu] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
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

  const handleViewMoreHover = () => {
    setShowSubMenu(true);
    // debugger;
  };

  const handleViewMoreLeave = () => {
    setShowSubMenu(false);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
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
            <div className="col-lg-9">
              <div className="header-top-left-four">
                <div className="swiper-container ta-trending-slider">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div>
                        <span className="trending-content-date">
                          <FontAwesomeIcon icon="fa-regular fa-calendar" />{" "}
                          February 12, 2024
                        </span>
                      </div>
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
            <div className="col-lg-3">
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
              <Link to="/">
                <img src={IMAGE_BASE_URL + setting.site_logo} alt="logo" className="logo-style" />
              </Link>
            </div>
            <div className="col-10">
              <div>
                <div className="menu-wrap">
                  <nav className="menu-nav">
                    <div className="navbar-wrap main-menu d-none d-lg-flex">
                      <ul className="navigation">
                          <li
                            className={
                              (selectCategory ? selectCategory : activeLink) ===
                              "home"
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
                        {categories.length > 8 &&
                          categories.slice(0, 7).map((category) => (
                            <li
                              key={category.id}
                              className={
                                (selectCategory
                                  ? selectCategory
                                  : activeLink) === category.name
                                  ? "active"
                                  : ""
                              }
                            >
                                <Link
                                  to={`/news/${category.data_query}`}
                                  onClick={() => handleLinkClick(category.name)}
                                >
                                  {category.name}
                                </Link>
                            </li>
                          ))}
                        <li>
                          <Link
                            to="#"
                            onMouseEnter={handleViewMoreHover}
                            onMouseLeave={handleViewMoreLeave}
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="nav-bar-link"
                          >
                            View More{" "}
                            <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
                          </Link>
                          <ul className="sub-menu dropdown-content">
                            {showDropdown &&
                              categories.slice(7).map((category) => (
                                <li
                                  className={
                                    activeLink === category.name ? "active" : ""
                                  }
                                  key={category.id}
                                >
                                    <Link
                                      key={category.id}
                                      to={`/news/${category.data_query}`}
                                      onClick={() => handleLinkClick(category.name)}
                                    >
                                      {category.name}
                                    </Link>
                                </li>
                              ))}
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
