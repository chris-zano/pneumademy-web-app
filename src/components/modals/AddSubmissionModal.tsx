/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ISubmission from "../../types/submissions"
import { BASEURL } from "../../constants";
import { User } from "../../types/user";
import LoadingSpinnerCard from "./LoadingSpinnerCard";
import { useAuth } from "../../context/AuthProvider";

function AddSubmissionModal(
    {
        isOpen,
        onclose,
        submission_id,
        submission_data,
        user
    }: {
        isOpen: boolean,
        onclose: () => void,
        submission_id: string,
        submission_data: ISubmission,
        user: User
    }
) {

    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const {getHeaders} = useAuth();

    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
    };
    if (!isOpen) return null;

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        const _headers = await getHeaders();
        try {
            const formData = new FormData();
            console.log(file);
            if (file) {
                formData.append("document", file);
            }
            formData.append("submission_id", submission_id);
            formData.append("course_id", submission_data.course_id);
            formData.append("user_id", user?.id);
            const response = await fetch(`${BASEURL}submissions?user_id=${user?.id}&submission_id=${submission_id}`, {
                method: "PUT",
                headers: _headers,
                body: formData,
            });

            await response.json();
            setIsLoading(false);
            onclose();


        } catch (error) {
            console.error(error);

        }
    }

    if (isLoading) {
        return <LoadingSpinnerCard />
    }   

    const handleModalBackgroundClicked = (e: any) => {
        if (e.target.id === "listAllSubmissions-modal-background") {
            onclose();
        }
    }
    return (
        <div
            id="listAllSubmissions-modal-background"
            className="fixed inset-0 flex items-center justify-center bg-[#1c1c1c7b]  z-50 px-2"
            onClick={handleModalBackgroundClicked}>

            <div className="bg-white  p-6 rounded-xl shadow-lg w-full max-w-xl">
                <form method="post" encType="multipart/form-data" onSubmit={handleSubmit} className="space-y-2 bg-white">
                    <h2
                        className="text-xl text-center font-semibold text-black mb-4">
                        <span className="block">{"Add Submission"}</span>
                    </h2>
                    <label
                        className="mb-2 p-2"
                        htmlFor="submission_file">
                        Upload Your File
                    </label>
                    <br />
                    <input
                        className="border border-gray-200 p-2 rounded-md w-full"
                        type="file"
                        name="submission_file"
                        id="submission_file"
                        onChange={handleFileChange}
                    />
                    <br />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
                        Submit
                    </button>
                </form>
            </div>

        </div>
    )
}

export default AddSubmissionModal