import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "../Components/Navbar";
import LoadingSpinners from "./../Components/LoadingSpinners";
import Footer from "../Components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const RootLayouts = () => {
  const { state } = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out-cubic",
      mirror: true,
      offset: 100,
      delay: 50,
      anchorPlacement: "top-center",
      debounceDelay: 30,
      throttleDelay: 50,
      startEvent: "DOMContentLoaded",
      disableMutationObserver: false,
    });

    AOS.refresh();
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-Poppins">
      <header>
        <div className="w-11/12 mx-auto">
          <Navbar></Navbar>
        </div>
      </header>

      <main className="flex-1">
        <div className="w-11/12 mx-auto my-10">
          {state === "loading" ? <LoadingSpinners /> : <Outlet></Outlet>}
        </div>
      </main>

      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default RootLayouts;
