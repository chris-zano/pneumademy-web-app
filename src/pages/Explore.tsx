import { Plus, Settings2Icon } from "lucide-react";
import { useAuth } from "../context/AuthProvider"
import { JSX, useEffect, useState } from "react";
import CreateCourseModal from "../components/modals/CreateCourseModal";
import FilterModal from "../components/modals/FilterModal";
import DurationComponent from "../components/DurationComponent";
import CourseCard from "../components/CourseCard";
import Course from "../types/course";
import { getCourses } from "../api/courses";
import { BASEURL } from "../constants";

function Explore() {

  const { user, getHeaders } = useAuth();
  const [
    createCourseModalIsOpen, setcreateCourseModalIsOpen
  ] = useState<boolean>(false);
  const [
    filterModalIsOpen, setfilterModalIsOpen
  ] = useState<boolean>(false);

  const [courseBtnIsActive, setCourseBtnIsActive] = useState<boolean>(false);
  const [FilterModalIsActive, setFilterModalIsActive] = useState<boolean>(false);

  const [learnerEnrollments, setLearnerEnrollments] = useState<Course[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);


  const showFilterModal = () => {
    setFilterModalIsActive(!FilterModalIsActive);
    setfilterModalIsOpen(!filterModalIsOpen);
  }
  const showCreateCourseModal = () => {
    setCourseBtnIsActive(!courseBtnIsActive);
    setcreateCourseModalIsOpen(!createCourseModalIsOpen);
  }

  const handleUpdateCourseList = (course: Course): void => {
    courses.push(course);
  }

  useEffect(() => {
    const getLearnerEnrollments = async () => {

      const response = await fetch(
        `${BASEURL}enrollments?id=${user?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      const data = await response.json();
      return data;
    }
    const fetchCourses = async () => {
      const data = await getCourses(getHeaders);
      setCourses(data);
    }

    fetchCourses();

    if (user?.role === "learner") {
      getLearnerEnrollments().then((data) => {
        setLearnerEnrollments(data);
      });

    }

  }, [user?.role, user?.id, getHeaders]);

  return (
    <>
      {
        user?.role === "instructor" && (
          <>
            <CreateCourseModal
              isOpen={createCourseModalIsOpen}
              onclose={showCreateCourseModal}
              setCoursesCall={handleUpdateCourseList} />
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
                  <DurationComponent className="" field_name="duration" onChangeHandler={() => { }} />
                </div>
              ]}
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

            <section>
              <ul
                className="
                w-full
                flex flex-wrap
                p-4
                "
              >
                {courses.length === 0 ?
                  <div className="w-full flex justify-center items-center">
                    <p className="text-gray-500">No courses found</p>
                  </div>
                  : courses.map((course) => (
                    <li key={course?._id} className="m-2">
                      <CourseCard
                        id={course?._id}
                        title={course?.course_name}
                        description={course?.course_description}
                        instructor={course?.course_instructor}
                        progress={20}
                      />
                    </li>
                  ))}
              </ul>
            </section>
          </>

        )
      }

      {
        user?.role === "learner" && (
          <section>
            <ul
              className="
                w-full
                flex flex-wrap
                p-4
                "
            >
              {courses.map((course) => (
                <li key={course?._id} className="m-2">
                  <CourseCard
                    id={course?._id}
                    title={course?.course_name}
                    description={course?.course_description}
                    instructor={course?.course_instructor}
                    progress={20}
                    checkLearnerIsEnrolled={true}
                    showProgress={true}
                    learnerEnrollments={learnerEnrollments}
                  />
                </li>
              ))}
            </ul>
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