import React, { useState, useEffect, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../config";
import { fetchSelectCategory } from "../actions/categoryAction";
import { useDispatch, useSelector } from "react-redux";

const HomeBlog = ({ title }) => {
  const dispatch = useDispatch();
  const { homePosts } = useSelector((state) => state.posts);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const response = homePosts.find((post) => post.category === title);
      if (response) setPosts(response.posts);
    };
    fetch();
  }, [title]);

  const handleViewClick = (name) => {
    dispatch(fetchSelectCategory(name));
  };

  return (
    <>
      {posts.length ? (
        <section className="editor-post-area pt-50 pb-30">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title-wrap mb-30">
                  <div className="section-title">
                    <h2 className="title">{posts[0].category.name}</h2>
                  </div>
                  <div className="view-all-btn">
                    <Link
                      to={`/news/${posts[0].category.data_query}`}
                      className="link-btn"
                      onClick={() => handleViewClick(posts[0].category.name)}
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
                  <div className="section-title-line"></div>
                </div>
              </div>
            </div>
            {[...Array(Math.ceil(posts.length / 3))].map((_, index) => (
              <div className="editor-post-wrap" key={index}>
                <div className="row editor-post-active">
                  {posts
                    .slice(
                      index * 3,
                      index * 3 + 3 < posts.length
                        ? index * 3 + 3
                        : posts.length
                    )
                    .map((post) => (
                      <div className="col-lg-4 mb-3" key={post.id}>
                        <div className="editor-post-item">
                          <div className="editor-post-thumb">
                            <Link to={`/${post.seo_slug}`}>
                              <img
                                src={IMAGE_BASE_URL + post.img}
                                alt={post.title}
                              />
                            </Link>
                          </div>
                          <div className="editor-post-content">
                            <h2 className="post-title">
                              <Link to={`/${post.seo_slug}`}>{post.title}</Link>
                            </h2>
                            <div className="blog-post-meta">
                              <ul className="list-wrap">
                                <li>
                                  <FontAwesomeIcon icon="fa-regular fa-calendar" />{" "}
                                  {new Date(
                                    post.created_at
                                  ).toLocaleDateString()}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default HomeBlog;
