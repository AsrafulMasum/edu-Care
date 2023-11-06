import useLoadData from "../../Hooks/useLoadData";
import Container from "../../Layout/Container";
import AssignmentCard from "./AssignmentCard";

const Assignments = () => {
  const allAssignmentData = useLoadData(
    "http://localhost:5000/assignments",
    false
  );

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
          <div>
            {
              allAssignmentData?.map(assignment => <AssignmentCard key={assignment._id} assignment={assignment}></AssignmentCard>)
            }
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Assignments;
