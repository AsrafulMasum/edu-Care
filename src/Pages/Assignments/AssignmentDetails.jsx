import { Link, useNavigate, useParams } from "react-router-dom";
import useLoadData from "../../Hooks/useLoadData";
import Container from "../../Layout/Container";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import { GiNotebook } from "react-icons/gi";
import useData from "../../Hooks/useData";

const AssignmentDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { dark } = useData();

  const userEmail = user?.email;

  const assignmentUrl = `http://localhost:5000/assignments/${id}`;
  const submittedAssignmentUrl = "http://localhost:5000/submittedAssignments";

  const assignment = useLoadData(assignmentUrl, false);
  const submittedAssignment = useLoadData(submittedAssignmentUrl, false);

  const assignmentID = assignment?._id;

  const exists = submittedAssignment?.find(assignment => assignment?.assignmentID === assignmentID)

  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (user?.email === assignment?.userEmail) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:5000/assignments/${id}`)
            .then((res) => {
              if (res.data.deletedCount > 0) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your assignment has been deleted.",
                  icon: "success",
                });
                navigate("/assignments");
              }
            });
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You can't delete this assignment!",
      });
    }
  };

  const handleSubmitAssignment = (e) => {
    e.preventDefault();
    const form = e.target;
    const pdf = form.pdf.value;
    const quickNote = form.quickNote.value;

    const submittedData = {
      pdf,
      quickNote,
      submittedEmail: userEmail,
      status: "pending",
      assignmentID,
    };

    if (exists) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You already submitted this assignment !",
      });
    } else {
      axios
        .post("http://localhost:5000/submittedAssignments", submittedData)
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Submitted.",
              text: "Your assignment has been submitted.",
              icon: "success",
            });
          }
        });
    }
  };

  return (
    <div>
      <Container>
        <div className="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-12">
          <img
            className="object-cover w-full h-64"
            src={assignment?.photoURL}
            alt="Article"
          />

          <div className="p-6">
            <div>
              <div className="flex items-center gap-8">
                <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
                  {assignment?.difficulty}
                </span>
                <div className="flex items-center gap-1">
                  <GiNotebook className="text-active-color"></GiNotebook>
                  <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
                    {assignment?.marks}
                  </span>
                </div>
              </div>
              <p
                className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white"
                tabIndex="0"
                role="link"
              >
                {assignment?.title}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {assignment?.description}
              </p>
            </div>

            <div className="mt-4">
              <div className="flex flex-col gap-4">
                <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
                  {assignment?.dueDate}
                </span>
                <div className="flex flex-col gap-4 md:flex-row justify-between md:items-center">
                  <div className="flex items-center">
                    <img
                      className="object-cover h-10 w-10 rounded-full"
                      src={user?.photoURL}
                      alt="Avatar"
                    />
                    <p
                      className="mx-2 font-semibold text-gray-700 dark:text-gray-200"
                      tabIndex="0"
                      role="link"
                    >
                      {user?.displayName}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Link
                      onClick={() => handleDelete(assignment?._id)}
                      className="btn px-10 normal-case bg-transparent text-white font-bold tracking-wide"
                    >
                      Delete
                    </Link>

                    <div>
                      <Link
                        className="btn px-10 normal-case bg-active-color border-none text-white font-bold tracking-wide"
                        onClick={() =>
                          document.getElementById("my_modal_5").showModal()
                        }
                      >
                        Take Assignment
                      </Link>
                      <dialog
                        id="my_modal_5"
                        className="modal modal-bottom sm:modal-middle"
                      >
                        <div className="modal-box text-center">
                          <h3 className="font-bold text-lg">
                            Submit Your Assignment !
                          </h3>
                          <p className="py-4">
                            Submit your assignment PDF link here
                          </p>
                          <form onSubmit={handleSubmitAssignment}>
                            <div>
                              <input
                                type="url"
                                name="pdf"
                                placeholder="PDF Link"
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
                                name="quickNote"
                                placeholder="Quick Note"
                                required
                                className={
                                  dark
                                    ? "block w-full text-xs placeholder:text-white text-white py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                                    : "block w-full text-xs placeholder:text-[#000000] text-[#000000] py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                                }
                              />
                            </div>
                            {/* if there is a button in form, it will close the modal */}
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
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AssignmentDetails;
