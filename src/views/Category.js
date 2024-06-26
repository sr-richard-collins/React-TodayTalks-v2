import React, { useState, useEffect, Suspense } from 'react';
import Blog from '../components/Blog';
// import Newsletter from '../components/Newsletter';
// import Breadcrumb from '../components/Breadcrumb';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from '../config/';

const Category = () => {
  const { name } = useParams();
  const { categories } = useSelector((state) => state.categories);
  const selectCategory = categories.find((category) => {
    // Check if the current category matches the name
    if (category.data_query === name) {
      return true;
    }

    // Check if any child category matches the name
    if (category.child) {
      return category.child.some((subCategory) => subCategory.data_query === name);
    }

    return false;
  });
  const [seo, setSeo] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`/api/user/seoCategory?id=${name}`);
      setSeo(response.data);
    };
    fetch();
  }, [name]);

  return (
    <>
      <Helmet>
        <title>{seo.name}</title>
        <meta property='og:title' content={seo.seo_title} />
        <meta name='keywords' content={seo.seo_keyword} />
        <meta name='description' content={seo.seo_description} />
      </Helmet>
      <Blog title={selectCategory.name} isHomepage={0} />
    </>
  );
};

export default Category;
