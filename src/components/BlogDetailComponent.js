import React, { useState, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IMAGE_BASE_URL } from "../config/config";
import { Helmet } from "react-helmet";
import axios from "../axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";

const BlogDetailComponent = ({ post }) => {
  const {setting} = useSelector((state) => state.setting);
  const [seo, setSeo] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`/api/user/seoPost?id=${post.id}`);
      setSeo(response.data);
    };
    fetch();
  }, [post]);



  const handleFacebookShare = () => {
    const currentUrl = window.location.href;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(shareUrl, '_blank');
  };

  const handleTwitterShare = () => {
    const currentUrl = window.location.href;
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`;
    window.open(shareUrl, '_blank');
  };

  const handleTelegramShare = () => {
    const currentUrl = window.location.href;
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}`;
    window.open(shareUrl, '_blank');
  };

  const handleLinkedInShare = () => {
    const currentUrl = window.location.href;
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
    window.open(shareUrl, '_blank');
  };
  
  return (
    <>
      <Helmet>
        <title>{"title"}</title>
        <meta property="og:title" content={seo.seo_title} />
        <meta name="keywords" content={seo.seo_keyword} />
        <meta name="description" content={seo.seo_description} />
      </Helmet>
      <section className="blog-details-area pt-60 pb-60">
        <div className="container">
          <div className="author-inner-wrap">
            <div className="row justify-content-center">
              <div className="col-70">
                <div className="blog-details-wrap">
                  <div className="blog-details-content">
                    <div className="blog-details-content-top">
                      <a className="post-tag">
                        {post.category_name}
                      </a>
                      <h2 className="title">{post.title}</h2>
                      <div className="bd-content-inner">
                        <div className="blog-post-meta">
                          <ul className="list-wrap">
                            {/* <li>
                              <FontAwesomeIcon icon="fa-regular fa-user" />
                              by<Link to="author.html">{post.user_name}</Link>
                            </li> */}
                            <li>
                              <FontAwesomeIcon icon="fa-regular fa-calendar" />
                              {new Date(post.created_at).toLocaleDateString()}
                            </li>
                            {/* <li>
                              <FontAwesomeIcon icon="fa-regular fa-comment" />
                              <Link to="blog-details.html">05 Comments</Link>
                            </li> */}
                          </ul>
                        </div>
                        <div className="blog-details-social">
                          <ul className="list-wrap">
                            <li>
                              <Link onClick={handleFacebookShare}>
                                <FontAwesomeIcon icon="fa-brands fa-facebook-f" />
                              </Link>
                            </li>
                            <li>
                              <Link onClick={handleTwitterShare}>
                                <FontAwesomeIcon icon="fa-brands fa-x-twitter" />
                              </Link>
                            </li>
                            <li>
                              <Link  onClick={handleTelegramShare}>
                                <FontAwesomeIcon icon="fa-brands fa-telegram" />
                              </Link>
                            </li>
                            <li>
                              <Link onClick={handleLinkedInShare}>
                                <FontAwesomeIcon icon="fa-brands fa-linkedin" />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="blog-details-thumb">
                      <img src={IMAGE_BASE_URL + post.img} alt="" />
                    </div>
                    <div
                      dangerouslySetInnerHTML={{ __html: post.description }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-30"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailComponent;
