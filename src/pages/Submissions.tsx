import { JSX, useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Settings2Icon, Plus } from "lucide-react";
import LoadingSpinnerCard from "../components/modals/LoadingSpinnerCard";
import ISubmission, { IUserSubmission } from "../types/submissions";
import { formatDate } from "date-fns"
import ListSubmissionsModal from "../components/modals/ListSubmissionsModal";
import AddSubmissionModal from "../components/modals/AddSubmissionModal";



function Submissions() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [submissions, setSubmissions] = useState<ISubmission[]>([]);
  const [submissionData, setSubmissionData] = useState<IUserSubmission[]>([]);
  const [submission_id, setSubmissionId] = useState<string>("");
  const [submission_context, setSubmissionContext] = useState<ISubmission>();

  const [
    createCourseModalIsOpen, setcreateCourseModalIsOpen
  ] = useState<boolean>(false);
  const [
    filterModalIsOpen, setfilterModalIsOpen
  ] = useState<boolean>(false);
  const [
    submissionModalIsOpen, setSubmissionModalIsOpen
  ] = useState<boolean>(false);
  const [
    addAubmissionModalIsOpen, setAddSubmissionModalIsOpen
  ] = useState<boolean>(false);

  const [courseBtnIsActive, setCourseBtnIsActive] = useState<boolean>(false);
  const [FilterModalIsActive, setFilterModalIsActive] = useState<boolean>(false);
  const [SubmissionModalIsActive, setSubmissionModalIsActive] = useState<boolean>(false);
  const [addSubmissionModalIsActive, setAddSubmissionModalIsActive] = useState<boolean>(false);

  const showFilterModal = () => {
    setFilterModalIsActive(!FilterModalIsActive);
    setfilterModalIsOpen(!filterModalIsOpen);
  }
  const showCreateCourseModal = () => {
    setCourseBtnIsActive(!courseBtnIsActive);
    setcreateCourseModalIsOpen(!createCourseModalIsOpen);
  }
  const showSubmissionCourseModal = () => {
    setSubmissionModalIsActive(!SubmissionModalIsActive);
    setSubmissionModalIsOpen(!submissionModalIsOpen);
  }
  const showAddSubmissionCourseModal = () => {
    setAddSubmissionModalIsActive(!addSubmissionModalIsActive);
    setAddSubmissionModalIsOpen(!addAubmissionModalIsOpen);
  }

  const listAllSubmissions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/submissions");
      const data = await response.json();
      setSubmissions(data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  const convertDateToString = (date: Date) => {
    if (!date) return date;
    return formatDate(date, "PPPP");
  }

  useEffect(() => {
    listAllSubmissions();
  }, []);

  if (isLoading) {
    return (
      <LoadingSpinnerCard />
    )
  }

  return (
    <>
      {
        user?.role === "instructor" &&
        <>
          <ListSubmissionsModal
            isOpen={submissionModalIsOpen}
            onclose={showSubmissionCourseModal}
            submission_data={submissionData}
            date_converter={convertDateToString}
          />
          <section
            className="
          w-full px-6 py-4 
          flex items-center justify-start
          border-b border-gray-200
          "
          >
            <nav
              className="w-full flex items-center gap-2"
            >

              <ActionButton
                icon={<Plus />}
                text="New Submission"
                isActive={courseBtnIsActive}
                onclickHandler={showCreateCourseModal} />
              <ActionButton
                icon={<Settings2Icon />}
                text="Filter"
                isActive={filterModalIsOpen}
                onclickHandler={showFilterModal} />

            </nav>
          </section>

          {
            submissions.length > 0 &&
            submissions.map((submission, index) =>
            (
              <div key={index}
                className="
          flex flex-col gap-2 cursor-pointer
          w-[95%] md:w-[70%]
          m-2 justify-between p-4 
          border rounded-md border-gray-200
        hover:border-sky-300
          "
                onClick={
                  () => {
                    setSubmissionData(submission.submissions!)
                    showSubmissionCourseModal();
                  }
                }
              >
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{submission?.title}</h3>
                    <p className="text-sm text-gray-500">
                      {
                        submission?.description?.length! > 50 ?
                          submission?.description?.substring(0, 50) + "..." :
                          submission?.description
                      }
                    </p>
                  </div>
                </div>
                <div>
                  <p
                    className="
              text-sm text-gray-500
              p-1.5
              flex fle-row-auto
              gap-1
              ">
                    <strong className="">Start Date</strong>
                    <span>{convertDateToString(submission?.start_date)}</span>
                  </p>
                  <p
                    className="
              text-sm text-gray-500
              p-1.5
              flex fle-row-auto
              gap-1
              ">
                    <strong className="">End Date</strong>
                    <span>{convertDateToString(submission?.due_date)}</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    {
                      submission?.submissions?.length === 1 ?
                        `${submission?.submissions?.length} submission` :
                        submission?.submissions?.length + " submissions"
                    }
                  </p>
                </div>
              </div>
            ))
          }
        </>
      }

      {
        user?.role === "learner" &&
        <>
        <AddSubmissionModal 
        isOpen={addAubmissionModalIsOpen}
        onclose={showAddSubmissionCourseModal}
        submission_id={submission_id}
        submission_data={submission_context!}
        user={user}
        />
          <section
            className="
          w-full px-6 py-4 
          flex items-center justify-start
          border-b border-gray-200
          "
          >
            <nav
              className="w-full flex items-center gap-2"
            >
              <ActionButton
                icon={<Settings2Icon />}
                text="Filter"
                isActive={filterModalIsOpen}
                onclickHandler={showFilterModal} />

            </nav>
          </section>

          {
            submissions.length > 0 &&
            submissions.map((submission, index) =>
            (
              <div key={index}
                className="
          flex flex-col gap-2 cursor-pointer
          w-[95%] md:w-[70%]
          m-2 justify-between p-4
          border rounded-md border-gray-200
          hover:border-sky-300
          "
                onClick={
                  () => {
                    setSubmissionId(submission._id!);
                    setSubmissionContext(submission);
                    showAddSubmissionCourseModal();
                  }
                }
              >
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{submission?.title}</h3>
                    <p className="text-sm text-gray-500">
                      {
                        submission?.description?.length! > 50 ?
                          submission?.description?.substring(0, 50) + "..." :
                          submission?.description
                      }
                    </p>
                  </div>
                </div>
                <div>
                  <p
                    className="
              text-sm text-gray-500
              p-1.5
              flex fle-row-auto
              gap-1
              ">
                    <strong className="">Start Date</strong>
                    <span>{convertDateToString(submission?.start_date)}</span>
                  </p>
                  <p
                    className="
              text-sm text-gray-500
              p-1.5
              flex fle-row-auto
              gap-1
              ">
                    <strong className="">End Date</strong>
                    <span>{convertDateToString(submission?.due_date)}</span>
                  </p>
                </div>
              </div>
            ))
          }
        </>
      }


    </>
  )
}

const ActionButton = (
  { icon, text, isActive, onclickHandler }:
    { icon: JSX.Element; text: string, isActive: boolean, onclickHandler: () => void }
) => {
  return (
    <button
      type="button"
      className={`
      ${isActive ? "bg-amber-600 text-white" : ""}
      flex items-center gap-2 p-2 
      rounded-md 
      transition-all cursor-pointer
      border 
      hover:bg-gray-50 hover:border-amber-600 hover:text-amber-600
      text-gray-900
      `}
      onClick={onclickHandler}
    >
      {icon}
      <span className="text-md">{text}</span>
    </button>
  );
};

export default Submissions