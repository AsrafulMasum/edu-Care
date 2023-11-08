import PropTypes from "prop-types";
import useLoadData from "../../Hooks/useLoadData";
import { GiNotebook } from "react-icons/gi";
import useData from "../../Hooks/useData";
import { toast } from "react-toastify";
import axios from "axios";

const SubmittedAssignmentCard = ({ assignment }) => {
  const { dark } = useData();

  const assignmentId = assignment?.assignmentID;
  const assignmentURL = `http://localhost:5000/assignments/${assignmentId}`;
  const assignmentData = useLoadData(assignmentURL, false);

  const submittedBy = assignment?.submittedEmail;
  const submittedUserURL = `http://localhost:5000/users/${submittedBy}`;
  const submittedUser = useLoadData(submittedUserURL, false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const givenMarks = form.marks.value;
    const feedback = form.feedback.value;
    const examinerData = { givenMarks, feedback, status: "completed" };
    console.log(assignment);
    if (givenMarks > assignmentData?.marks) {
      toast.error("Please provide a valid marks.");
    } else {
      axios
        .put(
          `http://localhost:5000/submittedAssignments/${assignment?._id}`,
          examinerData
        )
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            toast.success("Reviewed Assignment.");
            // navigate("/submittedAssignments");
          }
        });
    }
  };

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
          <button
            onClick={() => document.getElementById("giveMarkModal").showModal()}
            className="px-2 py-1 text-xs font-semibold text-white hover:text-gray-900 transition-colors duration-300 transform rounded bg-active-color hover:bg-gray-200 focus:outline-none"
          >
            Give Mark
          </button>

          {/* modal */}
          <dialog
            id="giveMarkModal"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box text-center">
              <h3 className="font-bold text-lg">Give marks to your friend !</h3>
              <p className="py-4">{assignment?.pdf}</p>
              <p className="py-4">{assignment?.quickNote}</p>
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    type="number"
                    name="marks"
                    placeholder="Give Marks"
                    required
                    className={
                      dark
                        ? "block w-full text-xs placeholder:text-white text-white py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                        : "block w-full text-xs placeholder:text-[#000000] text-[#000000] py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                    }
                  />
                </div>
                <div>
                  <textarea
                    type="text"
                    name="feedback"
                    placeholder="Feedback"
                    required
                    className={
                      dark
                        ? "block w-full text-xs placeholder:text-white text-white py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                        : "block w-full text-xs placeholder:text-[#000000] text-[#000000] py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="btn px-10 mt-10 normal-case bg-active-color border-none text-white font-bold tracking-wide"
                >
                  Submit
                </button>
              </form>
              <div>
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default SubmittedAssignmentCard;

SubmittedAssignmentCard.propTypes = {
  assignment: PropTypes.object,
};
