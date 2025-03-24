import Calendar from "../components/Calendar";
import CourseCard from "../components/CourseCard";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourses } from "../api/courses";
import Course from "../types/course";
import LoadingSpinnerCard from "../components/modals/LoadingSpinnerCard";
import { BASEURL } from "../constants";
import { getTotalCourses, getTotalLearners } from "../api/dashboard";


const Dashboard = () => {

  const [totalCourses, setTotalCourses] = useState(0);
  const [totalLearners, setTotalLearners] = useState(0);

  const { user, getHeaders } = useAuth();
  const isInstructor = user?.role === "instructor";
  const isLearner = user?.role === "learner";
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Course[]>([]);

  useEffect(() => {

    const fetchCourses = async () => {
      const data = await getCourses(getHeaders);
      setCourses(data);
    }
    const fetchTotalCourses = async () => {
      const data = await getTotalCourses(getHeaders);
      setTotalCourses(data);
    }
    const fetchTotalLearners = async () => {
      const data = await getTotalLearners(getHeaders);
      setTotalLearners(data);
    }

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

    const fetchEnrollments = async () => {
      const data = await getLearnerEnrollments();
      setEnrollments(data);
    }
    if (isLearner) {
      setIsLoading(true);

      fetchEnrollments();
      setIsLoading(false);
    }

    if (isInstructor) {
      setIsLoading(true);

      fetchCourses();
      fetchTotalCourses();
      fetchTotalLearners();
      setIsLoading(false);
    }
  }, [user?.id, isInstructor, isLearner, getHeaders])

  if (isLoading) {
    return (
      <LoadingSpinnerCard />
    )
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* Main Content */}
      <div className="flex-2 space-y-4">
        {/* Enrolled Courses Section */}
        <section className="bg-white p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Enrolled Courses</h2>
          <div className="grid grid-cols-1 md:flex gap-4 flex-wrap">
            {isInstructor ? courses.map((course, index) => (
              <CourseCard
                id={course._id}
                key={index}
                title={course.course_name}
                description={course.course_description}
                progress={30}
              />
            )) : enrollments.map((enrollment, index) => (
              <CourseCard
                id={enrollment._id}
                key={index}
                title={enrollment.course_name}
                description={enrollment.course_description}
                progress={30}
                showProgress={true}
                learnerEnrollments={enrollments}
                checkLearnerIsEnrolled={true}
              />
            ))}
          </div>
          <Link to="/courses" className="block mt-4 text-blue-500">Show All</Link>
        </section>

        {/* Statistics Section */}
        <section className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          {isInstructor ? (
            <div className="grid grid-cols-2 gap-4">
              <StatCard title="Total Students" value={totalLearners.toString()} />
              <StatCard title="Courses Created" value={totalCourses.toString()} />
              <StatCard title="Average Quiz Score" value="85%" />
              <StatCard title="Assignments Graded" value="300" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <StatCard title="Courses Completed" value="3" />
              <StatCard title="Quiz Performance" value="90% Avg" />
              <StatCard title="Assignments Submitted" value="12" />
              <StatCard title="Learning Streak" value="7 Days" />
            </div>
          )}
        </section>
      </div>

      {/* Right Sidebar */}
      <aside className=" flex-1 w-full md:w-64 space-y-4">
        <div className="bg-white p-1 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">📅 Calendar</h2>
          <Calendar />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Upcoming Deadlines</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Assignment 1 - Due Feb 20</li>
            <li>Quiz 3 - Due Feb 25</li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

const StatCard = ({ title, value }: { title: string; value: string }) => (
  <div className="p-4 bg-gray-100 rounded-md text-center">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-2xl font-bold text-blue-500">{value}</p>
  </div>
);

export default Dashboard;
