import PropTypes from "prop-types";
import useLoadData from "../../Hooks/useLoadData";
import { GiNotebook } from "react-icons/gi";

const SubmittedAssignmentCard = ({ assignment }) => {
  console.log(assignment);

  const assignmentId = assignment?.assignmentID;
  const assignmentURL = `http://localhost:5000/assignments/${assignmentId}`;
  const assignmentData = useLoadData(assignmentURL, false);

  const submittedBy = assignment?.submittedEmail;
  const submittedUserURL = `http://localhost:5000/users/${submittedBy}`;
  const submittedUser = useLoadData(submittedUserURL, false);
  console.log(submittedUser);

  return (
    <div>
      <div className="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="px-4 py-2 flex justify-between">
          <h1 className="font-bold text-gray-800 dark:text-white">
            {assignmentData?.title}
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <GiNotebook className="text-white text-lg "></GiNotebook>
            {assignmentData?.marks}
          </p>
        </div>

        <img
          className="object-cover w-full h-48 mt-2"
          src={assignmentData?.photoURL}
          alt="NIKE AIR"
        />

        <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
          <div className="flex items-center justify-end">
            <img
              className="object-cover h-8 w-8 rounded-full"
              src={submittedUser?.photoURL}
              alt="Avatar"
            />
            <p
              className="ml-4 font-semibold text-gray-700 dark:text-gray-200"
              tabIndex="0"
              role="link"
            >
              {submittedUser?.name}
            </p>
          </div>
          <button className="px-2 py-1 text-xs font-semibold text-white hover:text-gray-900 transition-colors duration-300 transform rounded bg-active-color hover:bg-gray-200 focus:outline-none">
            Give Mark
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmittedAssignmentCard;

SubmittedAssignmentCard.propTypes = {
  assignment: PropTypes.object,
};
