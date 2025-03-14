import axios from "axios";
import PropTypes from "prop-types";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

export const UserCard = ({ user = {} }) => {
  const { _id: userId, firstName, lastName, photoUrl, about, gender, age, skills } = user;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      // Send request to the user
      const res = await axios.get(BASE_URL + `/request/send/${status}/${userId}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(removeFeed(userId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center bg-base-600 p-4">
      <div className="card bg-base-100 w-[340px] h-auto shadow-md rounded-lg flex flex-col items-center">
        <figure className="w-[280px] h-[300px] flex justify-center items-center mt-4 overflow-hidden rounded-lg">
          <img
            src={photoUrl || "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"}
            alt="User"
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body text-center p-4 w-full">
          {firstName && lastName && (
            <h2 className="card-title text-lg font-bold w-full flex justify-center">
              {firstName} {lastName}
            </h2>
          )}
          {age && gender && (
            <p className="text-gray-600">
              {age}, {gender}
            </p>
          )}
          {skills && (
            <p className="text-sm font-medium">
              <strong>Skills:</strong> {skills}
            </p>
          )}
          {about && <p className="text-xs text-gray-500">{about}</p>}
          <div className="card-actions mt-3 flex justify-center w-full gap-4">
            <button className="btn btn-error w-28" onClick={() => handleSendRequest("ignored", userId)}>Ignore</button>
            <button className="btn btn-success w-28" onClick={() => handleSendRequest("interested", userId)}>Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    photoUrl: PropTypes.string,
    about: PropTypes.string,
    gender: PropTypes.string,
    age: PropTypes.number,
    skills: PropTypes.string,
  }).isRequired,
};
