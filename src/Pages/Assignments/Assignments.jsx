import useLoadData from "../../Hooks/useLoadData";
import Container from "../../Layout/Container";
import AssignmentCard from "./AssignmentCard";
import { useEffect, useState } from "react";

const Assignments = () => {
  const allAssignmentData = useLoadData(
    "http://localhost:5000/assignments",
    false
  );

  const [showAssignment, setShowAssignment] = useState([]);

  useEffect(() => {
    setShowAssignment(allAssignmentData);
  }, [showAssignment, allAssignmentData]);

  return (
    <div>
      <Container>
        <div className="my-10">
          <div className="text-center mb-10 space-y-4">
            <p className="tracking-widest font-bold text-primary-color">
              All The Assignments Are Here
            </p>
            <h2 className="text-4xl text-secondary-color font-semibold">
              Assignments
            </h2>
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
      </Container>
    </div>
  );
};

export default Assignments;
