import React, { useState, useEffect } from "react";
import { FaBars, FaSun, FaMoon } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ showAlert }) => {
  const [activeLink, setActiveLink] = useState("Home");
  const [active, setActive] = useState("navbar");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();

  // Handle the navbar visibility
  const toggleNavbar = (isOpen) => {
    setActive(isOpen ? "navbar activeNavbar" : "navbar");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    showAlert(`Switched to ${newTheme === "dark" ? "Dark" : "Light"} Mode`, "success");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar-section sticky top-0 lg:bg-white/20 z-[1000] lg:backdrop-blur-xl lg:shadow-xl transition-all duration-300 dark:bg-gray-900">
      <div className="header flex items-center justify-between py-2 lg:py-0">
        <div className="logodiv lg:static lg:mr-4 lg:w-auto w-40 ml-3">
          <Link to="/">
            <h1 className="text-xl font-bold w-24 xl:relative xl:z-[100000] dark:text-white">Quizinaut</h1>
          </Link>
        </div>

        {/* Navbar content */}
        <div className={`${active} bg-slate-800 lg:bg-transparent w-full p-4 text-center absolute top-0 left-[-500%] z-[3000] lg:left-0 lg:flex lg:items-center md:justify-between lg:justify-end transition-transform duration-300 lg:static`}>
          {/* Nav List */}
          <ul className="navList lg:flex lg:items-center">
            {["Home", "Quizes", "Feedback"].map((link) => (
              <li className="navItem list-none mt-2 lg:mt-0 lg:mr-3" key={link}>
                <Link
                  to={`/${link.toLowerCase()}`}
                  className={`navLink text-md font-medium hover:text-[#4668DF] dark:text-white ${activeLink === link ? "text-[#775BE5] dark:text-[#775BE5]" : "text-black"}`}
                  onClick={() => setActiveLink(link)}
                >
                  {link}
                </Link>
              </li>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              className={`px-3 py-2 rounded lg:mr-1 transition-colors duration-300 ${theme === "light" ? "bg-[rgb(240,240,240)] text-black hover:bg-[rgb(230,230,230)]" : "bg-[rgb(30,30,30)] text-white hover:bg-[rgb(50,50,50)]"}`}
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>

            {/* Sign Up and Login Buttons */}
            <div className="btn flex justify-center items-center mt-4 lg:mt-0">
              {!localStorage.getItem("token") ? (
                <div className="flex gap-2">
                  <Link className="rounded-lg lg:border-2 lg:border-solid lg:border-[hsl(214.3 31.8% 91.4%)] px-2 py-1 bg-[#367cf4] text-md font-medium text-white" to="/signup">Signup</Link>
                  <Link className="rounded-lg lg:border-2 lg:border-solid lg:border-[hsl(214.3 31.8% 91.4%)] px-2 py-1 bg-[#367cf4] text-md font-medium text-white" to="/login">Login</Link>
                </div>
              ) : (
                <button onClick={handleLogout} className="rounded-lg lg:border-2 lg:border-solid lg:border-[hsl(214.3 31.8% 91.4%)] px-2 py-1 bg-[#367cf4] text-md font-medium text-white">
                  Logout
                </button>
              )}
            </div>

            {/* Close Button for Mobile */}
            <div className="absolute top-3 right-3 text-3xl cursor-pointer lg:hidden transition-transform duration-300 hover:rotate-90" onClick={() => toggleNavbar(false)}>
              <IoCloseCircle />
            </div>
          </ul>
        </div>

        {/* Hamburger Menu */}
        <div className="hamburger text-3xl lg:hidden">
          <button className="bars transition-transform duration-300 hover:rotate-90 text-black" onClick={() => toggleNavbar(true)}>
            <FaBars />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
