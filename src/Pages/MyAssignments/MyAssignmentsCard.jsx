import PropTypes from "prop-types";
import useLoadData from "../../Hooks/useLoadData";
import { GiNotebook } from "react-icons/gi";

const MyAssignmentsCard = ({ assignment }) => {
  const assignmentId = assignment?.assignmentID;
  const assignmentURL = `http://localhost:5000/assignments/${assignmentId}`;
  const assignmentData = useLoadData(assignmentURL, true);

  return (
    <div>
      <div className="w-full h-full px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-400 flex items-center gap-2">
            <GiNotebook className="text-white text-lg "></GiNotebook>
            {assignmentData?.marks}
          </span>
          <span className="px-3 py-1 text-xs text-white uppercase bg-active-color rounded-full">
            {assignment?.status}
          </span>
        </div>

        <div>
          <h1 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
            {assignmentData?.title}
          </h1>
          <img className="mt-2 rounded" src={assignmentData?.photoURL} alt="" />
        </div>

        <div>
          {assignment?.status === "completed" && (
            <div className="mt-2 space-y-2 text-gray-200">
              <span>Obtain marks : {assignment?.givenMarks}</span>
              <p>
                feedback : {assignment?.feedback}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAssignmentsCard;

MyAssignmentsCard.propTypes = {
  assignment: PropTypes.object,
};
