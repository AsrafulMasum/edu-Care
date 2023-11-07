import { useParams } from "react-router-dom";
import useLoadData from "../../Hooks/useLoadData";
import Container from "../../Layout/Container";
import useAuth from "../../Hooks/useAuth";

const AssignmentDetails = () => {
  const { id } = useParams();

  const { user } = useAuth();

  const url = `http://localhost:5000/assignments/${id}`;

  const assignment = useLoadData(url, false);

  return (
    <div>
      <Container>
        <div className="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 mt-16">
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
                  21 SEP 2015
                </span>
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
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AssignmentDetails;
