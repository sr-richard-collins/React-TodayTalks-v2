import React, { useState, useEffect, Suspense, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import axios from '../config';
import { IMAGE_BASE_URL, DEFAULT_POST } from '../config';
import CustomPagination from './CustomPagination';
import Breadcrumb from './Breadcrumb';
import SubCategoryBreadcrumb from './SubCategoryBreadCrumb';
import Loader from './Loader';
import { fetchSelectCategory } from '../actions/categoryAction';
import { useDispatch, useSelector } from 'react-redux';
import NoPost from '../views/error/No_post';
import { AuthContext } from '../provider/AuthContext';
import Menu from '../layouts/Menu';

const Blog_new = ({ title, isHomepage }) => {
  const dispatch = useDispatch();
  const { homePosts } = useSelector((state) => state.posts);
  const context = useContext(AuthContext);
  const { user } = context;
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [subCategory, setSubCategory] = useState([]);
  const [clickedBlogArticleIconId, setClickedBlogArticleIconId] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      let response;
      if (isHomepage === 1) {
        response = homePosts.find((post) => post.category === title);
        if (response) setPosts(response.posts);
      } else {
        const response = await axios.get(`/api/user/pagenationPosts`, {
          params: {
            category: title,
            currentPage: currentPage,
            postsPerPage,
          },
        });
        if (postsPerPage === 'all') {
          setPosts(response.data);
          setTotalPosts(response.data.length);
        } else {
          setPosts(response.data.data);
          setTotalPosts(response.data.total);
        }
      }
      setLoading(false);
    };
    fetch();
    window.scrollTo(0, 0);
  }, [title, currentPage, postsPerPage]);

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const response = await axios.get(`/api/user/subcategory?id=${title}`);
        setSubCategory(response.data);

        if (user) {
          const likesResponse = await axios.get(`/api/user/getLikesByUser?id=${user.id}`);
          setClickedBlogArticleIconId(likesResponse.data.likes);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchSubCategory();
  }, [title]);

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handlePerPageChange = (event) => {
    setPostsPerPage(event.target.value);
    setCurrentPage(1); // Reset to the first page
  };
  const handleBlogArticleHeartClick = (linkId) => {
    if (!user) window.location.href = '/login';
    else {
      const fetchLikes = async () => {
        const response = await axios.post('/api/user/updateLikes', {
          userId: user.id,
          postId: linkId,
        });
      };
      fetchLikes();
    }
    if (clickedBlogArticleIconId.includes(linkId)) {
      setClickedBlogArticleIconId(clickedBlogArticleIconId.filter((id) => id !== linkId));
    } else {
      setClickedBlogArticleIconId([...clickedBlogArticleIconId, linkId]);
    }
  };

  const handleFacebookShare = (slug) => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/' + slug)}`;
    window.open(shareUrl, '_blank');
  };

  const handleTwitterShare = (slug) => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.origin + '/' + slug)}`;
    window.open(shareUrl, '_blank');
  };

  const handleWhatsAppShare = (slug) => {
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(window.location.origin + '/' + slug)}`;
    window.open(shareUrl, '_blank');
  };

  const handleViewClick = (name) => {
    dispatch(fetchSelectCategory(name));
  };

  if (loading && isHomepage === 0) {
    return <Loader />;
  }

  return (
    <>
      <Suspense
        fallback={
          <>
            <Loader />
          </>
        }
      >
        {posts.length ? (
          <section class="pb-60">
            <div className='row pt-40'>
              <div className='col-1g-12'>
                <div className='section-title-wrap-three mb-20'>
                  <div className='section-title-three'>
                    <h1 className='title'>
                      தலைப்புச் செய்திகள்
                      <span className='section-title-svg'>
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 246 40' fill='none' preserveAspectRatio='none'>
                          <path
                            d='M10.1448 2.85061C10.6524 1.15867 12.2097 0 13.9761 0H241.624C244.303 0 246.225 2.58294 245.455 5.14939L235.855 37.1494C235.348 38.8413 233.79 40 232.024 40H4.37612C1.69667 40 -0.225117 37.4171 0.544817 34.8506L10.1448 2.85061Z'
                            fill='currentcolor'
                          />
                        </svg>
                      </span>
                    </h1>
                    <div className='section-title-line-three'></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="categories-item-wrap-two ">
              <div className='col-lg-12 col-md-12 col-12 mt-20'>
                <div className="row">
                  {posts.map((post) => (
                    <div class="col-lg-3 col-md-4 col-6" key={post.id}>
                      <div class="categories-item-two">
                        <div class="overlay-post-two">
                          <Link to={`/${post.category_type === 'news' ? 'news_detail' : 'article_detail'}/${post.seo_slug}`}>
                            <img src={post.img ? IMAGE_BASE_URL + post.img : IMAGE_BASE_URL + DEFAULT_POST} alt={post.seo_slug}
                              style={{ maxWidth: '100%' }}
                            />
                          </Link>
                          <div class="category-post-content">
                            <Link to={`/${post.category_type === 'news' ? 'news_detail' : 'article_detail'}/${post.seo_slug}`}
                              className='category-post-tag'
                            >
                              {post.title}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className='pb-60'>
            {subCategory.length ? <SubCategoryBreadcrumb subCategories={subCategory} title={title} /> : ''}
            <Breadcrumb title={title} />
            {isHomepage === 0 && <NoPost />}
          </section>
        )}
      </Suspense>
    </>
  );
};

export default Blog_new;
