
function ConfirmationModal(
    { isOpen, onclose, onConfirmed, onCancelled, message, optionalWarning, confirmButtonText, cancelButtonText }:
        { isOpen: boolean, onclose: () => void, onConfirmed: () => void, onCancelled: () => void, message: string, optionalWarning?: string, confirmButtonText?: string, cancelButtonText?: string }) {


    const handleConfirm = () => {
        onConfirmed();
        onclose();
    };

    const handleCancel = () => {
        onCancelled();
        onclose();
    };



    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#1c1c1c7b]  z-50 px-2">
            <div className="bg-white  p-6 rounded-xl shadow-lg w-full max-w-xl">
                {/* message */}

                <div className="flex flex-col items-center justify-center">
                    <p className="text-2xl font-semibold text-center">
                        {message}
                    </p>

                    {
                        optionalWarning &&
                        <p className="text-gray-500 text-center">
                            {optionalWarning}
                        </p>
                    }
                </div>

                {/* buttons */}
                <div className="flex justify-center gap-4 mt-4">

                    <button
                        className="cursor-pointer bg-slate-800 border border-transparent text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition duration-200"
                        onClick={handleConfirm}
                    >
                        {confirmButtonText ? confirmButtonText : "Confirm"}
                    </button>

                    {
                        cancelButtonText &&
                        <button
                            className="cursor-pointer bg-white border border-slate-800 text-slate-800 px-4 py-2 rounded-lg hover:bg-red-800 hover:border hover:border-red-800 hover:text-white transition duration-200"
                            onClick={handleCancel}
                        >
                            {cancelButtonText}
                        </button>
                    }

                </div>

            </div>
        </div>
    );
}

export default ConfirmationModal