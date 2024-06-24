import React, { useState, useEffect } from 'react';
import BlogDetailComponent from '../components/BlogDetailComponent';
import RelatedPostsComponent from '../components/RelatedPostsComponent';
import Breadcrumb from '../components/Breadcrumb';
import { useParams } from 'react-router-dom';
import axios from '../config/';
import Loader from '../components/Loader';
import Menu from '../layouts/Menu';
import CommentComponent from '../components/CommentComponent';

const BlogsDetails = () => {
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const { title } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`/api/user/findPost?id=${title}`);
      const relatedRes = await axios.get(`/api/user/relatedPost?id=${title}`);
      setPost(response.data);
      setRelatedPosts(relatedRes.data);
      setLoading(false);
    };
    fetch();

    window.scrollTo(0, 0);
  }, [title]);

  if (loading) return <Loader />;
  return (
    <>
      <section className='spotlight-post-area pt-10 pb-60'>
        <div className='spotlight-post-inner-wrap'>
          <div className='container'>
            <div className='row'>
              <div className='col-3'>
                <Menu />
              </div>
              <div className='col-9 row'>
                <Breadcrumb title={title} />
                <div className='col-70'>
                  {post && <BlogDetailComponent post={post} />}
                  {relatedPosts.length > 0 && <RelatedPostsComponent posts={relatedPosts} />}
                  <CommentComponent post={post} />
                </div>
                <div className='col-30'></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogsDetails;
