import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import post02 from "../assets/img/blog/2.jpg";
import post03 from "../assets/img/blog/3.jpg";
import post06 from "../assets/img/blog/6.jpg";

const BlogDetailComponent = ({post}) => {

    return (
        <>
            <section className="blog-details-area pt-60 pb-60">
                <div className="container">
                    <div className="author-inner-wrap">
                        <div className="row justify-content-center">
                            <div className="col-70">
                                <div className="blog-details-wrap">
                                    <div className="blog-details-content">
                                        <div className="blog-details-content-top">
                                            <a href="blog.html" className="post-tag">Appitizer</a>
                                            <h2 className="title">{post.title}</h2>
                                            <div className="bd-content-inner">
                                                <div className="blog-post-meta">
                                                    <ul className="list-wrap">
                                                        <li><FontAwesomeIcon icon="fa-regular fa-user" />by<Link to="author.html">Admin</Link></li>
                                                        <li><FontAwesomeIcon icon="fa-regular fa-calendar" />{post.created_at}</li>
                                                        <li><FontAwesomeIcon icon="fa-regular fa-comment" /><Link to="blog-details.html">05 Comments</Link></li>
                                                    </ul>
                                                </div>
                                                <div className="blog-details-social">
                                                    <ul className="list-wrap">
                                                        <li><Link to="/"><FontAwesomeIcon icon="fa-brands fa-facebook-f" /></Link></li>
                                                        <li><Link to="/"><FontAwesomeIcon icon="fa-brands fa-x-twitter" /></Link></li>
                                                        <li><Link to="/"><FontAwesomeIcon icon="fa-brands fa-instagram" /></Link></li>
                                                        <li><Link to="/"><FontAwesomeIcon icon="fa-brands fa-linkedin" /></Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="blog-details-thumb">
                                            <img src={"http://localhost:8000/images/" + post.img} alt="" />
                                        </div>
                                        <div dangerouslySetInnerHTML={{ __html: post.description }} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-30">

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BlogDetailComponent;
