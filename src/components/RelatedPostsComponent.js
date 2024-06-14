import React from "react";
// import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import post05 from "../assets/img/blog/5.jpg";
import post06 from "../assets/img/blog/6.jpg";
import post07 from "../assets/img/blog/7.jpg";

const RelatedPostsComponent = ({ posts }) => {
  return (
    <>
      <section className="today-post-area pt-50">
        <div className="container">
          <div className="section-title-wrap">
            <div className="section-title section-title-four">
              <h2 className="title">Related Posts</h2>
              <div className="section-title-line"></div>
            </div>
          </div>
          <div className="today-post-wrap">
            <div className="row gutter-40 justify-content-center">
              {posts.map((post) => (
                <div className="col-lg-4 col-md-6">
                  <div className="banner-post-five banner-post-seven">
                    <div className="banner-post-thumb-five">
                      <a href="blog-details.html">
                        <img
                          src={"http://localhost:8000/images/" + post.img}
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="banner-post-content-five">
                      <a href="blog.html" className="post-tag-four">
                        {post.category_name}
                      </a>
                      <h2 className="post-title">
                        <a href="blog-details.html">
                          {post.title}
                        </a>
                      </h2>
                      <div className="blog-post-meta">
                        <ul className="list-wrap">
                          <li>
                            <FontAwesomeIcon icon="fa-regular fa-user" />
                            by<a href="author.html">{post.user_name}</a>
                          </li>
                          <li>
                            <FontAwesomeIcon icon="fa-regular fa-calendar" />
                            {new Date(post.created_at).toLocaleDateString()}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RelatedPostsComponent;
