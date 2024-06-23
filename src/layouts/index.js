import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
// import { Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FullLayout = () => {
  
  const handleTopScreen = () => {
    window.scrollTo(0,0);
  }
  return (
    <>

      <button className="scroll-top scroll-to-target" onClick={()=> handleTopScreen()}>
        <FontAwesomeIcon icon="fa-solid fa-angle-up" />
      </button>

      <Header />

      <main className="fix">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </>
  );
};

export default FullLayout;
