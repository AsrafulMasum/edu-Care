import useData from "../../Hooks/useData";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";

const AddAssignment = () => {
  const { dark } = useData();

  const { user } = useAuth();
  const userEmail = user.email;

  // const [assignmentData, setAssignmentData] = useState({})

  // const url = "http://localhost:5000/assignments"

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const difficulty = form.difficulty.value;
    const marks = form.marks.value;
    const dueDate = form.dueDate.value;
    const photoURL = form.photoURL.value;
    const description = form.description.value;

    form.reset();

    const assignment = {
      title,
      difficulty,
      marks,
      dueDate,
      photoURL,
      description,
      userEmail,
    };
    // setAssignmentData(assignment);
    axios
      .post("http://localhost:5000/assignments", assignment)
      .then((res) => console.log(res.data));
  };
  // const {isPending, error, data} = useQuery({
  //   queryKey: ['assignment-post'],
  //   queryFn: () => {
  //     axios.post(url, assignmentData)
  //     .then(res => console.log(res.data))
  //   }
  // })

  // useEffect(() => {
  //   const response = usePostData(url, assignmentData)
  //   console.log(response);
  // } , [])

  return (
    <div
      className="-mt-[68px] min-h-screen pt-36"
      style={{
        background: ` url("https://themeforest.wprealizer.com/html-educoda-preview/educoda/assets/images/shape/hero-shape-3.png")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(39, 18, 123, 0.3)",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="w-full max-w-4xl p-6 m-auto mx-auto rounded border border-[#ABABAB]">
        <div>
          <h2 className="text-lg font-bold">Insert a Assignment</h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              required
              className={
                dark
                  ? "block w-full text-xs placeholder:text-white text-white py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                  : "block w-full text-xs placeholder:text-[#000000] text-[#000000] py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
              }
            />
          </div>

          <div
            className={
              dark
                ? "block w-full text-xs placeholder:text-white text-white bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                : "block w-full text-xs placeholder:text-[#000000] text-[#000000] bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
            }
          >
            <select
              name="difficulty"
              className={
                dark
                  ? "block w-full h-10 text-xs placeholder:text-white text-white bg-transparent focus:outline-none focus:bg-transparent"
                  : "block w-full h-10 text-xs placeholder:text-[#000000] text-[#000000] bg-transparent focus:outline-none focus:bg-transparent"
              }
            >
              <option className="text-black" value="Easy">
                Easy
              </option>
              <option className="text-black" value="Medium">
                Medium
              </option>
              <option className="text-black" value="Hard">
                Hard
              </option>
            </select>
          </div>

          <div>
            <input
              type="text"
              name="marks"
              placeholder="Assignment Marks"
              required
              className={
                dark
                  ? "block w-full text-xs placeholder:text-white text-white py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                  : "block w-full text-xs placeholder:text-[#000000] text-[#000000] py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
              }
            />
          </div>

          <div>
            <input
              type="date"
              name="dueDate"
              placeholder="Due Date"
              required
              className={
                dark
                  ? "block w-full text-xs placeholder:text-white text-white py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                  : "block w-full text-xs placeholder:text-[#000000] text-[#000000] py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
              }
            />
          </div>

          <div>
            <input
              type="text"
              name="photoURL"
              placeholder="Photo URL"
              required
              className={
                dark
                  ? "block w-full text-xs placeholder:text-white text-white py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                  : "block w-full text-xs placeholder:text-[#000000] text-[#000000] py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
              }
            />
          </div>

          <div>
            <textarea
              type="text"
              name="description"
              placeholder="Description"
              required
              className={
                dark
                  ? "block w-full text-xs placeholder:text-white text-white py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                  : "block w-full text-xs placeholder:text-[#000000] text-[#000000] py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
              }
            />
          </div>

          <div className="mt-6">
            <button
              className={
                dark
                  ? "w-full px-6 py-2.5 text-sm font-medium tracking-wide rounded-sm bg-active-color text-white"
                  : "w-full px-6 py-2.5 text-sm font-medium tracking-wide rounded-sm bg-active-color"
              }
            >
              Add This Place
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAssignment;
