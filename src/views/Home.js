import React, { useState, useEffect, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Blog from "../components/Blog";
import Newsletter from "../components/Newsletter";
import CryptoCurrency from "../components/CryptoCurrency";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodaySpotlight } from "../actions/postAction";
import { fetchCategories } from "../actions/categoryAction";
import { Link } from "react-router-dom";
import axios from "../axiosConfig";
import { IMAGE_BASE_URL } from "../config/config";
import { Helmet } from "react-helmet";
import Loader from "../components/Loader";

const Home = (props) => {
  const [popularPosts, setPopularPosts] = useState([]);
  const [spotIndex, setSpotIndex] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [categories, setCategories] = useState([]);
  const [spotlight, setSpotlight] = useState([]);
  const [seo, setSeo] = useState([]);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      const response = await axios.get(`/api/user/popularPosts`);
      const resCategory = await axios.get("/api/user/homePagecategories");
      const resSpotlight = await axios.get(`/api/user/spotlight`);
      const resSeo = await axios.get(`/api/user/seoSetting`);
      setSeo(resSeo.data);
      setPopularPosts(response.data);
      setCategories(resCategory.data);
      setSpotlight(resSpotlight.data);
    };

    fetchTrendingPosts();
  }, []);

  const handlePageClick = (index) => {
    setActivePage(index);
    setSpotIndex(index); // Assuming setSpotIndex is defined elsewhere
  };

  return (
    <>
      <div>
        <Helmet>
          <title>{"title"}</title>
          <meta property="og:title" content={seo.seo_title} />
          <meta name="keywords" content={seo.seo_keyword} />
          <meta name="description" content={seo.seo_description} />
        </Helmet>
        {!spotlight.length ? (
          <>
            <Loader />
          </>
        ) : (
          <Suspense
            fallback={
              <>
                <Loader />
              </>
            }
          >
            <section className="spotlight-post-area pt-70 pb-60">
              <div className="spotlight-post-inner-wrap">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-70">
                      {spotlight && spotlight.length ? (
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
                            <div className="view-all-btn">
                              <Link
                                to={`/spotlight/${"spotlight"}`}
                                className="link-btn"
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
                              <div className="row">
                                <div className="col-57">
                                  <div className="spotlight-post big-post">
                                    <div className="spotlight-post-thumb">
                                      <Link
                                        to={`/blog-details/${
                                          spotlight[spotIndex * 5 + index].title
                                        }`}
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
                                        spotlight[spotIndex * 5 + index]
                                          .category_name
                                      }`}
                                      className="post-tag"
                                    >
                                      {
                                        spotlight[spotIndex * 5 + index]
                                          .category_name
                                      }
                                    </Link>
                                    <h2 className="post-title">
                                      <Link
                                        to={`/blog-details/${
                                          spotlight[spotIndex * 5 + index].title
                                        }`}
                                      >
                                        {spotlight[spotIndex * 5 + index].title}
                                      </Link>
                                    </h2>
                                    <div className="blog-post-meta">
                                      <ul className="list-wrap">
                                        <li>
                                          <i className="flaticon-calendar"></i>
                                          {new Date(
                                            spotlight[
                                              spotIndex * 5 + index
                                            ].created_at
                                          ).toLocaleDateString()}
                                        </li>
                                      </ul>
                                    </div>
                                    <p>
                                      {
                                        spotlight[spotIndex * 5 + index]
                                          .subTitle
                                      }
                                    </p>
                                    <div className="view-all-btn">
                                      <Link
                                        to={`/blog-details/${
                                          spotlight[spotIndex * 5 + index].title
                                        }`}
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
                                  {[
                                    ...Array(Math.ceil(spotlight.length / 5)),
                                  ].map((_, index) => (
                                    <li
                                      key={index}
                                      className={`page-item ${
                                        activePage === index ? "active" : ""
                                      }`}
                                    >
                                      <a
                                        key={index}
                                        className="page-link"
                                        onClick={() => handlePageClick(index)}
                                      >
                                        {index + 1}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </nav>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="spotlight-post-item-wrap">
                        {categories.map((category) => (
                          <Blog
                            title={category.name}
                            key={category.id}
                            isHomepage={1}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="col-30">
                      <CryptoCurrency />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section
              className="video-post-area video-post-bg"
              data-background="assets/img/bg/video_post_bg.jpg"
            >
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="section-title-wrap-three mb-40">
                      <div className="section-title-three black-title">
                        <h6 className="title">
                          Trending Gaming News
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
                      <div className="view-all-btn">
                        {popularPosts.length !== 0 ? (
                          <Link
                            to={`/spotlight/${"trending"}`}
                            className="link-btn"
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
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    {popularPosts.length !== 0 ? (
                      <div className="video-post-item big-post">
                        <div className="video-post-thumb">
                          <Link
                            to={`/blog-details/${popularPosts[0].title}`}
                            className="link-btn"
                          >
                            <img
                              src={IMAGE_BASE_URL + popularPosts[0].img}
                              alt=""
                            />
                          </Link>
                          <a
                            href="https://www.youtube.com/watch?v=1iIZeIy7TqM"
                            className="play-btn popup-video"
                          >
                            <FontAwesomeIcon icon="fa-solid fa-play" />
                          </a>
                        </div>
                        <div className="video-post-content">
                          <Link
                            to={`/news/${popularPosts[0].category_name}`}
                            className="post-tag post-tag-three"
                          >
                            {popularPosts[0].category_name}
                          </Link>
                          <h2 className="post-title bold-underline">
                            <a href="blog-details.html">
                              {popularPosts[0].subTitle}
                            </a>
                          </h2>
                          <div className="blog-post-meta white-blog-meta">
                            <ul className="list-wrap">
                              {/* <li>
                          <i className="flaticon-user"></i>by
                          <a href="author.html">{popularPosts[0].user_name}</a>
                        </li> */}
                              <li>
                                <i className="flaticon-calendar"></i>
                                {new Date(
                                  popularPosts[0].created_at
                                ).toLocaleDateString()}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-lg-6">
                    <div className="video-small-post-wrap">
                      {popularPosts.slice(1).map((post, index) => (
                        <div className="video-post-item small-post" key={index}>
                          <div className="video-post-thumb">
                            <Link
                              to={`/blog-details/${post.title}`}
                              className="link-btn"
                            >
                              <img src={IMAGE_BASE_URL + post.img} alt="" />
                            </Link>
                            <a
                              href="https://www.youtube.com/watch?v=1iIZeIy7TqM"
                              className="play-btn popup-video"
                            >
                              <FontAwesomeIcon icon="fa-solid fa-play" />
                            </a>
                          </div>
                          <div className="video-post-content">
                            <a
                              href="blog.html"
                              className="post-tag post-tag-three"
                            >
                              {post.category_name}
                            </a>
                            <h2 className="post-title">
                              <a href="blog-details.html">{post.title}</a>
                            </h2>
                            <div className="blog-post-meta white-blog-meta">
                              <ul className="list-wrap">
                                {/* <li>
                            <i className="flaticon-user"></i>by
                            <a href="author.html">{post.user_name}</a>
                          </li> */}
                                <li>
                                  <i className="flaticon-calendar"></i>
                                  {new Date(
                                    post.created_at
                                  ).toLocaleDateString()}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <Newsletter />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default Home;
