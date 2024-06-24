import React, { useState, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IMAGE_BASE_URL } from "../config";
import { Helmet } from "react-helmet";
import axios from "../config";
import { useDispatch, useSelector } from "react-redux";

const CommentComponent = ({ post }) => {
  const { setting } = useSelector((state) => state.setting);
  const [seo, setSeo] = useState([]);

  // useEffect(() => {
  //   const fetch = async () => {
  //     const response = await axios.get(`/api/user/seoPost?id=${post.id}`);
  //     setSeo(response.data);
  //   };
  //   fetch();
  // }, [post]);

  // const handleFacebookShare = () => {
  //   const currentUrl = window.location.href;
  //   const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
  //     currentUrl
  //   )}`;
  //   window.open(shareUrl, "_blank");
  // };

  // const handleTwitterShare = () => {
  //   const currentUrl = window.location.href;
  //   const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
  //     currentUrl
  //   )}`;
  //   window.open(shareUrl, "_blank");
  // };

  // const handleTelegramShare = () => {
  //   const currentUrl = window.location.href;
  //   const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
  //     currentUrl
  //   )}`;
  //   window.open(shareUrl, "_blank");
  // };

  // const handleLinkedInShare = () => {
  //   const currentUrl = window.location.href;
  //   const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
  //     currentUrl
  //   )}`;
  //   window.open(shareUrl, "_blank");
  // };

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta property="og:title" content={seo.seo_title} />
        <meta name="keywords" content={seo.seo_keyword} />
        <meta name="description" content={seo.seo_description} />
      </Helmet>
      <section className="blog-details-area pt-60 pb-60">
        <div className="container">
          <div className="author-inner-wrap">
            <div className="row justify-content-center">
              <div >
                <div className="blog-details-wrap">
                  <div class="comments-wrap">
                    <h3 class="comments-wrap-title">Comments</h3>
                    <div class="latest-comments">
                      <ul class="list-wrap">
                        <li>
                          <div class="comments-box">
                            <div class="comments-avatar">
                              <img src="assets/img/images/comment01.png" alt="img"/>
                            </div>
                            <div class="comments-text">
                              <div class="avatar-name">
                                <h6 class="name">Alebary keon</h6>
                                <span class="date">27 August, 2024</span>
                              </div>
                              <p>Finanappreciate your trust greatly Our clients choose dentace ducts because know we are the best area Awaitingare really.</p>
                              <a href="#" class="reply-btn">Reply</a>
                            </div>
                          </div>
                          <ul class="children">
                            <li>
                              <div class="comments-box">
                                <div class="comments-avatar">
                                  <img src="assets/img/images/comment02.png" alt="img"/>
                                </div>
                                <div class="comments-text">
                                  <div class="avatar-name">
                                    <h6 class="name">Lukas Javeb</h6>
                                    <span class="date">27 August, 2024</span>
                                  </div>
                                  <p>Finanappreciate your trust greatly Our clients choose dentace ducts because know we are the best area Awaitingare really.</p>
                                  <a href="#" class="reply-btn">Reply</a>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="comment-respond">
                    <h3 class="comment-reply-title">Post a comment</h3>
                    <form action="#" class="comment-form">
                      <p class="comment-notes">Your email address will not be published. Required fields are marked *</p>
                      <div class="form-grp">
                        <textarea name="comment" placeholder="Comment"></textarea>
                      </div>
                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-grp">
                            <input type="text" placeholder="Name"/>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-grp">
                            <input type="email" placeholder="Email"/>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-grp">
                            <input type="url" placeholder="Website"/>
                          </div>
                        </div>
                      </div>
                      <div class="form-grp checkbox-grp">
                        <input type="checkbox" />
                          <label for="checkbox_two">Save my name, email, and website in this browser for the next time I comment.</label>
                      </div>
                      <button type="submit" class="btn btn-two">Post Comment</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CommentComponent;
