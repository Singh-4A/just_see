import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { createContextData } from "../contextapi/contextApi";

const Layout = () => {
  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);

  const { darkTheme, darkThemeHandler } = useContext(createContextData);

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
            backgroundColor: !darkTheme ? "bisque" : "black",
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
            {!!userData?.name ? (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/traffic"> Traffic Light</Link>
                </li>
                <li>
                  <Link to="/scroll"> Infinity Scroll</Link>
                </li>{" "}
                <li>
                  <Link to="todo"> Todo</Link>
                </li>
                <li>
                  <Link to="/stopwatch"> Stopwatch</Link>
                </li>
                <li>
                  <Link to="/progress">Progress</Link>
                </li>
                <li>
                  <Link to="/drag"> Drag</Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      localStorage.clear();
                      window.open("/login");
                    }}
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
            <li
              style={{
                backgroundColor: darkTheme ? "white" : "black",
                color: darkTheme ? "black" : "white",
                // height: 50,
                // width: 100,
                border: "1px solid white",
                borderRadius: 20,
              }}
              onClick={darkThemeHandler}
            >
              {" "}
              Dark Theme
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
