import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomAlertProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, type, isVisible, onClose }) => {
  const bgColor = type === 'success' ? 'bg-gradient-to-r from-green-400 to-blue-500' : 'bg-gradient-to-r from-red-400 to-pink-500';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="fixed bottom-4 right-4 z-50"
          style={{ position: 'fixed', bottom: '1rem', right: '1rem' }}
        >
          <div className={`${bgColor} rounded-lg shadow-lg p-4 flex items-center`}>
            <p className="text-white font-medium mr-4">{message}</p>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomAlert;
