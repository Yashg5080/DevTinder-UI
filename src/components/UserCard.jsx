import PropTypes from "prop-types";

export const UserCard = ({ user = {} }) => {
  const { firstName, lastName, photoUrl, about, gender, age, skills } = user;
  return (
    <div className="flex justify-center items-center bg-base-600 p-4">
      <div className="card bg-base-100 w-[340px] h-auto shadow-md rounded-lg flex flex-col items-center">
        <figure className="w-[280px] h-[300px] flex justify-center items-center mt-4 overflow-hidden rounded-lg">
          <img
            src={photoUrl}
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
          {age && gender && <p className="text-gray-600">{age}, {gender}</p>}
          {skills && <p className="text-sm font-medium"><strong>Skills:</strong> {skills}</p>}
          {about && <p className="text-xs text-gray-500">{about}</p>}
          <div className="card-actions mt-3 flex justify-center w-full gap-4">
            <button className="btn btn-error w-28">Ignore</button>
            <button className="btn btn-success w-28">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    photoUrl: PropTypes.string,
    about: PropTypes.string,
    gender: PropTypes.string,
    age: PropTypes.number,
    skills: PropTypes.string,
  }).isRequired,
};
