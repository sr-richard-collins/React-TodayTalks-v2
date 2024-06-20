import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../../config";
import { IMAGE_BASE_URL } from "../../config";
import { fetchSelectCategory } from "../../actions/categoryAction";

const SpotLightSection = () => {
  const dispatch = useDispatch();
  const [spotIndex, setSpotIndex] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [spotlight, setSpotlight] = useState([]);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      const resSpotlight = await axios.get(`/api/user/spotlight`);
      setSpotlight(resSpotlight.data);
    };

    fetchTrendingPosts();
  }, []);

  const handlePageClick = (index) => {
    window.scrollTo(0, 0);
    setActivePage(index);
    setSpotIndex(index); // Assuming setSpotIndex is defined elsewhere
  };

  const handleViewClick = (name) => {
    dispatch(fetchSelectCategory(name));
  };

  return (
    <>
      {spotlight.length && (
        <div className="spotlight-post-item-wrap">
          <div className="section-title-wrap-three mb-20">
            <div className="section-title-three">
              <h6 className="title">
                Today’s Spotlight
                <span className="section-title-svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 246 40"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M10.1448 2.85061C10.6524 1.15867 12.2097 0 13.9761 0H241.624C244.303 0 246.225 2.58294 245.455 5.14939L235.855 37.1494C235.348 38.8413 233.79 40 232.024 40H4.37612C1.69667 40 -0.225117 37.4171 0.544817 34.8506L10.1448 2.85061Z"
                      fill="currentcolor"
                    />
                  </svg>
                </span>
              </h6>
              <div className="section-title-line-three"></div>
            </div>
            <div className="view-all-btn mb-4">
              <Link
                to={`/spotlight/${"spotlight"}`}
                className="link-btn"
                onClick={() => handleViewClick("spotlight")}
              >
                View All
                <span className="svg-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                      fill="currentColor"
                    />
                    <path
                      d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
          <div className="row">
            {[
              ...Array(
                (spotIndex + 1) * 5 < spotlight.length
                  ? 5
                  : spotlight.length - spotIndex * 5
              ),
            ].map((_, index) => (
              <div className="row" key={index}>
                <div className="col-57">
                  <div className="spotlight-post big-post">
                    <div className="spotlight-post-thumb">
                      <Link
                        to={`/${spotlight[spotIndex * 5 + index].seo_slug}`}
                      >
                        <img
                          src={
                            IMAGE_BASE_URL +
                            spotlight[spotIndex * 5 + index].img
                          }
                          alt=""
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-43">
                  <div className="weekly-post-content">
                    <Link
                      to={`/news/${
                        spotlight[spotIndex * 5 + index].category_data_query
                      }`}
                      className="post-tag"
                      onClick={() =>
                        handleViewClick(
                          spotlight[spotIndex * 5 + index].category_name
                        )
                      }
                    >
                      {spotlight[spotIndex * 5 + index].category_name}
                    </Link>
                    <h2 className="post-title">
                      <Link
                        to={`/${spotlight[spotIndex * 5 + index].seo_slug}`}
                      >
                        {spotlight[spotIndex * 5 + index].title}
                      </Link>
                    </h2>
                    <div className="blog-post-meta">
                      <ul className="list-wrap">
                        <li>
                          <i className="flaticon-calendar"></i>
                          {new Date(
                            spotlight[spotIndex * 5 + index].created_at
                          ).toLocaleDateString()}
                        </li>
                      </ul>
                    </div>
                    <p>{spotlight[spotIndex * 5 + index].subTitle}</p>
                    <div className="view-all-btn mb-4">
                      <Link
                        to={`/${spotlight[spotIndex * 5 + index].seo_slug}`}
                        className="link-btn"
                      >
                        Read More
                        <span className="svg-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 10 10"
                            fill="none"
                          >
                            <path
                              d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                              fill="currentColor"
                            />
                            <path
                              d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="pagination-wrap mt-40">
              <nav aria-label="Page navigation example">
                <ul className="pagination list-wrap">
                  {[...Array(Math.ceil(spotlight.length / 5))].map(
                    (_, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          activePage === index ? "active" : ""
                        }`}
                      >
                        <p
                          key={index}
                          className="page-link"
                          onClick={() => handlePageClick(index)}
                        >
                          {index + 1}
                        </p>
                      </li>
                    )
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SpotLightSection;
