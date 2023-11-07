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
        axios.delete(`http://localhost:5000/assignments/${id}`).then((res) => {
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
                    {user?.email === assignment?.userEmail && (
                      <Link onClick={() => handleDelete(assignment?._id)} className="btn px-10 normal-case bg-transparent text-white font-bold tracking-wide">
                        Delete
                      </Link>
                    )}
                    <Link className="btn">Take Assignment</Link>
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
