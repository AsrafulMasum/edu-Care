import axios from "axios";
// import useLoadData from "../../Hooks/useLoadData";
import Container from "../../Layout/Container";
import AssignmentCard from "./AssignmentCard";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const Assignments = () => {
  const allAssignmentData = useLoaderData()

  const [showAssignment, setShowAssignment] = useState([]);
  const [currentPage, setCurrentPage] = useState(0)

  const count = allAssignmentData?.length
  const itemsPerPage = 3
  const numberOfPages = Math.ceil(count / itemsPerPage)

  const pages = [...Array(numberOfPages).keys()]

  useEffect(()=>{
    axios.get(`https://assignment11-server-xi.vercel.app/assignments?page=${currentPage}&size=${itemsPerPage}`)
    .then(res => {
      console.log(res.data);
    })
  },[currentPage])

  const handleFilter = (filter) => {
    if (filter === "All") {
      setShowAssignment(allAssignmentData);
    } else if (filter === "Easy") {
      const easy = allAssignmentData?.filter(
        (assignment) => assignment?.difficulty === "Easy"
      );
      setShowAssignment(easy);
    } else if (filter === "Medium") {
      const medium = allAssignmentData?.filter(
        (assignment) => assignment?.difficulty === "Medium"
      );
      setShowAssignment(medium);
    } else if (filter === "Hard") {
      const hard = allAssignmentData?.filter(
        (assignment) => assignment?.difficulty === "Hard"
      );
      setShowAssignment(hard);
    }
  };

  useEffect(() => {
    if (showAssignment.length === 0) {
      setShowAssignment(allAssignmentData);
    }
  }, [showAssignment, allAssignmentData]);

  return (
    <div>
      <Container>
        <div className="my-10">
          <div className="md:text-center mb-10 space-y-4 relative">
            <p className="tracking-widest font-bold text-primary-color">
              All The Assignments Are Here
            </p>
            <h2 className="text-4xl text-secondary-color font-semibold">
              Assignments
            </h2>
            <div className="dropdown dropdown-hover dropdown-bottom dropdown-end absolute top-0 right-0">
              <label
                tabIndex={0}
                className="btn hover:bg-active-color hover:text-white md:px-10 normal-case m-1"
              >
                Difficulty
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <button onClick={() => handleFilter("All")}>All</button>
                </li>
                <li>
                  <button onClick={() => handleFilter("Easy")}>Easy</button>
                </li>
                <li>
                  <button onClick={() => handleFilter("Medium")}>Medium</button>
                </li>
                <li>
                  <button onClick={() => handleFilter("Hard")}>Hard</button>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {showAssignment?.map((assignment) => (
              <AssignmentCard
                key={assignment._id}
                assignment={assignment}
              ></AssignmentCard>
            ))}
          </div>
        </div>
        <div className="text-center mb-10">
          {
            pages?.map((page, idx) => <button onClick={() => setCurrentPage(page)} className="btn bg-active-color mr-1" key={idx}>{page}</button>)
          }
        </div>
      </Container>
    </div>
  );
};

export default Assignments;
