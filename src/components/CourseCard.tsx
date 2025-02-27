import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import courseBanner from '../assets/images/course-image.png';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  instructor: string;
  progress: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ id, title, description, instructor, progress }) => {
  const { user } = useAuth();

  const colorPool = [
    'bg-red-100', 'bg-red-200', 'bg-red-300', 'bg-red-400', 'bg-red-500',
    'bg-blue-100', 'bg-blue-200', 'bg-blue-300', 'bg-blue-400', 'bg-blue-500',
    'bg-green-100', 'bg-green-200', 'bg-green-300', 'bg-green-400', 'bg-green-500',
    'bg-yellow-100', 'bg-yellow-200', 'bg-yellow-300', 'bg-yellow-400', 'bg-yellow-500',
    'bg-purple-100', 'bg-purple-200', 'bg-purple-300', 'bg-purple-400', 'bg-purple-500',
    'bg-pink-100', 'bg-pink-200', 'bg-pink-300', 'bg-pink-400', 'bg-pink-500',
    'bg-indigo-100', 'bg-indigo-200', 'bg-indigo-300', 'bg-indigo-400', 'bg-indigo-500',
    'bg-teal-100', 'bg-teal-200', 'bg-teal-300', 'bg-teal-400', 'bg-teal-500',
    'bg-orange-100', 'bg-orange-200', 'bg-orange-300', 'bg-orange-400', 'bg-orange-500',
    'bg-lime-100', 'bg-lime-200', 'bg-lime-300', 'bg-lime-400', 'bg-lime-500',
    'bg-cyan-100', 'bg-cyan-200', 'bg-cyan-300', 'bg-cyan-400', 'bg-cyan-500',
    'bg-amber-100', 'bg-amber-200', 'bg-amber-300', 'bg-amber-400', 'bg-amber-500',
    'bg-emerald-100', 'bg-emerald-200', 'bg-emerald-300', 'bg-emerald-400', 'bg-emerald-500',
    'bg-fuchsia-100', 'bg-fuchsia-200', 'bg-fuchsia-300', 'bg-fuchsia-400', 'bg-fuchsia-500',
    'bg-rose-100', 'bg-rose-200', 'bg-rose-300', 'bg-rose-400', 'bg-rose-500',
  ];

  // Shuffle the array initially
  const shuffleArray = (arr: string[]) => arr.sort(() => Math.random() - 0.5);
  let shuffledColors = shuffleArray([...colorPool]);

  const randomColor = () => {
    if (shuffledColors.length === 0) {
      shuffledColors = shuffleArray([...colorPool]); // Refill when empty
    }
    return shuffledColors.pop();
  };


  return (
    <NavLink to={`/courses/${id}`} className="block w-[320px] h-[320px]">
      <div className="bg-white h-[100%] rounded-lg shadow-md overflow-hidden transition hover:shadow-lg">
        {/* Course Banner */}
        <img src={courseBanner} alt={title} className={`w-full h-40  object-cover ${randomColor()}`} />

        {/* Course Details */}
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate">{title}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>

          {/* Instructor */}
          <p className="text-sm text-gray-500 mt-2">
            <span className="font-medium">Instructor:</span> {instructor}
          </p>

          {/* Progress Bar */}
          <div className={user?.role === "instructor" ? `hidden` : user?.role === "student" ? `mt-3` : `mt-3`}>
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
