import "./styles.css";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

import LandingNavBar from "./LandingNavBar";
import Login from "./Login";
import { FaArrowDown } from "react-icons/fa";
import Blob from "./Blob";
import Blueblob from "./Blue_Blob.gif";

export default function LandingPage() {
  const [loginCheck, setLoginCheck] = useState(false);
  const aboutRef = useRef();
  const fadeInUp = {
    initial: {
      x: 100,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1,

      transition: {
        duration: 1,
        delay: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const click = () => {
    console.log(aboutRef.current);
    aboutRef.current.style.display = "flex";
    return aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <LandingNavBar />
      <div className="landingpage" id="home">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="blobs"
        >
          <Blob className="left" imgUrl={Blueblob} />
          <Blob className="top" imgUrl={Blueblob} />
          <Blob className="right" imgUrl={Blueblob} />
          <Blob className="bottom" imgUrl={Blueblob} />
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="maintext_name"
        >
          <div className="upText">
            <h5>
              Welcome to <span>Angor</span>
            </h5>
          </div>
          <div className="middleText">
            {loginCheck ? (
              <h2 onClick={() => setLoginCheck(true)}>Login</h2>
            ) : (
              <Login />
            )}
          </div>
          <div className="lowText">
            <h6>Are you new here?</h6>
          </div>
        </motion.div>
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="arrow"
        >
          <FaArrowDown onClick={click} className="arrowDown bounce" />
        </motion.div>
      </div>
      <div ref={aboutRef} className="about">
        sdnlsa
      </div>
    </>
  );
}
