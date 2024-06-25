import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SubCategoryBreadcrumb = ({ title }) => {
  return (
    <>
      <div className='breadcrumb-area'>
        <div className='container content-container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='breadcrumb-content'>
                <nav aria-label='breadcrumb'>
                  <ol className='breadcrumb'>
                    <li className='sub-cagetory-breadcrumb-tag'>
                      <span>Tags:</span>
                    </li>
                    <li className='sub-cagetory-breadcrumb-item'>
                      <Link to='/'>
                        <span>Art & Design </span>
                      </Link>
                    </li>
                    <li className='sub-cagetory-breadcrumb-item'>
                      <Link to='/'>
                        <span>Video </span>
                      </Link>
                    </li>
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

export default SubCategoryBreadcrumb;
