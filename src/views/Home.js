import React, { useEffect, useState } from 'react';
import SpotLightSection from '../components/home/SpotLight';
import CategoriesWithBlogSection from '../components/home/CategoriesWithBlog';
// import TrendingGameNewsSection from "../components/home/TrendingGameNews";
// import Newsletter from "../components/Newsletter";
import Menu from '../layouts/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchHomePosts } from '../actions/postAction';
import Loader from '../components/Loader';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const { setting } = useSelector((state) => state.setting);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [message, setMessage] = useState(location.state?.message || '');

  useEffect(() => {
    dispatch(fetchHomePosts()).then(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 2000); // 2 seconds delay

      // Cleanup timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (loading) return <Loader />;

  return (
    <>
      {message && <div className='alert success-message'>{message}</div>}
      <div>
        <Helmet>
          <title>{setting.site_title}</title>
          <meta property='og:title' content={setting.seo_title} />
          <meta name='keywords' content={setting.seo_keyword} />
          <meta name='description' content={setting.seo_description} />
        </Helmet>

        <section className='spotlight-post-area pt-20 pb-60'>
          <div className='spotlight-post-inner-wrap'>
            <div className='container content-container'>
              <div className='row justify-content-center'>
                <div className='col-lg-9 col-md-12 col-12'>
                  <SpotLightSection />
                  <CategoriesWithBlogSection />
                </div>
                <div className='col-lg-3'></div>
              </div>
            </div>
          </div>
        </section>
        {/* <TrendingGameNewsSection /> */}
        {/* <Newsletter /> */}
      </div>
    </>
  );
};

export default Home;
