
interface GoogleViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
}

function GoogleViewModal({ isOpen, onClose, fileUrl }: GoogleViewModalProps) {
  if (!isOpen) return null;

  const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#1c1c1c7b] z-50 px-2">
      <div className="bg-white p-4 rounded-xl w-[100%] h-[90%] md:w-[70%]">
        <h2 className="text-2xl "></h2>
        <button onClick={onClose} className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded">
          Close
        </button>

        {/* Embedding file via Google Docs Viewer */}
        <iframe src={googleViewerUrl} width="100%" height="95%" className="border"></iframe>
      </div>
    </div>
  );
}

export default GoogleViewModal;
