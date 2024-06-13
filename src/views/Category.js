import React from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Blog from "../components/Blog";
import Newsletter from "../components/Newsletter";
import { useSelector } from "react-redux";
const Category = () => {
  const { selectCategory } = useSelector((state) => state.categories);
  console.log(selectCategory);
  return (
    <>
      <Blog title={selectCategory} />
      <Newsletter />
    </>
  );
};

export default Category;
