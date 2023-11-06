import Swal from "sweetalert2";
import useLoadData from "../../Hooks/useLoadData";
import Container from "../../Layout/Container";
import AssignmentCard from "./AssignmentCard";
import axios from "axios";
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
          }
        });
      }
    });
  };

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
                handleDelete={handleDelete}
              ></AssignmentCard>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Assignments;
