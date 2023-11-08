import useLoadData from "../../Hooks/useLoadData";
import Container from "../../Layout/Container";
import SubmittedAssignmentCard from "./SubmittedAssignmentCard";

const SubmittedAssignments = () => {
  const submittedAssignmentsUrl = "/submittedAssignments";
  const submittedAssignmentData = useLoadData(submittedAssignmentsUrl, false);

  const showData = submittedAssignmentData?.filter(assignment => assignment?.status === "pending")

  return (
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
            ></SubmittedAssignmentCard>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default SubmittedAssignments;
