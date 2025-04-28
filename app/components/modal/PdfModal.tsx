"use client";

interface PdfModalProps {
  isOpen: boolean;
  pdfUrl: string;
  onClose: () => void;
}

const PdfModal: React.FC<PdfModalProps> = ({ isOpen, pdfUrl, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-4 w-[90%] h-[90%] relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white text-xl px-3 py-1 rounded"
        >
          X
        </button>
        <iframe
          src={pdfUrl}
          title="PDF Viewer"
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default PdfModal;
