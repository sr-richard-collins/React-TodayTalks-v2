import React from "react";
import Blog from "../components/Blog";
import Newsletter from "../components/Newsletter";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Category = () => {
  const { id } = useParams();
  const { categories } = useSelector((state) => state.categories);
  const selectCategory = categories.find(category => category.id === parseInt(id));
  console.log(selectCategory);
  return (
    <>
      <Blog title={selectCategory.name} />
      <Newsletter />
    </>
  );
};

export default Category;
