import { useSelector } from "react-redux";
import { useState } from "react";

export const NavBar = () => {
  const user = useSelector((state) => state.user);
  const data = user.data;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar bg-base-200 shadow-s">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">💘DevTinder</a>
      </div>
      <div className="flex gap-2 items-center">
        {user.data && (
          <>
            <span className="text-lg">Welcome {data?.user.firstName}!</span>
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
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a>Logout</a>
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
