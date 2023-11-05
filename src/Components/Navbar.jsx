import { Link, NavLink } from "react-router-dom";
import useData from "../Hooks/useData";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";
import { BsSun } from "react-icons/bs";
import { CiDark } from "react-icons/ci";
import defaultUser from "./../../public/user.png";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const { dark, handleTheme } = useData();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("SignOut Successful.");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const navItems = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={(isActive) =>
            isActive ? "text-active-color font-bold" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/assignments"}
          className={(isActive) =>
            isActive ? "text-active-color font-bold" : ""
          }
        >
          Assignments
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/logIn"}
          className={(isActive) =>
            isActive ? "text-active-color font-bold" : "text-bg-text"
          }
        >
          Login
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="w-full navbar">
      <div className="flex-none lg:hidden">
        <label
          htmlFor="my-drawer-3"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="flex-1 px-2 mx-2">Navbar Title</div>
      <div>
        <div className="flex-none hidden lg:block">
          <ul className="menu menu-horizontal">
            {/* Navbar menu content here */}
            {navItems}
          </ul>
        </div>
        <div>
          {user ? (
            <div className="dropdown dropdown-end">
              <div className="flex justify-center items-center gap-2">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={user?.photoURL ? user.photoURL : defaultUser}
                      alt="User"
                    />
                  </div>
                </label>
              </div>
              <ul
                tabIndex={0}
                className="mt-2 z-50 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <p className="p-3">{user?.displayName && user.displayName}</p>

                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to={"/logIn"}
              className={
                dark
                  ? "btn normal-case btn-sm px-6 bg-primary hover:bg-primary text-white font-medium"
                  : "btn normal-case btn-sm px-6 bg-primary hover:bg-primary font-medium"
              }
            >
              Log In
            </Link>
          )}
        </div>
      </div>
      <div onClick={handleTheme} className="inline-block ml-4 cursor-pointer">
        {dark ? (
          <BsSun className="text-xl"></BsSun>
        ) : (
          <CiDark className="text-xl"></CiDark>
        )}
      </div>
    </div>
  );
};

export default Navbar;
