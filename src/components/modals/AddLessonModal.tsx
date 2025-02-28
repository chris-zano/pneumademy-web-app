import { useState } from "react";
import { BASEURL } from "../../constants";
import Lesson, { ContentType } from "../../types/lesson";
import LoadingSpinnerCard from "./LoadingSpinnerCard";

interface AddLessonModalProps {
    isOpen: boolean;
    onClose: () => void;
    setLessonsCall: (lesson: Lesson) => void;
    course_id: string;
}

function AddLessonModal({ isOpen, onClose, setLessonsCall, course_id }: AddLessonModalProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const [lesson, setLesson] = useState<Omit<Lesson, "content">>({
        _id: "",
        course_id: course_id!,
        title: "",
        content_type: ContentType.WordDocument,
        completedBy: [],
    });

    const [file, setFile] = useState<File | null>(null);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setLesson((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!lesson.title || !file || !lesson.content_type) {
            alert("Please fill in all fields and upload a file");
            return;
        }

        const formData = new FormData();
        formData.append("title", lesson.title);
        formData.append("content_type", lesson.content_type);
        formData.append("course_id", lesson.course_id);
        formData.append("document", file);

        setIsLoading(true);
        const response = await fetch(`${BASEURL}lessons`, {
            method: "POST",
            body: formData,
        });

        const newLesson: Lesson = await response.json();
        console.log("New Lesson:", newLesson);
        setLessonsCall(newLesson);
        setIsLoading(false);
        onClose();
    };

    const handleModalBackgroundClicked = (e: any) => {
        if (e.target.id === "add-modal-background") {
            onClose();
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
            id="add-modal-background"
            className="fixed inset-0 flex items-center justify-center bg-[#1c1c1c7b] z-50 px-2"
            onClick={handleModalBackgroundClicked}>
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl">
                <form onSubmit={handleSubmit} className="space-y-2 bg-white" encType="multipart/form-data">
                    <h2 className="text-xl text-center font-semibold text-black mb-4">Add a new Lesson</h2>

                    <label htmlFor="title">Lesson Title</label>
                    <Input type="text" id="title" name="title" placeholder="Lesson Title" value={lesson.title} onChange={handleChange} required />

                    <label htmlFor="content_type">Content Type</label>
                    <select id="content_type" name="content_type" value={lesson.content_type} onChange={handleChange} className="w-full px-2 py-4 border rounded-xl border-slate-700" required>
                        {Object.values(ContentType).map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>

                    <div>
                        <label htmlFor="file">Upload File</label>
                        <input
                            type="file"
                            id="file"
                            name="document"
                            onChange={handleFileChange}
                            required
                            className="w-full px-2 py-4 border rounded-xl border-slate-700" />
                    </div>

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
