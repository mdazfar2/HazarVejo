import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send, Users, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const floatAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-10, 0, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <motion.div 
                className="sm:text-center lg:text-left lg:col-span-6"
                initial="hidden"
                animate="visible"
                variants={staggerChildren}
              >
                <motion.h1 
                  className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
                  variants={fadeIn}
                >
                  <motion.span 
                    className="block"
                    variants={fadeIn}
                  >
                    Your Gateway to
                  </motion.span>
                  <motion.span 
                    className="block text-indigo-600"
                    variants={fadeIn}
                  >
                    Smarter Email Campaigns
                  </motion.span>
                </motion.h1>
                <motion.p 
                  className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                  variants={fadeIn}
                >
                  Create, personalize, and send bulk email campaigns with ease. Track performance
                  and optimize your email marketing strategy with HazarVejo.
                </motion.p>
                <motion.div 
                  className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
                  variants={fadeIn}
                >
                  <motion.div 
                    className="rounded-md shadow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/create"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-colors duration-300"
                    >
                      Get Started
                    </Link>
                  </motion.div>
                  <motion.div 
                    className="mt-3 sm:mt-0 sm:ml-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/create"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10 transition-colors duration-300"
                    >
                      Live Demo
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <motion.div 
                  className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md"
                  initial="initial"
                  animate="animate"
                  variants={floatAnimation}
                >
                  <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                    <div className="p-8">
                      <div className="space-y-8">
                        <motion.div 
                          className="flex items-center space-x-4"
                          whileHover={{ scale: 1.02 }}
                        >
                          <Mail className="h-8 w-8 text-indigo-600" />
                          <div className="flex-1">
                            <motion.div 
                              className="h-4 bg-indigo-100 rounded w-3/4"
                              animate={{
                                width: ["75%", "60%", "75%"],
                                transition: {
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }
                              }}
                            />
                            <motion.div 
                              className="mt-2 h-3 bg-gray-100 rounded w-1/2"
                              animate={{
                                width: ["50%", "40%", "50%"],
                                transition: {
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }
                              }}
                            />
                          </div>
                        </motion.div>

                        <div className="grid grid-cols-3 gap-4">
                          {[Send, Users, BarChart].map((Icon, index) => (
                            <motion.div 
                              key={index}
                              className="text-center"
                              whileHover={{ scale: 1.1 }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.2 }}
                            >
                              <Icon className="h-6 w-6 mx-auto text-indigo-500" />
                              <motion.div 
                                className="mt-2 h-3 bg-indigo-100 rounded"
                                animate={{
                                  opacity: [0.5, 1, 0.5],
                                  transition: {
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: index * 0.2
                                  }
                                }}
                              />
                            </motion.div>
                          ))}
                        </div>

                        <motion.div 
                          className="space-y-3"
                          animate={{
                            opacity: [0.7, 1, 0.7],
                            transition: {
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }
                          }}
                        >
                          <div className="h-3 bg-gray-100 rounded" />
                          <div className="h-3 bg-gray-100 rounded w-5/6" />
                          <div className="h-3 bg-gray-100 rounded w-4/6" />
                        </motion.div>

                        <motion.div 
                          className="flex space-x-4"
                          whileHover={{ scale: 1.02 }}
                        >
                          <motion.div 
                            className="h-8 bg-indigo-100 rounded w-1/2"
                            whileHover={{ backgroundColor: "#818cf8" }}
                          />
                          <motion.div 
                            className="h-8 bg-gray-100 rounded w-1/2"
                            whileHover={{ backgroundColor: "#e0e7ff" }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Hero;