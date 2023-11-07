import { Link, useNavigate, useParams } from "react-router-dom";
import useLoadData from "../../Hooks/useLoadData";
import Container from "../../Layout/Container";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";

const AssignmentDetails = () => {
  const { id } = useParams();

  const { user } = useAuth();

  const url = `http://localhost:5000/assignments/${id}`;

  const assignment = useLoadData(url, false);

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
              <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
                {assignment?.difficulty}
              </span>
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
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Hello!</h3>
                          <p className="py-4">
                            Press ESC key or click the button below to close
                          </p>
                          <div className="modal-action">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal */}
                              <button className="btn">Close</button>
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
