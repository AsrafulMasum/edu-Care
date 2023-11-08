import useLoadData from "../../Hooks/useLoadData";
import Container from "../../Layout/Container";
import SubmittedAssignmentCard from "./SubmittedAssignmentCard";

const SubmittedAssignments = () => {
  const submittedAssignmentsUrl = "http://localhost:5000/submittedAssignments";
  const submittedAssignmentData = useLoadData(submittedAssignmentsUrl, false);

  return (
    <div>
      <Container>
        <div className="my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {submittedAssignmentData?.map((assignment) => (
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
