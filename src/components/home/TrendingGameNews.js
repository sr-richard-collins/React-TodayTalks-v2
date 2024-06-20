import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../../config/';
import { IMAGE_BASE_URL } from '../../config';
import Loader from '../Loader';
import { fetchSelectCategory } from '../../actions/categoryAction';

const TrendingGameNewsSection = () => {
  const dispatch = useDispatch();
  const [popularPosts, setPopularPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      const response = await axios.get(`/api/user/popularPosts`);
      setPopularPosts(response.data);
      setLoading(false);
    };

    fetchTrendingPosts();
  }, []);

  const handleViewClick = (name) => {
    dispatch(fetchSelectCategory(name));
  };

  // if (loading) return <Loader />;

  return (
    <section className='video-post-area video-post-bg' data-background='assets/img/bg/video_post_bg.jpg'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            {popularPosts.length !== 0 ? (
              <div className='section-title-wrap-three mb-40'>
                <div className='section-title-three black-title'>
                  <h6 className='title'>
                    Trending Gaming News
                    <span className='section-title-svg'>
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 246 40' fill='none' preserveAspectRatio='none'>
                        <path
                          d='M10.1448 2.85061C10.6524 1.15867 12.2097 0 13.9761 0H241.624C244.303 0 246.225 2.58294 245.455 5.14939L235.855 37.1494C235.348 38.8413 233.79 40 232.024 40H4.37612C1.69667 40 -0.225117 37.4171 0.544817 34.8506L10.1448 2.85061Z'
                          fill='currentcolor'
                        />
                      </svg>
                    </span>
                  </h6>
                  <div className='section-title-line-three'></div>
                </div>
                <div className='view-all-btn'>
                  {popularPosts.length !== 0 ? (
                    <Link to={`/spotlight/${'trending'}`} className='link-btn' onClick={() => handleViewClick('trending')}>
                      View All
                      <span className='svg-icon'>
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' fill='none'>
                          .................................................................................................
                          <path d='M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z' fill='currentColor' />
                          <path d='M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z' fill='currentColor' />
                        </svg>
                      </span>
                    </Link>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-8'>
            {popularPosts.length !== 0 ? (
              <div className='sports-post'>
                <div className='sports-post-thumb'>
                  <Link to={`/${popularPosts[0].seo_slug}`} className='link-btn'>
                    <img src={IMAGE_BASE_URL + popularPosts[0].img} alt='' />
                  </Link>
                  {/* <a
                    href="https://www.youtube.com/watch?v=1iIZeIy7TqM"
                    className="play-btn popup-video"
                  >
                    <FontAwesomeIcon icon="fa-solid fa-play" />
                  </a> */}
                </div>
                <div className='sports-post-content'>
                  <Link
                    to={`/news/${popularPosts[0].category_data_query}`}
                    className='post-tag-four'
                    onClick={() => handleViewClick(popularPosts[0].category_name)}
                  >
                    {popularPosts[0].category_name}
                  </Link>
                  <h4 className='post-title bold-underline'>
                    <Link to={`/${popularPosts[0].seo_slug}`}>{popularPosts[0].title}</Link>
                  </h4>
                  <div className='blog-post-meta'>
                    <ul className='list-wrap'>
                      {/* <li>
                          <i className="flaticon-user"></i>by
                          <a href="author.html">{popularPosts[0].user_name}</a>
                        </li> */}
                      <li>
                        <i className='flaticon-calendar'></i>
                        {new Date(popularPosts[0].created_at).toLocaleDateString()}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className='col-lg-4'>
            <div className='sidebar-wrap sidebar-wrap-four'>
              {popularPosts.slice(1).map((post, index) => (
                <div className='horizontal-post-four horizontal-post-five' key={post.id}>
                  <div className='horizontal-post-thumb-four'>
                    <Link to={`/${post.seo_slug}`} className='link-btn'>
                      <img src={IMAGE_BASE_URL + post.img} alt='' />
                    </Link>
                  </div>
                  <div className='horizontal-post-content-four'>
                    <Link to={`/news/${post.category_data_query}`} className='post-tag-four' onClick={() => handleViewClick(post.category_name)}>
                      {popularPosts[0].category_name}
                    </Link>
                    <h4 className='post-title'>
                      <Link to={`/${post.seo_slug}`}>{post.title}</Link>
                    </h4>
                    <div className='blog-post-meta'>
                      <ul className='list-wrap'>
                        <li>
                          <i className='flaticon-calendar'></i>
                          {new Date(popularPosts[0].created_at).toLocaleDateString()}
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
  );
};

export default TrendingGameNewsSection;
