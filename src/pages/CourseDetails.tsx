import { JSX, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourse, getCourseLessons } from "../api/courses";
import Course from "../types/course";
import { useAuth } from "../context/AuthProvider";
import { Delete, DeleteIcon, PenIcon, Plus, Trash } from "lucide-react";
import Lesson, { ContentType } from "../types/lesson";
import EditCourseModal from "../components/modals/EditCourseModal";
import AddLessonModal from "../components/modals/AddLessonModal";
import GoogleViewModal from "../components/modals/GoogleViewModal";
import { FaFilePdf, FaFileImage, FaFilePowerpoint, FaFileVideo, FaFileWord, FaFileAudio } from 'react-icons/fa';
import { BASEURL } from "../constants";
import LoadingSpinnerCard from "../components/modals/LoadingSpinnerCard";


function CourseDetails() {
  const { user } = useAuth();
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [
    createCourseModalIsOpen, setcreateCourseModalIsOpen
  ] = useState<boolean>(false);
  const [
    filterModalIsOpen, setfilterModalIsOpen
  ] = useState<boolean>(false);

  const [courseBtnIsActive, setCourseBtnIsActive] = useState<boolean>(false);
  const [FilterModalIsActive, setFilterModalIsActive] = useState<boolean>(false);

  const [isGoogleOpen, setIsGoogleOpen] = useState(false);

  const [fileUrl, setFileUrl] = useState("");



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
    setIsLoading(true);
    const getLessons = async (id: string) => {
      const data: Lesson[] = await getCourseLessons(id);
      console.log(data);
      setLessons(data);
      setIsLoading(false);
    }

    getLessons(id as string);
  }, []);

  const updateLessonsListOnPage = (lesson: Lesson) => {
    lessons.push(lesson);
    setLessons([...lessons]);
  }

  const updateFileUrl = (lesson: Lesson) => {
    const fileType = lesson.content_type;
    console.log({ fileType });
    setFileUrl(lesson.content);
    setIsGoogleOpen(true);

  }

  const handleDeleteLesson = async (lesson: Lesson) => {
    setIsLoading(true);
    const response = await fetch(
      `${BASEURL}lessons/${lesson._id}`,
      {
        method: "DELETE",
      });

    if (response.ok) {
      const newLessons = lessons.filter((l) => l._id !== lesson._id);
      console.log(newLessons);
      setLessons(newLessons);
    }
    setIsLoading(false);
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

  if (isLoading) {
    return (
      <LoadingSpinnerCard />
    )
  }


  return (
    <>

      <EditCourseModal
        isOpen={createCourseModalIsOpen}
        onclose={showCreateCourseModal}
        setCoursesCall={(course: Course) => { 
          setCourse(course);
        }}
        course_data={course}
        key={course?._id} />
      <AddLessonModal
        isOpen={filterModalIsOpen}
        onClose={showFilterModal}
        setLessonsCall={updateLessonsListOnPage}
        key={0}
        course_id={id!} />
      <GoogleViewModal
        isOpen={isGoogleOpen}
        onClose={() => setIsGoogleOpen(false)}
        fileUrl={fileUrl}
      />
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
        <div className="flex flex-col p-2 w-full md:w-[70%] space-y-2">

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
                  <details key={lesson._id} className="flex flex-col mb-2 p-4 border border-slate-200 rounded-lg cursor-pointer">
                    <summary className="flex justify-between">
                      <h3 className="text-lg font-semibold">{lesson.title}</h3>
                      {
                        user?.role === "instructor" &&
                        <p
                          className="text-gray-500 hover:text-red-500"
                          onClick={() => {
                            const confirmation = window.confirm("Are you sure you want to delete this lesson?");
                            if (confirmation) {
                              handleDeleteLesson(lesson);
                            }
                          }}>
                          <Trash />
                        </p>
                      }
                    </summary>
                    <article
                      className="flex text-lg py-2 px-5 items-center gap-3"
                      onClick={() => { }}>
                      {getFileIcon(lesson.content_type)}
                      <p className="text-gray-500" onClick={() => {
                        updateFileUrl(lesson);
                      }}>
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