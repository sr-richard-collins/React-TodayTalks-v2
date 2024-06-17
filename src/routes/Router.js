import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Home = lazy(() => import("../views/Home.js"));
const Category = lazy(() => import("../views/Category.js"));
const Spotlight = lazy(() => import("../views/Spotlight.js"));
const BlogLayout3 = lazy(() => import("../views/BlogLayout3.js"));
const BlogsDetails = lazy(() => import("../views/BlogsDetailsPage.js"));
const Contact = lazy(() => import("../views/Contact.js"));
const About = lazy(() => import("../views/AboutUs.js"));

/*****Routes******/

const ThemeRoutes =  [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/home" /> },
      { path: "/home", exact: true, element: <Home /> },
      { path: "/news/:name", exact: true, element: <Category /> },
      { path: "/spotlight/:name", exact: true, element: <Spotlight /> },
      { path: "/bloglayout3", exact: true, element: <BlogLayout3 /> },
      { path: "/blog-details/:title", exact: true, element: <BlogsDetails /> },
      { path: "/contact", exact: true, element: <Contact /> },
      { path: "/about", exact: true, element: <About /> },
    ],
  },
];

export default ThemeRoutes;
