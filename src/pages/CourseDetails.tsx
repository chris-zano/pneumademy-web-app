import { JSX, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourse, getCourseLessons } from "../api/courses";
import Course from "../types/course";
import { useAuth } from "../context/AuthProvider";
import { PenIcon, Plus } from "lucide-react";
import Lesson, { ContentType } from "../types/lesson";
import EditCourseModal from "../components/modals/EditCourseModal";
import AddLessonModal from "../components/modals/AddLessonModal";
import { FaFilePdf, FaFileImage, FaFilePowerpoint, FaFileVideo, FaFileWord, FaFileAudio } from 'react-icons/fa';


function CourseDetails() {
  const { user } = useAuth();
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);

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

  useEffect(() => {
    const getCourseData = async (id: string) => {
      const data: Course = await getCourse(id);
      setCourse(data);
    }

    getCourseData(id as string);
  }, []);

  useEffect(() => {
    const getLessons = async (id: string) => {
      const data: Lesson[] = await getCourseLessons(id);
      setLessons(data);
      console.log(data);
    }

    getLessons(id as string);
  }, []);

  const updateLessonsListOnPage = () => {

    console.log({ update_lessons_list: "Function has been called" })
  }


  const getFileIcon = (contentType: ContentType) => {
    switch (contentType) {
      case ContentType.PDF:
        return <FaFilePdf className="text-red-500" />;
      case ContentType.Image:
        return <FaFileImage className="text-blue-500" />;
      case ContentType.PowerPoint:
        return <FaFilePowerpoint className="text-orange-500" />;
      case ContentType.Video:
        return <FaFileVideo className="text-purple-500" />;
      case ContentType.WordDocument:
        return <FaFileWord className="text-blue-600" />;
      case ContentType.Audio:
        return <FaFileAudio className="text-green-500" />;
      default:
        return <p>Unknown</p>;
    }
  };


  return (
    <>

      <EditCourseModal
        isOpen={createCourseModalIsOpen}
        onclose={showCreateCourseModal}
        setCoursesCall={() => { }}
        course_data={course}
        key={course?._id} />
      <AddLessonModal
        isOpen={filterModalIsOpen}
        onClose={showFilterModal}
        setLessonsCall={updateLessonsListOnPage}
        key={0}
        course_id={id} />

      {
        user?.role === "instructor" &&
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
              text="Add Lesson"
              isActive={false}
              onclickHandler={showFilterModal} />
            <ActionButton
              icon={<PenIcon />}
              text="Edit"
              isActive={false}
              onclickHandler={showCreateCourseModal} />

          </nav>
        </section>
      }

      {
        course &&
        <div className="flex flex-col p-2 w-[70%] space-y-2">

          <h1 className="text-2xl font-bold">{course.course_name}</h1>
          <p className="text-gray-500">{course.course_description}</p>
          <p className="text-gray-500">
            <strong>Course Code:</strong> {course.course_code}
          </p>
          <p className="text-gray-500">
            <strong>Duration: </strong>{course.course_duration}
          </p>

          <section
            className="my-2 py-2 border-t border-t-slate-300">

            <h3 className="my-4 text-2xl font-semibold"
            >Lessons</h3>

            {
              lessons.length === 0 ?
                <p className="text-gray-500">No lessons yet</p>
                :
                lessons.map((lesson) => (
                  <details key={lesson._id} className="flex flex-col p-4 border border-slate-200 rounded-lg cursor-pointer">
                    <summary>{lesson.title}</summary>
                    <article
                      className="flex text-lg py-2 px-5 items-center gap-3"
                      onClick={() => {}}>
                      {getFileIcon(lesson.content_type)}
                      <p className="text-gray-500">
                        {lesson.title} [ {lesson.content_type} ]
                      </p>
                    </article>
                  </details>
                ))

            }
          </section>

        </div>
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

export default CourseDetails