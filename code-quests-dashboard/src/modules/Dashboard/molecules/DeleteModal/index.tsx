import { X } from "lucide-react";
import { Button } from "../../../shared/components/atoms";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  loading: boolean;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  loading,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
        <p className="mb-6 text-gray-600">
          Are you sure you want to delete this user?
        </p>
        <div className="flex justify-end gap-3">
          <Button onClick={onClose} variant="secondary" disabled={loading}>
            Cancel
          </Button>

          <Button
            onClick={onConfirm}
            variant="danger"
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
