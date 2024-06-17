import React from "react";
import Newsletter from "../components/Newsletter";
import { useParams } from "react-router-dom";
import SpotlightBlog from "../components/SpotlightBlog";

const Spotlight = () => {
  const { name } = useParams();
  return (
    <>
      <SpotlightBlog title={name}/>
      <Newsletter />
    </>
  );
};

export default Spotlight;
