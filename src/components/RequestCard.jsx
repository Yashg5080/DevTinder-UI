import PropTypes from "prop-types";

export const RequestCard = ({ request, onAccept, onReject }) => {
  const { firstName, lastName, photoUrl, skills, gender, age, about } = request;

  return (
    <div className="card bg-base-100 shadow-md rounded-lg p-4 m-4 w-full md:w-1/2 lg:w-1/3">
      <div className="flex items-center">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h2 className="text-lg font-bold">{firstName} {lastName}</h2>
          <p className="text-sm text-gray-600">{age}, {gender}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium"><strong>Skills:</strong> {skills}</p>
        <p className="text-xs text-gray-500 mt-2">{about}</p>
      </div>
      <div className="card-actions mt-4 flex justify-end gap-2">
        <button className="btn btn-success" onClick={() => onAccept(request)}>Accept</button>
        <button className="btn btn-error" onClick={() => onReject(request)}>Reject</button>
      </div>
    </div>
  );
};

RequestCard.propTypes = {
  request: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    photoUrl: PropTypes.string.isRequired,
    skills: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    about: PropTypes.string.isRequired,
  }).isRequired,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};