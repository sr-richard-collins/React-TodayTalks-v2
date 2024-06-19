import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../components/loader/Loader.js";

/**** Layouts ****/
const FullLayout = lazy(() => import("../layouts/"));

/**** Pages ****/
const Home = lazy(() => import("../views/Home.js"));
const Category = lazy(() => import("../views/Category.js"));
const Spotlight = lazy(() => import("../views/Spotlight.js"));
const BlogLayout3 = lazy(() => import("../views/BlogLayout3.js"));
const BlogsDetails = lazy(() => import("../views/BlogsDetailsPage.js"));
const Contact = lazy(() => import("../views/Contact.js"));
const About = lazy(() => import("../views/AboutUs.js"));
// const NotFound = lazy(() => import("../views/NotFound.js")); // 404 Error page
// const ServerError = lazy(() => import("../views/ServerError.js")); // 500 Error page

/**** Routes ****/
const ThemeRoutes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <FullLayout />
      </Suspense>
    ),
    children: [
      { path: "/", exact: true, element: <Home /> },
      { path: "/news/:name", exact: true, element: <Category /> },
      { path: "/spotlight/:name", exact: true, element: <Spotlight /> },
      { path: "/bloglayout3", exact: true, element: <BlogLayout3 /> },
      { path: "/:title", exact: true, element: <BlogsDetails /> },
      { path: "/contact", exact: true, element: <Contact /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "*", element: <Navigate to="/404" /> }, // Navigate to 404 page for unmatched routes
    ],
  },
  {
    path: "/404",
    element: <Suspense fallback={<Loader />}>{/* <NotFound /> */}</Suspense>,
  },
  {
    path: "/500",
    element: <Suspense fallback={<Loader />}>{/* <ServerError /> */}</Suspense>,
  },
];

export default ThemeRoutes;
