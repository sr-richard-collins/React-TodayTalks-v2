import React, { useEffect, memo } from "react";
import { useRoutes } from "react-router-dom";
import themeRoutes from "./routes/";
import { updateFavicon } from "./utils/favIcon";
import { fetchSetting } from "./actions/settingAction";
import { useDispatch, useSelector } from "react-redux";

const Router = memo(() => useRoutes(themeRoutes));

const App = memo(() => {
  const { setting } = useSelector((state) => state.setting);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSetting());
  }, [dispatch]);

  useEffect(() => {
    const getFavicon = async () => {
      try {
        updateFavicon(setting.site_favicon); // Assuming updateFavicon function updates the favicon
      } catch (error) {
        console.error("Failed to fetch favicon:", error);
      }
    };
    getFavicon();
  }, []);

  return <Router />;
});

export default App;
