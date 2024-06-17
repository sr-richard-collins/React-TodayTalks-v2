import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import axios from "./axiosConfig";
import Loader from "./components/Loader";
import { updateFavicon } from "./utils";

const App = () => {
  const routing = useRoutes(Themeroutes);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    // Simulate loading delay (e.g., fetching data)
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Replace with your actual loading logic (fetching data, etc.)
  }, []);

  return (
    <div>
      <Suspense fallback={<Loader />}>
        {loading ? (
          <Loader /> // Show loader while loading is true
        ) : (
          <div>{ routing }</div> // Render routing component when loading is false
        )}
      </Suspense>
    </div>
  );
};

export default App;
