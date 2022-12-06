import React from "react";
import Navbar from "./Navbar";
import Blob from "./Blob";
import Blueblob from "./Blue_Blob.gif";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="home">
        <div className="dailyQuote"></div>
        <div className="blobContainer">
          <img className="blob" src={Blueblob} alt="something" />
        </div>
      </div>
    </>
  );
}
