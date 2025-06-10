import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);

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
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
