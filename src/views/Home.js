import React, { useEffect } from "react";
import SpotLightSection from "../components/home/SpotLight";
import CategoriesWithBlogSection from "../components/home/CategoriesWithBlog";
import TrendingGameNewsSection from "../components/home/TrendingGameNews";
import Newsletter from "../components/Newsletter";
import Menu from "../layouts/Menu";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { fetchHomePosts } from "../actions/postAction";

const Home = () => {
  const dispatch = useDispatch();
  const { setting } = useSelector((state) => state.setting);

  useEffect(() => {
    dispatch(fetchHomePosts());
  }, [dispatch]);

  return (
    <>
      <div>
        <Helmet>
          <title>{setting.site_title}</title>
          <meta property="og:title" content={setting.seo_title} />
          <meta name="keywords" content={setting.seo_keyword} />
          <meta name="description" content={setting.seo_description} />
        </Helmet>

        <section className="spotlight-post-area pt-70 pb-60">
          <div className="spotlight-post-inner-wrap">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-20">
                  <Menu />
                </div>
                <div className="col-55">
                  <SpotLightSection />
                </div>
                <div className="col-25"></div>
                <CategoriesWithBlogSection />
              </div>
            </div>
          </div>
        </section>
        <TrendingGameNewsSection />
        <Newsletter />
      </div>
    </>
  );
};

export default Home;
