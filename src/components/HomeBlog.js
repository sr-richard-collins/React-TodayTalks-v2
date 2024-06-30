import React, { useState, useEffect, Suspense } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../config';
import { fetchSelectCategory } from '../actions/categoryAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';

const HomeBlog = ({ title }) => {
  const dispatch = useDispatch();
  const { homePosts } = useSelector((state) => state.posts);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { setting } = useSelector((state) => state.setting);
  const [clickedBlogArticleIconId, setClickedBlogArticleIconId] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const response = homePosts.find((post) => post.category === title);
      if (response) setPosts(response.posts);
      setLoading(false);
    };
    fetch();
  }, [title]);

  const handleViewClick = (name) => {
    dispatch(fetchSelectCategory(name));
  };

  const handleBlogArticleHeartClick = (linkId) => {
    if(clickedBlogArticleIconId.includes(linkId)){
      setClickedBlogArticleIconId(clickedBlogArticleIconId.filter(id => id !== linkId));
    }
    else{
      setClickedBlogArticleIconId([...clickedBlogArticleIconId, linkId]);
    }
    
  };

  return (
    <>
      {posts.length ? (
        <section className='editor-post-area pt-50 pb-30'>
          <div className='container content-container'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='section-title-wrap mb-30'>
                  <div className='section-title'>
                    <h2 className='title'>{posts[0].category.name}</h2>
                  </div>
                  <div className='view-all-btn'>
                    <Link
                      to={`/${posts[0].category.type2}/${posts[0].category.data_query}`}
                      className='link-btn'
                      onClick={() => handleViewClick(posts[0].category.name)}
                    >
                      View All
                      <span className='svg-icon'>
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' fill='none'>
                          <path d='M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z' fill='currentColor' />
                          <path d='M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z' fill='currentColor' />
                        </svg>
                      </span>
                    </Link>
                  </div>
                  <div className='section-title-line'></div>
                </div>
              </div>
            </div>
            {[...Array(Math.ceil(posts.length / 1))].map((_, index) => (
              <div className='editor-post-wrap' key={index}>
                <div className='row editor-post-active'>
                  {posts.slice(index * 1, index * 1 + 1 < posts.length ? index * 1 + 1 : posts.length).map((post) => (
                    <div className='col-lg-12 mb-4' key={post.id}>
                      <div className='editor-post-item'>
                        <div className='editor-post-thumb'>
                          <Link to={`/${post.category_type === 'news' ? 'news_detail' : 'article_detail'}/${post.seo_slug}`}>
                            <img src={IMAGE_BASE_URL + post.img} alt={post.title} />
                          </Link>
                        </div>
                        <div className='editor-post-content'>
                          <h2 className='post-title mt-3'>
                            <Link to={`/${post.category_type === 'news' ? 'news_detail' : 'article_detail'}/${post.seo_slug}`}>{post.title}</Link>
                          </h2>
                          <div className='blog-post-meta my-3'>
                            <ul className='list-wrap mb-3'>
                              <li className='col-2'>
                                <FontAwesomeIcon icon='fa-regular fa-calendar' />
                                {new Date(post.created_at).toLocaleDateString()}
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
                                    to={`/${post.category_type === 'news' ? 'news_detail' : 'article_detail'}/${post.seo_slug}`}
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
                                <Link to={''} onClick={() => handleBlogArticleHeartClick(post.id)}
                                  className={clickedBlogArticleIconId.includes(post.id) ? 'blog-article-icon-heart-clicked' : ''}>
                                  <FontAwesomeIcon icon="fa-solid fa-heart" className='blog-article-icon-heart' />
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        ''
      )}
    </>
  );
};

export default HomeBlog;
