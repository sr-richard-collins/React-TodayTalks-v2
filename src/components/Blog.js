import React, { useState, useEffect, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "../axiosConfig";
import { IMAGE_BASE_URL } from "../config/config";
import CustomPagination from "./CustomPagination";
import Loader from "./Loader";
import { fetchSelectCategory } from "../actions/categoryAction";
import { useDispatch, useSelector } from "react-redux";

const Blog = ({ title, isHomepage }) => {
  const dispatch = useDispatch();
  const { homePosts } = useSelector((state) => state.posts)
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      let response;
      if (isHomepage === 1) {
        response = homePosts.find(post => post.category === title)
        if (response)
          setPosts(response.posts);
      } else {
        const response = await axios.get(`/api/user/pagenationPosts`, {
          params: {
            category: title,
            currentPage: currentPage,
            postsPerPage,
          },
        });
        if (postsPerPage === "all") {
          setPosts(response.data);
          setTotalPosts(response.data.length);
        } else {
          setPosts(response.data.data);
          setTotalPosts(response.data.total);
        }
      }
      setLoading(false);
    };
    fetch();
  }, [title, currentPage, postsPerPage]);

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handlePerPageChange = (event) => {
    setPostsPerPage(event.target.value);
    setCurrentPage(1); // Reset to the first page
  };

  const handleViewClick = (name) => {
    dispatch(fetchSelectCategory(name));
  }

  if (loading && isHomepage === 0) {
    return <Loader />;
  }

  return (
    <>
      <Suspense
        fallback={
          <>
            <Loader />
          </>
        }
      >
        {posts.length ? (
          <section className="blog-area pt-60 pb-60">
            <div className="container">
              <div className="author-inner-wrap blog-inner-wrap">
                <div className="row justify-content-center">
                  <div className="section-title-wrap mb-30">
                    <div className="section-title">
                      <h2 className="title">{title}</h2>
                    </div>
                    {isHomepage === 1 && (
                      <div className="view-all-btn">
                        <div className="view-all-btn">
                          <Link
                            to={`/news/${posts[0].category_data_query}`}
                            className="link-btn"
                            onClick={()=>handleViewClick(posts[0].category_name)}
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
                    )}

                    <div className="section-title-line"></div>
                  </div>
                  <div className="category-content">
                    <div className="row">
                      {posts.map((post) => (
                        <div key={post.id} className="col-md-4 mb-4">
                          <div className="col">
                            <Link to={`/${post.seo_slug}`}>
                              <img
                                src={IMAGE_BASE_URL + post.img}
                                alt={post.title}
                              />
                            </Link>
                          </div>
                          <div className="horizontal-post-content-four col">
                            <Link
                              to={`/=${post.id}`}
                              className="post-tag-four text-lines-4"
                            >
                              {post.title}
                            </Link>
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
                      ))}
                    </div>
                    {/* Pagination controls */}
                    {isHomepage === 0 ? (
                      <>
                        <CustomPagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={handlePageChange}
                        />
                        <form className="form-inline ml-3">
                          <label htmlFor="per_page" className="mr-2">
                            Show:
                          </label>
                          <select
                            name="per_page"
                            id="per_page"
                            className="form-control"
                            value={postsPerPage}
                            onChange={handlePerPageChange}
                          >
                            <option value="10">10/page</option>
                            <option value="20">20/page</option>
                            <option value="all">All</option>
                          </select>
                        </form>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          isHomepage === 0 && (
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                fontFamily: "Arial, sans-serif",
                fontSize: "90px",
              }}
            >
              No Posts
            </p>
          )
        )}
      </Suspense>
    </>
  );
};

export default Blog;
