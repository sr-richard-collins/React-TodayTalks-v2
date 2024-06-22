import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSelectCategory } from "../actions/categoryAction";
import { fetchCategories } from "../actions/categoryAction";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IMAGE_BASE_URL } from "../config";

const Header = () => {
  const dispatch = useDispatch();
  const { setting } = useSelector((state) => state.setting);
  const { categories, selectCategory } = useSelector(
    (state) => state.categories
  );
  const [activeLink, setActiveLink] = useState("home");
  const [showSubMenu, setShowSubMenu] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);
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
    setShowToggleSubMenu(false);
    setShowToggleMenu(false);
  };

  const handleViewMoreHover = () => {
    setShowSubMenu(true);
    // debugger;
  };

  const handleViewMoreLeave = () => {
    setShowSubMenu(false);
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
    <header className="header-style-six">
      <div id="header-fixed-height"></div>
      <div className="header-top-wrap-four">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-9 col-md-6 col-sm-6">
              <div className="header-top-left-four">
                <div className="swiper-container ta-trending-slider">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div className="col-lg-6 col-md-6">
                        <Link to="/">
                          <img
                            src={IMAGE_BASE_URL + setting.site_logo}
                            alt="logo"
                            className="logo-style"
                          />
                        </Link>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-10">
                        <span className="trending-content-date">
                          <FontAwesomeIcon icon="fa-regular fa-calendar" />{" "}
                          February 12, 2024
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="header-top-social header-top-social-two">
                <h5 className="title">Follow Us:</h5>
                <ul className="list-wrap">
                  <li>
                    <span><Link to={setting.social_fb} target="blank">
                      <FontAwesomeIcon icon="fa-brands fa-facebook-f" />
                    </Link></span>
                  </li>
                  <li>
                  <span><Link to={setting.social_twitter} target="blank">
                      <FontAwesomeIcon icon="fa-brands fa-x-twitter" />
                    </Link></span>
                  </li>
                  <li>
                  <span><Link to={setting.social_insta} target="blank">
                      <FontAwesomeIcon icon="fa-brands fa-instagram" />
                    </Link></span>
                  </li>
                  <li>
                  <span><Link to={setting.social_linkedin} target="blank">
                      <FontAwesomeIcon icon="fa-brands fa-linkedin" />
                    </Link></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
