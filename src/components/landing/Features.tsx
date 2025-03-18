import React from 'react';
import { Upload, Edit3, Send, BarChart, Users, Clock } from 'lucide-react';

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
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for email campaigns
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Powerful features to help you create, send, and track email campaigns effectively.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  {feature.title}
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;