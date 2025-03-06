import { DownloadCloudIcon, X } from "lucide-react";
import { IUserSubmission } from "../../types/submissions";

function ListSubmissionsModal(
    {
        isOpen,
        onclose,
        submission_data,
        date_converter
    }:
        {
            isOpen: boolean,
            onclose: () => void,
            submission_data: IUserSubmission[] | null
            date_converter: (date: Date) => string
        }
) {

    if (!isOpen) return null;


    const getReadableTimeStamp = (date: Date) => {
        return new Date(date).toLocaleString().split(',')[1];
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
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-semibold">All Submissions</h2>
                    <button onClick={onclose} className="text-red-500 text-lg cursor-pointer">
                        <X size={24} />
                    </button>
                </div>
                {
                    submission_data?.length === 0 ?
                        <p className="text-center text-gray-500">No submissions yet</p> :
                        submission_data?.map((submission: IUserSubmission, index: number) => {
                            return (
                                <div key={index} className="flex items-start gap-4 my-4">
                                    <span>{index + 1}</span>
                                    <div className="w-full flex justify-between items-center">
                                        <h3 className="text-lg font-semibold">
                                            {submission?.user_id?.firstname}   {submission?.user_id?.lastname}
                                            <span className="text-sm text-gray-500 block">
                                                {`${submission?.user_id?.email}`}
                                            </span>
                                            <small className="text-sm text-gray-500 block">
                                                {
                                                    `
                                                ${date_converter(submission.createdAt!)}
                                                -
                                                ${getReadableTimeStamp(submission.createdAt!)}
                                                `
                                                }
                                            </small>
                                        </h3>
                                        <a
                                            href={submission.submissionUrl}
                                            download={`${submission?.user_id?.firstname}-${submission?.user_id?.lastname}-submission`}
                                            className="text-blue-500">
                                            <DownloadCloudIcon size={24} />
                                        </a>
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}

export default ListSubmissionsModal