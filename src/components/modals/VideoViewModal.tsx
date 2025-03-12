
interface VideoViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    fileUrl: string;
  }
  
  function VideoViewModal({ isOpen, onClose, fileUrl }: VideoViewModalProps) {
    if (!isOpen) return null;
  
    console.log({fileUrl})
    
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#1c1c1cad] z-50 px-2" onClick={onClose}>
        <div className="bg-white p-1 rounded-xl w-[100%] h-fit md:w-[70%]" onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white cursor-pointer rounded">
            Close
          </button>
  
          <video src={fileUrl} width="100%" height="100%" className="border h-full w-full rounded-xl" controls></video>
        </div>
      </div>
    );
  }
  
  export default VideoViewModal;
  