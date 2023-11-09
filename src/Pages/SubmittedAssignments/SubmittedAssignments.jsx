import { toast } from "react-toastify";
import useLoadData from "../../Hooks/useLoadData";
import Container from "../../Layout/Container";
import SubmittedAssignmentCard from "./SubmittedAssignmentCard";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";

const SubmittedAssignments = () => {
  const submittedAssignmentsUrl = "/submittedAssignments";
  const { data: submittedAssignmentData, isLoading } = useLoadData(
    submittedAssignmentsUrl,
    true
  );

  const [showData, setShowData] = useState([]);

  useEffect(() => {
    const showPendingData = submittedAssignmentData?.filter(
      (assignment) => assignment?.status === "pending"
    );
    setShowData(showPendingData);
  }, [submittedAssignmentData]);

  const handleSubmit = (closeModal, assignmentData, assignment, e) => {
    e.preventDefault();
    const form = e.target;
    const givenMarks = form.marks.value;
    const feedback = form.feedback.value;
    const examinerData = { givenMarks, feedback, status: "completed" };

    if (givenMarks > assignmentData?.marks) {
      toast.error("Please provide a valid marks.");
    } else {
      axios
        .put(
          `http://localhost:5000/submittedAssignments/${assignment?._id}`,
          examinerData,
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            toast.success("Reviewed Assignment.");
            closeModal();
          }
        });
    }
    const remaining = showData?.filter(
      (data) => data?.difficulty !== "completed"
    );
    setShowData(remaining);
    console.log(remaining);
  };

  return (
    <div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div>
          <div className="text-center mt-10 px-4">
            <p className="tracking-widest font-bold text-primary-color">
              All The Submitted Assignments Are Here
            </p>
            <h2 className="text-4xl text-secondary-color font-semibold">
              Submitted Assignments
            </h2>
          </div>
          <Container>
            <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {showData?.map((assignment) => (
                <SubmittedAssignmentCard
                  key={assignment?._id}
                  assignment={assignment}
                  handleSubmit={handleSubmit}
                ></SubmittedAssignmentCard>
              ))}
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};

export default SubmittedAssignments;
