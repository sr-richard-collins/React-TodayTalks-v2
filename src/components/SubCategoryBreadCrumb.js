import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SubCategoryBreadcrumb = ({ subCategories, title }) => {
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
                    {subCategories.map((subCategory) => (
                      <li key={subCategory.id} className='sub-cagetory-breadcrumb-item'>
                        <Link to={`/${subCategory.type2}/${subCategory.data_query}`} className={subCategory.name === title ? 'active' : ''}>
                          <span>{subCategory.name}</span>
                        </Link>
                      </li>
                    ))}
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
