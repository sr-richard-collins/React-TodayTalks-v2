import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
// import { Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FullLayout = () => {
  
  return (
    <>
      <div className="darkmode-trigger">
        <label className="modeSwitch">
          <input type="checkbox" />
          <span className="icon">
            <FontAwesomeIcon icon="fa-solid fa-regular fa-sun" />
          </span>
        </label>
      </div>

      <button className="scroll-top scroll-to-target" data-target="html">
        <FontAwesomeIcon icon="fa-solid fa-angle-up" />
      </button>

      <Header />

      <main className="fix">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default FullLayout;
