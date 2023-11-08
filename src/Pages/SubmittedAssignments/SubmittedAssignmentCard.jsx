import PropTypes from "prop-types";
import useLoadData from "../../Hooks/useLoadData";
import { GiNotebook } from "react-icons/gi";
import { toast } from "react-toastify";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import useData from "../../Hooks/useData";

const SubmittedAssignmentCard = ({ assignment }) => {
  const { dark } = useData();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const assignmentId = assignment?.assignmentID;
  const assignmentURL = `http://localhost:5000/assignments/${assignmentId}`;
  const assignmentData = useLoadData(assignmentURL, false);

  const submittedBy = assignment?.submittedEmail;
  const submittedUserURL = `http://localhost:5000/users/${submittedBy}`;
  const submittedUser = useLoadData(submittedUserURL, false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const givenMarks = form.marks.value;
    const feedback = form.feedback.value;
    const examinerData = { givenMarks, feedback, status: "completed" };
    console.log(assignment);
    if (givenMarks > assignmentData?.marks) {
      toast.error("Please provide a valid marks.");
    } else {
      axios
        .put(
          `http://localhost:5000/submittedAssignments/${assignment?._id}`,
          examinerData
        )
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            toast.success("Reviewed Assignment.");
            closeModal();
          }
        });
    }
  };

  return (
    <div>
      <div className="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="px-4 py-2 flex justify-between">
          <h1 className="font-bold text-gray-800 dark:text-white">
            {assignmentData?.title}
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <GiNotebook className="text-white text-lg "></GiNotebook>
            {assignmentData?.marks}
          </p>
        </div>

        <img
          className="object-cover w-full h-48 mt-2"
          src={assignmentData?.photoURL}
          alt="NIKE AIR"
        />

        <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
          <div className="flex items-center justify-end">
            <img
              className="object-cover h-8 w-8 rounded-full"
              src={submittedUser?.photoURL}
              alt="Avatar"
            />
            <p
              className="ml-4 font-semibold text-gray-700 dark:text-gray-200"
              tabIndex="0"
              role="link"
            >
              {submittedUser?.name}
            </p>
          </div>
          <button
            onClick={openModal}
            className="px-2 py-1 text-xs font-semibold text-white hover:text-gray-900 transition-colors duration-300 transform rounded bg-active-color hover:bg-gray-200 focus:outline-none"
          >
            Give Mark
          </button>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Give marks to your friend !
                      </Dialog.Title>
                      <a
                        href={assignment?.pdf}
                        className="py-4 text-primary-color"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {assignment?.pdf}
                      </a>
                      <p className="pb-4">
                        Quick Note : {assignment?.quickNote}
                      </p>
                      <form onSubmit={handleSubmit}>
                        <div>
                          <input
                            type="number"
                            name="marks"
                            placeholder="Give Marks"
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
                            name="feedback"
                            placeholder="Feedback"
                            required
                            className={
                              dark
                                ? "block w-full text-xs placeholder:text-white text-white py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                                : "block w-full text-xs placeholder:text-[#000000] text-[#000000] py-2 pl-1 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                            }
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn px-10 mt-10 normal-case bg-active-color border-none text-white font-bold tracking-wide"
                        >
                          Submit
                        </button>
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </div>
    </div>
  );
};

export default SubmittedAssignmentCard;

SubmittedAssignmentCard.propTypes = {
  assignment: PropTypes.object,
};
