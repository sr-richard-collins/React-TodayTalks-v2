import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IMAGE_BASE_URL } from '../config';
import { Helmet } from 'react-helmet';
import axios from '../config';
import { useDispatch, useSelector } from 'react-redux';
import CustomPagination from './CustomPagination';
import { format } from 'date-fns';

const CommentComponent = ({ post }) => {
  const { setting } = useSelector((state) => state.setting);
  const [seo, setSeo] = useState([]);
  const [comments, setComments] = useState([]);
  const textareaRef = useRef(null); // Ref to store reference to the textarea element
  const [isReplyClicked, setIsReplyClicked] = useState(false); // State to track if Reply is clicked
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage, setCommentsPerPage] = useState(10);
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    // Fetch data from Laravel backend
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/user/getComments`, {
          params: {
            id: post.id,
            currentPage: currentPage,
            commentsPerPage,
          },
        });
        if (commentsPerPage === 'all') {
          setComments(response.data);
          setTotalComments(response.data.length);
        } else {
          setComments(response.data.data);
          setTotalComments(response.data.total);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [post, currentPage, commentsPerPage]);

  useEffect(() => {
    if (isReplyClicked && textareaRef.current) {
      textareaRef.current.focus(); // Focus on textarea when isReplyClicked is true
      setIsReplyClicked(false);
    }
  }, [isReplyClicked]); // Dependency array ensures useEffect runs when isReplyClicked changes

  const handleReplyClick = () => {
    setIsReplyClicked(true); // Set isReplyClicked to true when Reply is clicked
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(totalComments / commentsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handlePerPageChange = (event) => {
    setCommentsPerPage(event.target.value);
    setCurrentPage(1); // Reset to the first page
  };

  const renderComments = (comments) => {
    return (
      <div className='latest-comments'>
        {comments.map((comment) => (
          <ul key={comment.id} className='list-wrap'>
            <li>
              <div className='comments-box'>
                <div className='comments-avatar'>
                  <img src={IMAGE_BASE_URL + comment.user.avatar} alt='img' />
                </div>
                <div className='comments-text'>
                  <div className='avatar-name'>
                    <h6 className='name'>{comment.user.name}</h6>
                    <span className='date'>{format(new Date(comment.updated_at), 'dd MMMM, yyyy')}</span>
                  </div>
                  <p>{comment.content}</p>
                  <p className='reply-btn' onClick={handleReplyClick}>
                    Reply
                  </p>
                </div>
              </div>
              {comment.child && comment.child.length > 0 && <ul className='children'>{renderComments(comment.child)}</ul>}
            </li>
          </ul>
        ))}
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta property='og:title' content={seo.seo_title} />
        <meta name='keywords' content={seo.seo_keyword} />
        <meta name='description' content={seo.seo_description} />
      </Helmet>
      <section className='blog-details-area pt-60 pb-60'>
        <div className='container'>
          <div className='author-inner-wrap'>
            <div className='row justify-content-center'>
              <div>
                <div className='blog-details-wrap'>
                  <div className='comments-wrap'>
                    {comments.length ? <h3 className='comments-wrap-title'>Comments</h3> : ''}
                    {renderComments(comments)}
                    {comments.length ? (
                      <>
                        <CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                        <form className='form-inline ml-3'>
                          <label htmlFor='per_page' className='mr-2'>
                            Show:
                          </label>
                          <select name='per_page' id='per_page' className='form-control' value={commentsPerPage} onChange={handlePerPageChange}>
                            <option value='10'>10/page</option>
                            <option value='20'>20/page</option>
                            <option value='all'>All</option>
                          </select>
                        </form>
                      </>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className='comment-respond'>
                    <h3 className='comment-reply-title'>Post a comment</h3>
                    <form action='#' className='comment-form'>
                      <p className='comment-notes'>Your email address will not be published. Required fields are marked *</p>
                      <div className='form-grp'>
                        <textarea ref={textareaRef} name='comment' placeholder='Comment'></textarea>
                      </div>
                      <div className='row'>
                        <div className='col-md-4'>
                          <div className='form-grp'>
                            <input type='text' placeholder='Name' />
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div className='form-grp'>
                            <input type='email' placeholder='Email' />
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div className='form-grp'>
                            <input type='url' placeholder='Website' />
                          </div>
                        </div>
                      </div>
                      <div className='form-grp checkbox-grp'>
                        <input type='checkbox' />
                        <label htmlFor='checkbox_two'>Save my name, email, and website in this browser for the next time I comment.</label>
                      </div>
                      <button type='submit' className='btn btn-two'>
                        Post Comment
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CommentComponent;
