import {  JSX } from "react"

function FilterModal({ title, options, isOpen, onclose }: { title: string, options: JSX.Element[], isOpen: boolean, onclose: () => void }) {

    function handleSubmit(): void {
        throw new Error("Function not implemented.");
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#1c1c1c7b]  z-50 px-2">
            <div className="bg-white  p-6 rounded-xl shadow-lg w-full max-w-xl">
            <form onSubmit={handleSubmit} className="space-y-2 bg-white">
                    <h2 className="text-xl text-center font-semibold text-black mb-4">{title}</h2>

                    {options.map((option, index) => (
                        <div key={index} className="flex flex-col space-y-2">
                            {option}
                        </div>
                    ))}
                    
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onclose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">Apply</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FilterModal