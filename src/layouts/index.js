import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Menu from "./Menu";
// import { Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FullLayout = () => {

  const handleTopScreen = () => {
    window.scrollTo(0, 0);
  }
  return (
    <>

      <button className="scroll-top scroll-to-target" onClick={() => handleTopScreen()}>
        <FontAwesomeIcon icon="fa-solid fa-angle-up" />
      </button>

      <Header />
      <div className="row justify-content-center">
        <div className="col-lg-2 col-md-3 ">
          <Menu />
        </div>
        <div className="col-lg-7 col-md-9 col-12">
          <main className="fix">
            <Outlet />
          </main>
        </div>
        <div className="col-lg-3"></div>

      </div>


      {/* <Footer /> */}
    </>
  );
};

export default FullLayout;
