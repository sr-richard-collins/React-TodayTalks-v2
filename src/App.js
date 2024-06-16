import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import React, { useEffect } from 'react';
import { updateFavicon } from './utils';
import axios from './axiosConfig';

const App = () => {
  const routing = useRoutes(Themeroutes);

  useEffect(() => {
    const getFavicon = async () => {
      try {
        const response = await axios.get(`/api/user/setting`);
        updateFavicon(response.data.site_favicon);
      } catch (error) {
        console.error('Failed to fetch favicon:', error);
      }
    };

    getFavicon();
  }, []);

  return <>{routing}</>;
};

export default App;
