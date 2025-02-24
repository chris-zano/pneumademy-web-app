import { ArrowUpDown, Plus, Settings2Icon } from "lucide-react";
import { useAuth } from "../context/AuthProvider"
import { JSX, useState } from "react";
import CreateCourseModal from "../components/modals/CreateCourseModal";

function Explore() {

  const { user } = useAuth();
  const [
    createCourseModalIsOpen, setcreateCourseModalIsOpen
  ] = useState<boolean>(false);


  const showFilterModal = () => {
    console.log("show filter modal");
  }
  const showSortModal = () => {
    console.log("show sort modal");
  }
  const showCreateCourseModal = () => {
    console.log("show create course modal");
    setcreateCourseModalIsOpen(!createCourseModalIsOpen);
  }

  if (user?.role === "learner") {
    window.location.replace("/dashboard");
    return null;
  }

  return (
    <>
      <CreateCourseModal isOpen={createCourseModalIsOpen} onclose={showCreateCourseModal} />
      {
        user?.role === "instructor" && (
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
                text="Create Course"
                isActive={false}
                onclickHandler={showCreateCourseModal} />
              <ActionButton
                icon={<Settings2Icon />}
                text="Filter"
                isActive={false}
                onclickHandler={showFilterModal} />
              <ActionButton
                icon={<ArrowUpDown />}
                text="Sort"
                isActive={true}
                onclickHandler={showSortModal} />

            </nav>
          </section>
        )
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

export default Explore