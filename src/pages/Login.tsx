import { useState } from "react";
import { BASEURL } from "../constants";
import { User } from "../types/user";
import { useAuth } from "../context/AuthProvider";
import Notification from "../components/Notification";

const Login = () => {
  const { login } = useAuth()
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [notifications, setNotifications] = useState<{ id: number; type: any; message: string }[]>([]);

  const addNotification = (type: any, message: string) => {
    const id = Date.now();
    setNotifications([...notifications, { id, type, message }]);
    setTimeout(() => setNotifications((prev) => prev.filter((n) => n.id !== id)), 3000);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const response: Response = await fetch(
        `${BASEURL}auth/verify-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        console.error('Error:', response.statusText);
        return;
      }

      const data: User = await response.json();
      if (data) {
        addNotification("success", "Email sent successfully");
      }

      setStep(2);
    } catch (error) {
      console.error(error);
      addNotification("error", "An error occurred while sending the email");
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const response: Response = await fetch(
        `${BASEURL}auth/verify-code`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, code}),
        }
      );

      if (!response.ok) {
        console.error('Error:', response.statusText);
        addNotification("error", "An error occurred while sending the email");
        return;
      }

      const data: User = await response.json();
      if (data) {
        addNotification("success", "Login Successful");
        login(data)
      }

      setStep(2);
    } catch (error) {
      console.error(error);
      addNotification("error", "An error occurred while sending the email");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-xs w-[90vw] md:w-96">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Pneumademy</h1>
          <p className="text-gray-600">Online learning made easier than ever before</p>
        </div>

        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            <button type="submit" className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Continue
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleCodeSubmit} className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Confirmation Code:</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter code"
            />
            <button type="submit" className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Login
            </button>
          </form>
        )}
      </div>
      <div className="fixed top-5 right-5 space-y-2">
        {notifications.map((notif) => (
          <Notification key={notif.id} type={notif.type} message={notif.message} onClose={() => setNotifications((prev) => prev.filter((n) => n.id !== notif.id))} />
        ))}
      </div>
    </div>
  );
};

export default Login;