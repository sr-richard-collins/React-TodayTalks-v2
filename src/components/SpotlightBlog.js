import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "../axiosConfig";
import { IMAGE_BASE_URL } from "../config/config";
import CustomPagination from "./CustomPagination";

const SpotlightBlog = ({ title }) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      let response;
      if (title === "spotlight")
        response = await axios.get(`/api/user/pagenationSpotlightPosts`, {
          params: {
            currentPage: currentPage,
            postsPerPage,
          },
        });
      else
        response = await axios.get(`/api/user/pagenationTrendingPosts`, {
          params: {
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
    };
    fetch();
  }, [title, currentPage, postsPerPage]);

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handlePerPageChange = (event) => {
    setPostsPerPage(event.target.value);
    setCurrentPage(1); // Reset to the first page
  };
  return (
    <>
      {posts.length ? (
        <section className="blog-area pt-60 pb-60">
          <div className="container">
            <div className="author-inner-wrap blog-inner-wrap">
              <div className="row justify-content-center">
                <div className="section-title-wrap mb-30">
                  <div className="section-title">
                    <h2 className="title">{title}</h2>
                  </div>
                  <div className="view-all-btn"></div>
                  <div className="section-title-line"></div>
                </div>
                <div className="category-content">
                  <div className="row">
                    {posts.map((post) => (
                      <div key={post.id} className="col-md-4 mb-4">
                        <div className="col">
                          <Link to={`/blog-details/${post.title}`}>
                            <img
                              src={IMAGE_BASE_URL + post.img}
                              alt={post.title}
                            />
                          </Link>
                        </div>
                        <div className="horizontal-post-content-four col">
                          <Link
                            to={`/blog-details/${post.id}`}
                            className="post-tag-four text-lines-4"
                          >
                            {post.title}
                          </Link>
                          <div className="blog-post-meta">
                            <ul className="list-wrap">
                              <li>
                                <FontAwesomeIcon icon="fa-regular fa-calendar" />{" "}
                                {new Date(post.created_at).toLocaleDateString()}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Pagination controls */}

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
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default SpotlightBlog;
