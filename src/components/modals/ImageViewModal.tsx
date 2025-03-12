
interface ImageViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    fileUrl: string;
  }
  
  function ImageViewModal({ isOpen, onClose, fileUrl }: ImageViewModalProps) {
    if (!isOpen) return null;    
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#1c1c1cad] z-50 px-2" onClick={onClose}>
        <div className="bg-white p-1 rounded-xl w-[100%] h-[90%] md:w-[70%]" onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white cursor-pointer rounded">
            Close
          </button>
  
            <img src={fileUrl} className="border h-full w-full object-contain rounded-xl" />
        </div>
      </div>
    );
  }
  
  export default ImageViewModal;
  