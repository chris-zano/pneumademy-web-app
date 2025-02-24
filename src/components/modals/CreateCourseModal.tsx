import { useState } from "react";

function CreateCourseModal({ isOpen, onclose }: { isOpen: boolean, onclose: () => void }) {
    const [course, setCourse] = useState({
        course_code: "",
        course_name: "",
        course_description: "",
        course_instructor: "",
        course_duration: "",
        instructors: "",
    });

    interface Course {
        course_code: string;
        course_name: string;
        course_description: string;
        course_instructor: string;
        course_duration: string;
        instructors: string;
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setCourse((prev: Course) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("Course Data:", course);
        onclose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#1c1c1c7b]  z-50 px-2">
            <div className="bg-white  p-6 rounded-xl shadow-lg w-full max-w-xl">
                <form onSubmit={handleSubmit} className="space-y-2 bg-white">
                    <h2 className="text-xl text-center font-semibold text-black mb-4">Create a new Course</h2>

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
                    <label htmlFor="course_code">Course Duration</label>
                    <Input
                        type="text"
                        id="course_duration"
                        name="course_duration"
                        placeholder="Course Duration. Eg. ( 6 months )"
                        value={course.course_duration}
                        onChange={handleChange}
                        required
                    />
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onclose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">Create</button>
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

export default CreateCourseModal