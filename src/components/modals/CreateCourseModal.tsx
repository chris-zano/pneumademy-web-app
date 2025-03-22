import { useState } from "react";
import DurationComponent from "../DurationComponent";
import { BASEURL } from "../../constants";
import { useAuth } from "../../context/AuthProvider";
import Course from "../../types/course";

function CreateCourseModal({ isOpen, onclose, setCoursesCall }: { isOpen: boolean, onclose: () => void, setCoursesCall: (course: Course) => void }) {
    const {getHeaders} = useAuth();

    const [course, setCourse] = useState({
        _id: "",
        course_level: "",
        course_name: "",
        course_description: "",
        course_duration: "",
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setCourse((prev: Course) => ({ ...prev, [name]: value }));
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (
            !course.course_level|| 
            !course.course_name || 
            !course.course_description
        ) 
            {
            alert("Please fill in all fields");
            return;
        }

        console.log("Course Data:", course);

        const _headers = await getHeaders()
        const response: Response = await fetch(
            `${BASEURL}courses`,
            {
                method: "POST",
                headers: _headers,
                body: JSON.stringify(course),
            }
        )

        const newCourse:Course = await response.json();
        console.log("New Course:", newCourse);
        setCoursesCall(newCourse);

        onclose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#1c1c1c7b]  z-50 px-2">
            <div className="bg-white  p-6 rounded-xl shadow-lg w-full max-w-xl">
                <form onSubmit={handleSubmit} className="space-y-2 bg-white">
                    <h2 className="text-xl text-center font-semibold text-black mb-4">Create a new Course</h2>

                    <label htmlFor="course_code">Course Name</label>
                    <Input
                        type="text"
                        id="course_name"
                        name="course_name"
                        placeholder="Course Name"
                        value={course.course_name}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="course_code">Course Description</label>
                    <textarea
                        id="course_description"
                        name="course_description"
                        placeholder="Course Description"
                        value={course.course_description}
                        onChange={handleChange}
                        className="w-full p-2 h-[150px] border rounded-xl border-slate-700"
                        required
                    />
                    <label htmlFor="course_level">Course Level</label>
                    <select id="course_level" name="course_level" className="w-full px-2 py-4 border rounded-xl border-slate-700" onChange={handleChange}>
                        <option value="">Select a level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                    <label htmlFor="course_duration">Course Duration</label><br />
                    <DurationComponent
                    field_name="course_duration"
                    onChangeHandler={handleChange}
                    className="
                    w-full px-2 py-4 border rounded-xl border-slate-700" />
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onclose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Input = ({ type, id, name, placeholder, value, onChange, required }: { type: string, id: string, name: string, placeholder: string, value: string, onChange: (e: any) => void, required: boolean }) => {
    return (
        <input
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full px-2 py-4 border rounded-xl border-slate-700"
            required={required}
        />
    );
};

export default CreateCourseModal