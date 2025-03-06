import { useEffect, useState } from "react";
import { UserCard } from "./UserCard";
import PropTypes from "prop-types";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

export const EditProfile = ({user: initialUser}) => {
  const [user, setUser] = useState(initialUser);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setErrorMessage("")
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", user, {
        withCredentials: true,
      });
      dispatch(addUser(res.user));
      setSuccessMessage("Profile saved successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      setErrorMessage(
        error?.response?.data || "An error occurred while saving the profile."
      );
    }
  };

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  return (
    user && (
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-base-200 pb-20">
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md m-4">
          <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
          {errorMessage && (
            <div className="alert alert-error mb-4">
              <div className="flex-1">
                <label>{errorMessage}</label>
              </div>
            </div>
          )}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Photo URL</label>
              <input
                type="text"
                name="photoUrl"
                value={user.photoUrl}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Age</label>
              <input
                type="number"
                name="age"
                value={user.age}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Gender</label>
              <select
                name="gender"
                value={user.gender}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Skills</label>
              <input
                type="text"
                name="skills"
                value={user.skills}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">About</label>
              <textarea
                name="about"
                value={user.about}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
              />
            </div>
            <button
              type="button"
              className="btn btn-primary mt-4"
              onClick={handleSave}
            >
              Save Profile
            </button>
          </form>
        </div>
        <div className="w-full max-w-md p-4 bg-neutral rounded-lg shadow-md m-4">
          <h2 className="text-2xl font-bold text-center">Preview</h2>
          <div className="p-4">
            <UserCard user={user} />
          </div>
        </div>
        {successMessage && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <div>
                <span>{successMessage}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
};

EditProfile.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    photoUrl: PropTypes.string,
    age: PropTypes.number,
    gender: PropTypes.string,
    skills: PropTypes.string,
    about: PropTypes.string,
  }).isRequired,
};
