import { Routes, Route } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import RoleBasedRoute from "./RoleBasedRoute";
import Explore from "../pages/Explore";
import MyCourses from "../pages/MyCourses";
// import Submissions from "../pages/Submissions";
import Quizzes from "../pages/Quizzes";
import Resources from "../pages/Resources";
import Settings from "../pages/Settings";
import CourseDetails from "../pages/CourseDetails";
import Profile from "../pages/Profile";
import Search from "../pages/Search";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route path="/" element={<App />}>
        <Route element={<RoleBasedRoute allowedRoles={["learner", "instructor"]} />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<Explore />} />
          <Route path="enrollments" element={<MyCourses />} />
          {/* <Route path="submissions" element={<Submissions />} /> */}
          <Route path="quizzes" element={<Quizzes />} />
          <Route path="resources" element={<Resources />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="search" element={<Search />} />

          {/* detailed page routes */}
          <Route path="courses/:id" element={<CourseDetails />} />

        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
