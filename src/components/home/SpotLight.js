import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NoPost from '../../views/error/No_post';
import axios from '../../config';
import { IMAGE_BASE_URL, DEFAULT_POST } from '../../config';
import { SOCIAL_FB, SOCIAL_WHATSAPP, SOCIAL_TWITTER } from '../../config/constant';
import { fetchSelectCategory } from '../../actions/categoryAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../../provider/AuthContext';
import $ from 'jquery'; // Import jQuery
import 'bootstrap'; // Import Bootstrap JavaScript

const SpotLightSection = () => {
  const dispatch = useDispatch();
  const { setting } = useSelector((state) => state.setting);
  const context = useContext(AuthContext);
  const { user } = context;
  const [spotIndex, setSpotIndex] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [spotlight, setSpotlight] = useState([]);
  const [clickedBlogArticleIconId, setClickedBlogArticleIconId] = useState([]);
  const [noPost, setNoPost] = useState(0);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const resSpotlight = await axios.get(`/api/user/spotlight`);
        setSpotlight(resSpotlight.data);

        if (user) {
          const likesResponse = await axios.get(`/api/user/getLikesByUser`, {
            params: { id: user.id },
          });
          setClickedBlogArticleIconId(likesResponse.data.likes);
        }

        setNoPost(1);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTrendingPosts();
  }, []);

  const handlePageClick = (index) => {
    window.scrollTo(0, 0);
    setActivePage(index);
    setSpotIndex(index); // Assuming setSpotIndex is defined elsewhere
  };
  const handleBlogArticleHeartClick = (linkId) => {
    if (!user) window.location.href = '/login';
    else {
      const fetchLikes = async () => {
        const response = await axios.post('/api/user/updateLikes', {
          userId: user.id,
          postId: linkId,
        });
      };
      fetchLikes();
    }
    if (clickedBlogArticleIconId.includes(linkId)) {
      setClickedBlogArticleIconId(clickedBlogArticleIconId.filter((id) => id !== linkId));
    } else {
      setClickedBlogArticleIconId([...clickedBlogArticleIconId, linkId]);
    }
  };

  const handleViewClick = (name) => {
    dispatch(fetchSelectCategory(name));
  };

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

  const handleWhatsAppShare = () => {
    const currentUrl = window.location.href;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(currentUrl)}`;
    window.open(shareUrl, '_blank');
  };

  return (
    <>
      {spotlight.length ? (
        <div className='spotlight-post-item-wrap'>
          <div className='section-title-wrap-three mb-20'>
            <div className='section-title-three'>
              <h6 className='title'>
                தலைப்புச் செய்திகள்
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
                <div className='spotlight-post-thumb' style={{ display: 'flex', flexDirection: 'column' }}>
                  <Link to={`/${spotlight[index].category_type === 'news' ? 'news_detail' : 'article_detail'}/${spotlight[index].seo_slug}`}>
                    <img src={spotlight[index].img ? IMAGE_BASE_URL + spotlight[index].img : IMAGE_BASE_URL + DEFAULT_POST} alt='' />
                  </Link>
                  <Link
                    to={`/${spotlight[index].category_type}/${spotlight[index].category_data_query}`}
                    className='post-tag'
                    onClick={() => handleViewClick(spotlight[index].category_name)}
                    style={{ fontWeight: 'bold', marginTop: '20px' }}
                  >
                    {spotlight[index].category_name}
                  </Link>
                </div>
              </div>
              <div className='weekly-post-content'>
                <h2 className='post-title'>
                  <Link to={`/${spotlight[index].category_type === 'news' ? 'news_detail' : 'article_detail'}/${spotlight[index].seo_slug}`}>
                    {spotlight[index].title}
                  </Link>
                </h2>

                <p>{spotlight[index].subTitle}</p>
                <div className='blog-post-meta' style={{ borderBottom: '1px solid #e4e4e4' }}>
                  <ul className='list-wrap mb-3'>
                    <li className='col-3 '>
                      <FontAwesomeIcon icon='fa-regular fa-calendar' />
                      {new Date(spotlight[index].created_at).toLocaleDateString()}
                    </li>
                    <li className='col-3'>
                      <span className='homeblog-link-icon-phone'>
                        <Link onClick={handleWhatsAppShare}>
                          <FontAwesomeIcon icon='fa-solid fa-phone' />
                        </Link>
                      </span>
                      <span className='homeblog-link-icon-facebook'>
                        <Link onClick={handleFacebookShare}>
                          <FontAwesomeIcon icon='fa-brands fa-facebook-f' />
                        </Link>
                      </span>
                      <span className='homeblog-link-icon-twitter'>
                        <Link onClick={handleTwitterShare}>
                          <FontAwesomeIcon icon='fa-brands fa-twitter' />
                        </Link>
                      </span>
                    </li>
                    <li className='col-6 '>
                      <div className='view-all-btn col-80'>
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
                      <div className='col-20'>
                        <Link
                          to={''}
                          onClick={() => handleBlogArticleHeartClick(spotlight[index].id)}
                          className={clickedBlogArticleIconId.includes(spotlight[index].id) ? 'blog-article-icon-heart-clicked' : ''}
                        >
                          <FontAwesomeIcon
                            icon={clickedBlogArticleIconId.includes(spotlight[index].id) ? ['fas', 'heart'] : ['far', 'heart']}
                            className='blog-article-icon-heart'
                          />
                        </Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
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
