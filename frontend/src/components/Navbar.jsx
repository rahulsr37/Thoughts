import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-white fixed w-full border-gray-200 dark:bg-black">
        <div className="max-w flex flex-wrap items-center justify-center md:justify-between p-4">
          <Link to="/" className="flex items-center">
            <img
              src="images/thoughts_favicon.png"
              className="h-8 mr-3"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Thoughts
            </span>
          </Link>
          {!localStorage.getItem("token") ? (
                <div>
                  <Link
                    to="/login"
                    className={`md:block hidden py-2 pl-3 pr-4 md:hover:text-blue-700 md:p-0 ${
                      location.pathname === "/login"
                        ? "text-blue-500"
                        : "text-white"
                    }`}
                  >
                    LOGIN
                  </Link>
                </div>
              ) : (
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-black md:dark:bg-black dark:border-black">
              <li>
                <Link
                  to="/"
                  className={`block py-2 pl-3 pr-4 md:hover:text-blue-700 md:p-0 ${
                    location.pathname === "/" ? "text-blue-500" : "text-white"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`block py-2 pl-3 pr-4 md:hover:text-blue-700 md:p-0 ${
                    location.pathname === "/about"
                      ? "text-blue-500"
                      : "text-white"
                  }`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/archives"
                  className={`block py-2 pl-3 pr-4 md:hover:text-blue-700 md:p-0 ${
                    location.pathname === "/archives"
                      ? "text-blue-500"
                      : "text-white"
                  }`}
                >
                  Archives
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className={`block py-2 pl-3 pr-4 md:hover:text-blue-700 md:p-0 ${
                    location.pathname === "/profile"
                      ? "text-blue-500"
                      : "text-white"
                  }`}
                >
                  Profile
                </Link>
              </li>
              <div>
                  <button
                    className={`block md:text-white md:p-0`}
                    onClick={handleLogout}
                  >
                    LOGOUT
                  </button>
                </div>
            </ul>
          </div>
           )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
