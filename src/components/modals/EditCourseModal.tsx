import { useState } from "react";
import DurationComponent from "../DurationComponent";
import { BASEURL } from "../../constants";
import Course from "../../types/course";
import LoadingSpinnerCard from "./LoadingSpinnerCard";

function EditCourseModal(
    {
        isOpen,
        onclose,
        setCoursesCall,
        course_data
    }:
        {
            isOpen: boolean,
            onclose: () => void,
            setCoursesCall: (course: Course) => void,
            course_data: Course | null
        }
) {
    const [course, setCourse] = useState({
        _id: course_data ? course_data._id : "",
        course_code: course_data ? course_data.course_code : "",
        course_name: course_data ? course_data.course_name : "",
        course_description: course_data ? course_data.course_description : "",
        course_instructor: course_data ? course_data.course_instructor : "",
        course_duration: course_data ? course_data.course_duration : "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setCourse((prev: Course) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (
            !course.course_code ||
            !course.course_name ||
            !course.course_description
        ) {
            alert("Please fill in all fields");
            return;
        }

        if (!course.course_instructor) {
            alert("Course Instructor is not set");
            return;
        }

        setIsLoading(true);

        const response: Response = await fetch(
            `${BASEURL}courses/edit?id=${course_data?._id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(course),
            }
        )

        const newCourse: Course = await response.json();
        setCoursesCall(newCourse);
        setIsLoading(false);

        onclose();
    };

    const handleModalBackgroundClicked = (e: any) => {
        if (e.target.id === "edit-modal-background") {
            onclose();
        }
    }

    if (!isOpen) return null;

    if (isLoading) {
        return (
            <LoadingSpinnerCard />
        )
    }

    return (
        <div 
        id="edit-modal-background" 
        className="fixed inset-0 flex items-center justify-center bg-[#1c1c1c7b]  z-50 px-2"
        onClick={handleModalBackgroundClicked}>
            <div className="bg-white  p-6 rounded-xl shadow-lg w-full max-w-xl">
                <form onSubmit={handleSubmit} className="space-y-2 bg-white">
                    <h2 className="text-xl text-center font-semibold text-black mb-4">Add a new Lesson</h2>

                    <label htmlFor="course_code">Course Code</label>
                    <Input
                        type="text"
                        id="course_code"
                        name="course_code"
                        placeholder="eg.(CE 235) means second year beginner computer engineering course"
                        value={course.course_code}
                        onChange={handleChange}
                        required
                    />
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
                    <label htmlFor="course_duration">Course Duration</label><br />
                    <DurationComponent
                        field_name="course_duration"
                        onChangeHandler={handleChange}
                        className="
                    w-full px-2 py-4 border rounded-xl border-slate-700" />
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onclose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-700 cursor-pointer">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

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

export default EditCourseModal