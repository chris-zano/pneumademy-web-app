import { useState } from "react";
import { BASEURL } from "../../constants";
import Lesson, { ContentType } from "../../types/lesson";

function AddLessonModal({ isOpen, onClose, setLessonsCall, course_id }: { isOpen: boolean, onClose: () => void, setLessonsCall: (lesson: Lesson) => void, course_id: string | undefined}) {

    const [lesson, setLesson] = useState<Lesson>({
        _id: "",
        course_id: course_id!,
        title: "",
        content_type: ContentType.WordDocument,
        content: "",
        completedBy: [],
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setLesson((prev: Lesson) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!lesson.title || !lesson.content || !lesson.content_type) {
            alert("Please fill in all fields");
            return;
        }

        console.log("Lesson Data:", lesson);

        const response: Response = await fetch(`${BASEURL}lessons`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(lesson),
        });

        const newLesson: Lesson = await response.json();
        console.log("New Lesson:", newLesson);
        setLessonsCall(newLesson);

        onClose();
    };

    const handleModalBackgroundClicked = (e: any) => {
        if (e.target.id === "add-modal-background") {
            onClose();
        }
    }

    if (!isOpen) return null;

    return (
        <div 
        id="add-modal-background"
        className="fixed inset-0 flex items-center justify-center bg-[#1c1c1c7b] z-50 px-2"
        onClick={handleModalBackgroundClicked}>
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl">
                <form onSubmit={handleSubmit} className="space-y-2 bg-white">
                    <h2 className="text-xl text-center font-semibold text-black mb-4">Add a new Lesson</h2>
                    <label htmlFor="title">Lesson Title</label>
                    <Input type="text" id="title" name="title" placeholder="Lesson Title" value={lesson.title} onChange={handleChange} required />
                    <label htmlFor="content_type">Content Type</label>
                    <select id="content_type" name="content_type" value={lesson.content_type} onChange={handleChange} className="w-full px-2 py-4 border rounded-xl border-slate-700" required>
                        {Object.values(ContentType).map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <label htmlFor="content">Content URL</label>
                    <Input type="text" id="content" name="content" placeholder="Content URL" value={lesson.content} onChange={handleChange} required />
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer">Cancel</button>
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

export default AddLessonModal;
