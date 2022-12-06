import "./styles.css";
import { motion } from "framer-motion";

export default function LandingNavBar() {
  const fadeInDown = {
    initial: {
      y: -60,
      opacity: 0
    },

    animate: {
      y: 0,
      opacity: 1,

      transition: {
        duration: 0.5,
        delay: 1.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <motion.div
        className="landing-navbar"
        variants={fadeInDown}
        initial="initial"
        animate="animate"
      >
        <div className="logo">
          <div className="logoTitle">
            <h2>Angor</h2>
          </div>
        </div>

        <div className="landing-navbar-menu">
          <div className="landing-nav-items">
            <p>
              <a className="item" href="#home">
                About Us
              </a>
            </p>
          </div>
          <div className="landing-nav-items">
            <p>
              <a className="item" href="#aboutus">
                About us
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
