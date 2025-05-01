import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "end",
            padding: "20px",
            backgroundColor: "bisque",
            width: "100%",
          }}
        >
          <ul
            style={{
              display: "flex",
              gap: "20px",
              color: "blue",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/traffic"> Traffic Light</Link>
            </li>
            <li>
              <Link to="/about"> Infinity Scroll</Link>
            </li>{" "}
            <li>
              <Link to="/"> Todo</Link>
            </li>
            <li>
              <Link to="/stopwatch"> Stopwatch</Link>
            </li>
            <li>
              <Link to="/progress">Progress</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
