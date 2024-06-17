import React, { useEffect, useState, memo, Suspense } from "react";
import {
  BrowserRouter as Router,
  useRoutes,
  useLocation,
} from "react-router-dom";
import Themeroutes from "./routes/Router";
import axios from "./axiosConfig";
import Loader from "./components/Loader";
import { updateFavicon } from "./utils";

const KRouter = memo(() => {
  const element = useRoutes(Themeroutes);
  return element;
});

const App = memo(() => {
  // const [seoKey, setSeoKey] = useState(null);

  useEffect(() => {
    const getFavicon = async () => {
      try {
        const response = await axios.get(`/api/user/setting`);
        updateFavicon(response.data.site_favicon); // Assuming updateFavicon function updates the favicon
      } catch (error) {
        console.error("Failed to fetch favicon:", error);
      }
    };

    getFavicon();
  }, []);

  // useEffect(() => {
  //   const getSeoKey = async () => {
  //     const key = await axios.get(`/api/user/getSeoKey`);
  //     setSeoKey(key);
  //   };

  //   getSeoKey();
  // }, []);

  //   <Router>
  //   {loading ? <Loader /> : seoKey && useRoutes(ThemeRoutes(seoKey))}
  // </Router>
  // );

  return (
    <div>
      <Suspense fallback={<Loader />}>
        <KRouter></KRouter>
      </Suspense>
    </div>
  );
});

export default App;
