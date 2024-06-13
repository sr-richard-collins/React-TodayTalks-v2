import React from "react";
import BlogDetailComponent from "../components/BlogDetailComponent";
import RelatedPostsComponent from "../components/RelatedPostsComponent";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const BlogsDetails = () => {
  const { id } = useParams();
  const { posts } = useSelector((state) => state.posts);
  const post = posts.find(postItem => 
    postItem.id === parseInt(id)
  );

  console.log(post);
  return (
    <>
      <BlogDetailComponent post={post}/>
      <RelatedPostsComponent />
    </>
  );
};

export default BlogsDetails;
