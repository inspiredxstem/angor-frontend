import React from "react";
import Blueblob from "./Blue_Blob.gif";
import { NavLink } from "react-router-dom";
import {
  IoChatbubblesOutline,
  IoAccessibilityOutline,
  IoEyeOffSharp,
  IoGameController
} from "react-icons/io5";

export default function Navbar() {
  return (
    <>
      <nav className="appNavbar">
        <ul class="appNavbar-nav">
          <li class="nav-item">
            <div className="nav-link" id="circle"></div>
            <span className="link-text">your blob</span>
          </li>
          <li class="nav-item">
            <IoChatbubblesOutline className="nav-link" size={70} />
            <span className="link-text">Connect</span>
          </li>
          <li class="nav-item">
            <IoAccessibilityOutline className="nav-link" size={70} />
            <span className="link-text">Profile</span>
          </li>
          <li class="nav-item">
            <IoEyeOffSharp className="nav-link" size={70} />
            <span className="link-text">Something</span>
          </li>
          <li class="nav-item">
            <IoGameController className="nav-link" size={70} />
            <span className="link-text">Games</span>
          </li>
        </ul>
      </nav>
    </>
  );
}
