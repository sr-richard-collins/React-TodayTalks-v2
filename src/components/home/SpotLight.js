import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NoPost from '../../views/error/No_post';
import axios from '../../config';
import { IMAGE_BASE_URL, DEFAULT_POST } from '../../config';
import { fetchSelectCategory } from '../../actions/categoryAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import $ from 'jquery'; // Import jQuery
import 'bootstrap'; // Import Bootstrap JavaScript

const SpotLightSection = () => {
  const dispatch = useDispatch();
  const { setting } = useSelector((state) => state.setting);
  const [spotIndex, setSpotIndex] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [spotlight, setSpotlight] = useState([]);
  const [clickedBlogArticleIconId, setClickedBlogArticleIconId] = useState([]);
  const [noPost, setNoPost] = useState(0);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      const resSpotlight = await axios.get(`/api/user/spotlight`);
      setSpotlight(resSpotlight.data);
      setNoPost(1);
    };

    fetchTrendingPosts();
  }, []);

  const handlePageClick = (index) => {
    window.scrollTo(0, 0);
    setActivePage(index);
    setSpotIndex(index); // Assuming setSpotIndex is defined elsewhere
  };
  const handleBlogArticleHeartClick = (linkId) => {
    if (clickedBlogArticleIconId.includes(linkId)) {
      setClickedBlogArticleIconId(clickedBlogArticleIconId.filter((id) => id !== linkId));
    } else {
      setClickedBlogArticleIconId([...clickedBlogArticleIconId, linkId]);
    }
  };

  const handleViewClick = (name) => {
    dispatch(fetchSelectCategory(name));
  };

  return (
    <>
      {spotlight.length ? (
        <div className='spotlight-post-item-wrap'>
          <div className='section-title-wrap-three mb-20'>
            <div className='section-title-three'>
              <h6 className='title'>
                Today’s Spotlight
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
            <div className='view-all-btn mb-4'>
              <Link to={`/spotlight/${'spotlight'}`} className='link-btn' onClick={() => handleViewClick('spotlight')}>
                View All
                <span className='svg-icon'>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' fill='none'>
                    <path d='M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z' fill='currentColor' />
                    <path d='M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z' fill='currentColor' />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
          {/* <div className="row"> */}
          {[...Array(spotlight.length)].map((_, index) => (
            <div className='row' key={index}>
              <div className='spotlight-post big-post'>
                <div className='spotlight-post-thumb'>
                  <Link to={`/${spotlight[index].category_type === 'news' ? 'news_detail' : 'article_detail'}/${spotlight[index].seo_slug}`}>
                    <img src={spotlight[index].img ? IMAGE_BASE_URL + spotlight[index].img : IMAGE_BASE_URL + DEFAULT_POST} alt='' />
                  </Link>
                </div>
              </div>
              <div className='weekly-post-content'>
                <Link
                  to={`/${spotlight[index].category_type}/${spotlight[index].category_data_query}`}
                  className='post-tag'
                  onClick={() => handleViewClick(spotlight[index].category_name)}
                  style={{fontWeight: 'bold'}}
                >
                  {spotlight[index].category_name}
                </Link>
                <h2 className='post-title'>
                  <Link to={`/${spotlight[index].category_type === 'news' ? 'news_detail' : 'article_detail'}/${spotlight[index].seo_slug}`}>
                    {spotlight[index].title}
                  </Link>
                </h2>

                <p>{spotlight[index].subTitle}</p>
                <div className='blog-post-meta'>
                  <ul className='list-wrap mb-3'>
                    <li className='col-2'>
                      <FontAwesomeIcon icon='fa-regular fa-calendar' />
                      {new Date(spotlight[index].created_at).toLocaleDateString()}
                    </li>
                    <li className='col-3'>
                      <span className='homeblog-link-icon-phone'>
                        <Link to={setting.social_whatsapp}>
                          <FontAwesomeIcon icon='fa-solid fa-phone' />
                        </Link>
                      </span>
                      <span className='homeblog-link-icon-facebook'>
                        <Link to={setting.social_fb}>
                          <FontAwesomeIcon icon='fa-brands fa-facebook-f' />
                        </Link>
                      </span>
                      <span className='homeblog-link-icon-twitter'>
                        <Link to={setting.social_twitter}>
                          <FontAwesomeIcon icon='fa-brands fa-twitter' />
                        </Link>
                      </span>
                    </li>
                    <li className='col-6'>
                      <div className='view-all-btn'>
                        <Link
                          to={`/${spotlight[index].category_type === 'news' ? 'news_detail' : 'article_detail'}/${spotlight[index].seo_slug}`}
                          className='homeblog-link-btn'
                        >
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
                    <li className='col-1'>
                      <Link
                        to={''}
                        onClick={() => handleBlogArticleHeartClick(index)}
                        className={clickedBlogArticleIconId.includes(index) ? 'blog-article-icon-heart-clicked' : ''}
                      >
                        <FontAwesomeIcon icon='fa-solid fa-heart' className='blog-article-icon-heart' />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <hr />
              {/* </div> */}
            </div>
          ))}
          {/* </div> */}
        </div>
      ) : noPost === 0 ? (
        ''
      ) : (
        <NoPost />
      )}
    </>
  );
};

export default SpotLightSection;
