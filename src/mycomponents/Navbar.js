import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
// import { GoPerson } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = (props) => {
  const [activeLink, setActiveLink] = useState("");

  // eslint-disable-next-line 
  const [active, setActive] = useState("navbar");

  const showBar = (event) => {
    event.preventDefault();
    setActive("navbar activeNavbar");
  };
  const closeBar = (event) => {
    event.preventDefault();
    setActive("navbar");
  };

  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  // let location = useLocation();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
     // Show alert only when theme is toggled
     props.showAlert(`Switched to ${newTheme === "dark" ? "Dark" : "Light"} Mode`, "success");
  };

  return (
    <div className="navbar-section">
      <div className="header flex items-center justify-between px-3 py-3 lg:py-4 border-b-[2px] border-solid border-[hsl(214.3_31.8%_91.4%)] dark:border-b-[1px] dark:border-b-solid dark:border-[hsl(214.3_31.8%_18.4%)]">
        <div className="logodiv">
          <Link to="/">
            <h1 className="text-xl font-bold w-24 xl:relative xl:z-[100000] dark:text-white">
              Quizinaut
            </h1>
          </Link>
        </div>

        <div
          className={` bg-white w-full p-4 text-center absolute top-0 left-[-500%] z-[3000] lg:left-0 lg:bg-transparent xl:bg-white justify-center lg:flex lg:items-center lg:justify-end  dark:bg-[rgb(14,16,21)]`}
        >
          <div className="navList lg:flex lg:items-center">
            <li className="navItem list-none lg:mr-3">
              <Link
                to="/"
                className={`navLink text-md font-medium hover:text-[#4668DF] hover:cursor-pointer dark:text-white ${
                  activeLink === "Home" ? "text-[#775BE5]" : "text-black"
                }`}
                onClick={() => setActiveLink("Home")}
              >
                Home
              </Link>
            </li>
            <li className="navItem list-none mt-2 lg:mt-0 lg:mr-3">
              <Link
                to="/dashboard"
                className={`navLink text-md font-medium hover:text-[#4668DF] hover:cursor-pointer dark:text-white ${
                  activeLink === "Dashboard" ? "text-[#775BE5]" : "text-black"
                }`}
                onClick={() => setActiveLink("Dashboard")}
              >
                Dashboard
              </Link>
            </li>
            <li className="navItem list-none mt-2 lg:mt-0 lg:mr-3">
              <Link
                to="/quizes"
                className={`navLink text-md font-medium hover:text-[#4668DF] hover:cursor-pointer dark:text-white ${
                  activeLink === "Quizes" ? "text-[#775BE5]" : "text-black"
                }`}
                onClick={() => setActiveLink("Quizes")}
              >
                Quizes
              </Link>
            </li>
            <li className="navItem list-none mt-2 lg:mt-0 lg:mr-2">
              <Link
                to="/feedback"
                className="navLink text-md font-medium hover:bg-[hsl(214.3_31.8%_91.4%)] px-2 py-1 rounded-lg lg:border-2 lg:border-solid lg:border-[hsl(214.3 31.8% 91.4%)] border-none hover:cursor-pointer dark:text-white dark:border dark:border-solid dark:border-[hsl(214.3 31.8% 91.4%)] dark:hover:text-[rgb(14,16,21)]"
              >
                Feedback
              </Link>
            </li>

            <button
              onClick={toggleTheme}
              className={`px-3 py-2 rounded lg:mr-1 transition-colors duration-300 
              ${
                theme === "light"
                  ? "bg-transparent text-black hover:bg-[rgb(230,230,230)]"
                  : "bg-[rgb(14,16,21)] text-white hover:bg-[rgb(34,37,45)]"
              } dark:bg-[rgb(14,16,21)] dark:hover:bg-[rgb(57,61,72)]`}
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>

            <div className="btn flex justify-center items-center mt-4 lg:mt-0 ">
              {!localStorage.getItem("token") ? (
                <form className="d-flex">
                  <Link
                    className="rounded-lg lg:border-2 lg:border-solid lg:border-[hsl(214.3 31.8% 91.4%)] px-2 py-1 bg-[#367cf4] text-md font-medium text-white dark:border-none"
                    to="/signup"
                    role="button"
                  >
                    Signup
                  </Link>
                  <Link
                    className="rounded-lg lg:border-2 lg:border-solid lg:border-[hsl(214.3 31.8% 91.4%)] px-2 py-1 bg-[#367cf4] text-md font-medium text-white dark:border-none dark:lg:mr-1"
                    to="/login"
                    role="button"
                  >
                    Login
                  </Link>
                </form>
              ) : (
                <button
                  onClick={handleLogout}
                  className="rounded-lg lg:border-2 lg:border-solid lg:border-[hsl(214.3 31.8% 91.4%)] px-2 py-1 bg-[#367cf4] text-md font-medium text-white dark:border-none"
                >
                  Logout
                </button>
              )}
            </div>
            <div
              className="absolute top-3 right-3 text-3xl cursor-pointer lg:hidden"
              onClick={closeBar}
            >
              <IoCloseCircle />
            </div>
          </div>
        </div>
        <div className="hamburger text-3xl lg:hidden">
          <button className="bars" onClick={showBar}>
            <FaBars />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
