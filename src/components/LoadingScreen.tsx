import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-orange-50"
    >
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="inline-block"
        >
          <Mail className="h-16 w-16 text-indigo-600" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4"
        >
          <h2 className="text-2xl font-bold text-gray-900">HazarVejo</h2>
          <p className="mt-1 text-gray-500">Loading amazing features for you...</p>
        </motion.div>
        <motion.div
          className="mt-4 w-48 h-1 mx-auto bg-gray-200 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-indigo-600 rounded-full"
            animate={{
              x: [-192, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;