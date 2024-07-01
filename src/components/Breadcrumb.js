import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../config';

const Breadcrumb = ({ title }) => {
  const [categoryName, setCategoryName] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  useEffect(() => {
    const checkTitle = async () => {
      const response = await axios.post('/api/user/checkBreadcrumb', { title });
      setCategoryName(response.data.category);
      setSubCategoryName(response.data.subCategory);
    };
    checkTitle();
  }, [title]);
  return (
    <>
      <div className='breadcrumb-area'>
        <div className='container content-container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='breadcrumb-content'>
                <nav aria-label='breadcrumb'>
                  <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                      <Link to='/'>
                        Home
                        <span>
                          {' '}
                          <FontAwesomeIcon icon='fa-solid fa-angles-right' />
                        </span>
                      </Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                      {categoryName}
                    </li>
                    {subCategoryName && (
                      <li className='breadcrumb-item active' aria-current='page'>
                        {subCategoryName}
                      </li>
                    )}
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Breadcrumb;
