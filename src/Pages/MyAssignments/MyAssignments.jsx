import useAuth from "../../Hooks/useAuth";
import useLoadData from "../../Hooks/useLoadData";
import Container from "../../Layout/Container";
import MyAssignmentsCard from "./MyAssignmentsCard";

const MyAssignments = () => {
  const { user } = useAuth();
  const url = `http://localhost:5000/submittedAssignments/${user?.email}`;
  const myAssignments = useLoadData(url, true);

  return (
    <div>
      <div className="text-center mt-10 px-4">
        <p className="tracking-widest font-bold text-primary-color">
          All The Assignments Submitted By Me
        </p>
        <h2 className="text-4xl text-secondary-color font-semibold">
          My Submitted Assignments
        </h2>
      </div>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
          {myAssignments?.map((assignment) => (
            <MyAssignmentsCard
              key={assignment?._id}
              assignment={assignment}
            ></MyAssignmentsCard>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default MyAssignments;
