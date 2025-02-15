import { useEffect } from "react";
import { XCircle, CheckCircle, AlertTriangle, Info, MessageSquare } from "lucide-react";

type NotificationType = "success" | "warning" | "error" | "info" | "message";

interface NotificationProps {
  type: NotificationType;
  message: string;
  onClose: () => void;
}

const ICONS = {
  success: <CheckCircle className="text-green-500" />,
  warning: <AlertTriangle className="text-yellow-500" />,
  error: <XCircle className="text-red-500" />,
  info: <Info className="text-blue-500" />,
  message: <MessageSquare className="text-gray-500" />,
};

const BG_COLORS = {
  success: "bg-green-100 border-green-500",
  warning: "bg-yellow-100 border-yellow-500",
  error: "bg-red-100 border-red-500",
  info: "bg-blue-100 border-blue-500",
  message: "bg-gray-100 border-gray-500",
};

const Notification: React.FC<NotificationProps> = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`flex items-center gap-3 p-4 border-l-4 rounded-lg shadow-md ${BG_COLORS[type]}`}>
      {ICONS[type]}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-auto text-gray-600 hover:text-black">
        ✖
      </button>
    </div>
  );
};

export default Notification;
