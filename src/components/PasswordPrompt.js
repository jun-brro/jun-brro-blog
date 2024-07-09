import { useState } from "react";

const PasswordPrompt = ({ onConfirm, onCancel }) => {
  const [password, setPassword] = useState("");

  const handleConfirm = () => {
    onConfirm(password);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white dark:bg-gray-800 text-dark dark:text-light p-6 sm:p-10 md:p-12 rounded-lg shadow-lg transform transition-transform duration-300 animate-fadeIn w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center mb-6">
          Enter your password to delete the comment
        </h2>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 rounded bg-transparent dark:bg-gray-900 dark:text-white"
          required
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={onCancel}
            className="mr-4 py-2 px-4 bg-gray-300 dark:bg-gray-700 text-dark dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-800 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="py-2 px-4 bg-blue-500 dark:bg-blue-700 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-600 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordPrompt;
