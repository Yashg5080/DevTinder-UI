import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

export const NavBar = () => {
  const user = useSelector((state) => state.user);
  const data = user?.data;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(BASE_URL + "/logout", {}, {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(removeUser());
        navigate("/login");
      }
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="navbar bg-base-200 shadow-s">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to="/">💘DevTinder</Link>
      </div>
      <div className="flex gap-2 items-center">
        {data && (
          <>
            <span className="text-lg">Welcome {data.firstName}!</span>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
                onClick={toggleDropdown}
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={data?.photoUrl}
                  />
                </div>
              </div>
              {isDropdownOpen && (
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link className="justify-between" to="/profile">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
