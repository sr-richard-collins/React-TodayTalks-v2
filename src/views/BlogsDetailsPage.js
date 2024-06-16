import React, {useState, useEffect} from "react";
import BlogDetailComponent from "../components/BlogDetailComponent";
import RelatedPostsComponent from "../components/RelatedPostsComponent";
import { useParams } from "react-router-dom";
import axios from '../axiosConfig';

const BlogsDetails = () => {
  const [post, setPost] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`/api/user/findPost?id=${id}`);
      const relatedRes = await axios.get(`/api/user/relatedPost?id=${id}`);
      setPost(response.data);
      setRelatedPosts(relatedRes.data);
    };
    fetch();
  }, [id]);

  return (
    <>
      <BlogDetailComponent post={post}/>
      <RelatedPostsComponent posts={relatedPosts}/>
    </>
  );
};

export default BlogsDetails;
