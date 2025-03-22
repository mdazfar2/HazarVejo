import React from 'react';
import { Upload, Edit3, Send, BarChart, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    icon: Upload,
    title: 'CSV Upload',
    description: 'Import your contact lists with ease using our CSV upload feature.',
  },
  {
    icon: Edit3,
    title: 'HTML Editor',
    description: 'Create beautiful emails with our intuitive HTML editor.',
  },
  {
    icon: Send,
    title: 'Batch Sending',
    description: 'Send emails in batches with customizable throttling.',
  },
  {
    icon: BarChart,
    title: 'Analytics',
    description: 'Track campaign performance with detailed analytics.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work together with your team on email campaigns.',
  },
  {
    icon: Clock,
    title: 'Scheduling',
    description: 'Schedule your campaigns for the perfect timing.',
  },
];

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="lg:text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-base text-indigo-600 font-semibold tracking-wide uppercase"
            whileHover={{ scale: 1.05 }}
          >
            Features
          </motion.h2>
          <motion.p
            className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
            whileHover={{ scale: 1.02 }}
          >
            Everything you need for email campaigns
          </motion.p>
          <motion.p
            className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            Powerful features to help you create, send, and track email campaigns effectively.
          </motion.p>
        </motion.div>

        <motion.div
          ref={ref}
          className="mt-10"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="relative p-6 bg-white rounded-xl shadow-lg transform transition-all duration-300"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  backgroundColor: "rgba(238, 242, 255, 0.5)" // Light indigo background
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white transform transition-all duration-300"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 360,
                    backgroundColor: "#4F46E5" // Darker indigo on hover
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </motion.div>
                <motion.div
                  className="ml-16 space-y-2"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-lg leading-6 font-medium text-gray-900 transform transition-all duration-300">
                    {feature.title}
                  </p>
                  <p className="text-base text-gray-500 transform transition-all duration-300">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;