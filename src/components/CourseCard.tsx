import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  instructor: string;
  banner: string;
  progress: number; // value from 0 to 100
}

const CourseCard: React.FC<CourseCardProps> = ({ id, title, description, instructor, banner, progress }) => {
  const { user } = useAuth();
  return (
    <NavLink to={`/courses/${id}`} className="block w-[320px]">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg">
        {/* Course Banner */}
        <img src={banner} alt={title} className="w-full h-40 object-cover" />

        {/* Course Details */}
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate">{title}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>

          {/* Instructor */}
          <p className="text-sm text-gray-500 mt-2">
            <span className="font-medium">Instructor:</span> {instructor}
          </p>

          {/* Progress Bar */}
          <div className={ user?.role === "instructor" ? `hidden` : user?.role === "student" ? `mt-3` : `mt-3`}>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 bg-blue-600 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{progress}% Completed</p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default CourseCard;
