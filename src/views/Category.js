import React, { useState, useEffect, Suspense } from 'react';
import Blog from '../components/Blog';
import Blog_new from '../components/Blog_new';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from '../config/';

const Category = () => {
  const { name } = useParams();
  const { categories } = useSelector((state) => state.categories);
  const [seo, setSeo] = useState([]);
  const [selectCategory, setSelectCategory] = useState(null);

  useEffect(() => {
    const findCategory = () => {
      for (const category of categories) {
        if (category.data_query === name) {
          return category;
        }
        if (category.child) {
          const subCategory = category.child.find((subCategory) => subCategory.data_query === name);
          if (subCategory) {
            return subCategory;
          }
        }
      }
      return null;
    };

    setSelectCategory(findCategory());

    const fetchSeoData = async () => {
      const response = await axios.get(`/api/user/seoCategory?id=${name}`);
      setSeo(response.data);
    };

    fetchSeoData();
  }, [name, categories]);

  return (
    <>
      <Helmet>
        <title>{seo.name}</title>
        <meta property='og:title' content={seo.seo_title} />
        <meta name='keywords' content={seo.seo_keyword} />
        <meta name='description' content={seo.seo_description} />
      </Helmet>
      {selectCategory ? <Blog title={selectCategory.name} isHomepage={0} /> : <p>Category not found</p>}
    </>
  );
};

export default Category;
