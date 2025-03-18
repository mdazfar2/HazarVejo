import React from 'react';
import { Upload, Edit3, Send, BarChart } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Upload CSV',
    description: 'Import your contact list with all recipient details',
  },
  {
    icon: Edit3,
    title: 'Design Email',
    description: 'Create stunning emails using our HTML editor or templates',
  },
  {
    icon: Send,
    title: 'Send Campaign',
    description: 'Preview and send your campaign to recipients',
  },
  {
    icon: BarChart,
    title: 'Track Results',
    description: 'Monitor performance with real-time analytics',
  },
];

const HowItWorks = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            How HazarVejo Works
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Get started with HazarVejo in four simple steps
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-base text-gray-500 text-center">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;