import React, { useEffect, useState, memo, Suspense } from "react";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";
import Themeroutes from "./routes/Router";
import axios from "./axiosConfig";
import Loader from "./components/Loader";
import { updateFavicon } from "./utils";
import { fetchSetting } from "./actions/settingAction";
import { useDispatch, useSelector } from "react-redux";

const KRouter = memo(() => {
  const element = useRoutes(Themeroutes);
  return element;
});

const App = memo(() => {
  const {setting} = useSelector((state) => state.setting);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSetting());
  }, [dispatch])

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

  return (
    <div>
      <Suspense fallback={<Loader />}>
        <KRouter></KRouter>
      </Suspense>
    </div>
  );
});

export default App;
