import React, { useState, useEffect } from 'react';
import Header from '../layouts/Header';
import Category_new_component from '../components/Category_new_component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handler = () => setMatches(mediaQuery.matches);

    // Initial check
    handler();

    // Listen for changes in the media query
    mediaQuery.addListener(handler);

    return () => {
      mediaQuery.removeListener(handler);
    };
  }, [query]);

  return matches;
};

const Category_new = () => {

  const handleTopScreen = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <button className='scroll-top scroll-to-target' onClick={() => handleTopScreen()}>
        <FontAwesomeIcon icon='fa-solid fa-angle-up' />
      </button>
      <div className='container'>
        <Header />
        <section className='pt-70 pb-60 '>
          <main className='fix'>
            <Category_new_component/>
          </main>
        </section>
      </div>
    </>
  );
};

export default Category_new;
