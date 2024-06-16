import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
// import { Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet";
import axios from '../axiosConfig';

const FullLayout = () => {
  const [seoTitles, setSeoTitles] = useState([]);
  const [seoKeywords, setSeoKeywords] = useState([]);
  const [seoDescripton, setSeoDescription] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const title = await axios.get(`/api/user/seoTitle`);
      const titleArray = title.data.map((item) => item.seo_title);
      const keywords = await axios.get(`/api/user/seoKeywords`);
      const keywordsArray = keywords.data.map((item) => item.seo_keyword);
      const descriptions = await axios.get(`/api/user/seoDescriptions`);
      const descriptionsArray = descriptions.data.map(
        (item) => item.seo_description
      );
      setSeoTitles(titleArray);
      setSeoKeywords(keywordsArray);
      setSeoDescription(descriptionsArray);
    };
    fetch();
  }, []);
  return (
    <>
      {/* <div id="preloader">
            <div className="loader-inner">
                <div id="loader">
                    <h2 id="bg-loader">zaira<span>.</span></h2>
                    <h2 id="fg-loader">zaira<span>.</span></h2>
                </div>
            </div>
        </div> */}
      <Helmet>
        <title>{"title"}</title>
        <meta property="og:title" content={seoTitles} />
        <meta name="keywords" content={seoKeywords} />
        <meta name="description" content={seoDescripton} />
      </Helmet>

      <div className="darkmode-trigger">
        <label className="modeSwitch">
          <input type="checkbox" />
          <span className="icon">
            <FontAwesomeIcon icon="fa-solid fa-regular fa-sun" />
          </span>
        </label>
      </div>

      <button className="scroll-top scroll-to-target" data-target="html">
        <FontAwesomeIcon icon="fa-solid fa-angle-up" />
      </button>

      <Header />

      <main className="fix">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default FullLayout;
