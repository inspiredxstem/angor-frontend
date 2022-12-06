import "./styles.css";
import { Routes, Route } from "react-router-dom";
import { ContextProvider } from "./SocketContext";

import Navbar from "./Navbar";
import Home from "./Home";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Connection from "./Connection";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/connection"
          element={
            <ContextProvider>
              <Connection />
            </ContextProvider>
          }
        />
      </Routes>
    </>
  );
}
