import React, { useState, useEffect } from "react";
import Blog from "../Blog";
import axios from "../../config";
import Loader from "../Loader";

const CategoriesWithBlogSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      setLoading(true)
      const resCategory = await axios.get("/api/user/homePagecategories");
      setCategories(resCategory.data);
      setLoading(false);
    };

    fetchTrendingPosts();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="spotlight-post-item-wrap">
      {categories.map((category) => (
        <Blog title={category.name} key={category.id} isHomepage={1} />
      ))}
    </div>
  );
};

export default CategoriesWithBlogSection;
