import { ArrowUpDown, Plus, Settings2Icon } from "lucide-react";
import { useAuth } from "../context/AuthProvider"
import { JSX, useState } from "react";
import CreateCourseModal from "../components/modals/CreateCourseModal";
import FilterModal from "../components/modals/FilterModal";
import landinPageImage from '../assets/images/landing_page_image.webp'
import DurationComponent from "../components/DurationComponent";

function Explore() {

  const { user } = useAuth();
  const [
    createCourseModalIsOpen, setcreateCourseModalIsOpen
  ] = useState<boolean>(false);
  const [
    filterModalIsOpen, setfilterModalIsOpen
  ] = useState<boolean>(false);

  const [courseBtnIsActive, setCourseBtnIsActive] = useState<boolean>(false);
  const [FilterModalIsActive, setFilterModalIsActive] = useState<boolean>(false);


  const showFilterModal = () => {
    setFilterModalIsActive(!FilterModalIsActive);
    setfilterModalIsOpen(!filterModalIsOpen);
  }
  const showCreateCourseModal = () => {
    setCourseBtnIsActive(!courseBtnIsActive);
    setcreateCourseModalIsOpen(!createCourseModalIsOpen);
  }

  if (user?.role === "learner") {
    window.location.replace("/dashboard");
    return null;
  }

  const courses = [
    {
      id: "1",
      title: "React for Beginners",
      description: "Learn React from scratch and build interactive UIs.",
      instructor: "John Doe",
      banner: landinPageImage,
      progress: 45,
    },
    {
      id: "2",
      title: "Advanced TypeScript",
      description: "Master TypeScript and improve your development workflow.",
      instructor: "Jane Smith",
      banner: landinPageImage,
      progress: 80,
    },
    {
      id: "3",
      title: "Advanced Tailwinf",
      description: "Master Tailwind and improve your development workflow.",
      instructor: "Emily Doeth",
      banner: landinPageImage,
      progress: 80,
    },
  ];

  return (
    <>
      <CreateCourseModal
      isOpen={createCourseModalIsOpen} 
      onclose={showCreateCourseModal} />
      <FilterModal 
      isOpen={filterModalIsOpen}
      onclose={showFilterModal}
      title="Filter Courses"
      key="instructor"
      options={[
        <div className="flex flex-col space-y-1" key="difficulty">
          <label htmlFor="difficulty" className="text-gray-700 font-medium">Difficulty</label>
          <select name="difficulty" id="difficulty" className="p-2 border rounded-md ">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>,
        <div className="flex flex-col space-y-1" key="category">
          <label htmlFor="category" className="text-gray-700 font-medium">Category</label>
          <select name="category" id="category" className="p-2 border rounded-md">
            <option value="programming">Programming</option>
            <option value="math">Math</option>
            <option value="science">Science</option>
          </select>
        </div>,
        <div className="flex flex-col space-y-1" key="duration">
          <label htmlFor="duration" className="text-gray-700 font-medium">Duration</label>
          <DurationComponent className=""/>
        </div>
      ]}
      />
      
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
                isActive={courseBtnIsActive}
                onclickHandler={showCreateCourseModal} />
              <ActionButton
                icon={<Settings2Icon />}
                text="Filter"
                isActive={FilterModalIsActive}
                onclickHandler={showFilterModal} />

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