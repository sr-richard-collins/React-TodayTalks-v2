import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Breadcrumb = ({ title }) => {
  return (
    <>
      <div className='breadcrumb-area'>
        <div className='container'>
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
                      {title}
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

export default Breadcrumb;
