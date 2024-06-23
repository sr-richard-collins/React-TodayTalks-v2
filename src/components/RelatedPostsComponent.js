import React, { useState, useEffect, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../config";
import axios from "../config/";

const RelatedPostsComponent = ({ posts }) => {
  return (
    <>
      <section className="today-post-area pt-20">
        <div className="container">
          <div className="section-title-wrap">
            <div className="section-title section-title-four">
              <h2 className="title">Related Posts</h2>
              <div className="section-title-line"></div>
            </div>
          </div>
          <div className="today-post-wrap">
            <div className="row gutter-40 justify-content-center">
              {posts.map((post, index) => (
                <div className="col-lg-12 col-md-12" key={index}>
                  <div className="banner-post-five banner-post-seven">
                    <div className="banner-post-thumb-five">
                      <Link to={`/${post.seo_slug}`}>
                        <img
                          src={IMAGE_BASE_URL + post.img}
                          alt={post.title}
                        />
                      </Link>
                    </div>
                    <div className="banner-post-content-five">
                      <Link to={`/news/${post.category_data_query}`} className="post-tag-four">
                        {post.category_name}
                      </Link>
                      <h2 className="post-title">
                        <Link to={`/${post.seo_slug}`}>{post.title}</Link>
                      </h2>
                      <div className="blog-post-meta">
                        <ul className="list-wrap my-3">
                          <li>
                            <FontAwesomeIcon icon="fa-regular fa-calendar" />
                            {new Date(post.created_at).toLocaleDateString()}
                          </li>
                          <li>
                            <span className="homeblog-link-icon-phone">
                              <Link to='/'><FontAwesomeIcon icon="fa-solid fa-phone" /></Link>
                            </span>
                            <span className="homeblog-link-icon-facebook">
                              <Link to='/'><FontAwesomeIcon icon="fa-brands fa-facebook-f" /></Link>
                            </span>
                            <span className="homeblog-link-icon-twitter">
                              <Link to='/'><FontAwesomeIcon icon="fa-brands fa-twitter" /></Link>
                            </span>
                          </li>
                          <li>
                            <div className='view-all-btn'>
                              <Link to={`/`} className='homeblog-link-btn'>
                                Read More
                                <span className='svg-icon'>
                                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' fill='none'>
                                    <path d='M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z' fill='currentColor' />
                                    <path d='M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z' fill='currentColor' />
                                  </svg>
                                </span>
                              </Link>
                            </div>
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
