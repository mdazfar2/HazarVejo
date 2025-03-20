import React from 'react';
import { Outlet } from 'react-router-dom';
import { Mail } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-orange-50">
      <div className="flex min-h-screen">
        {/* Left Side - Image and Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 p-12 flex-col justify-between">
          <div>
            <div className="flex items-center">
              <Mail className="h-10 w-10 text-white" />
              <span className="ml-2 text-3xl font-bold text-white">HazarVejo</span>
            </div>
            <div className="mt-8">
              <h2 className="text-4xl font-bold text-white">
                Your Gateway to Smarter Email Campaigns
              </h2>
              <p className="mt-4 text-lg text-indigo-100">
                Create, personalize, and send bulk email campaigns with ease. Track performance
                and optimize your email marketing strategy with HazarVejo.
              </p>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80"
            alt="Marketing Analytics"
            className="rounded-lg shadow-xl"
          />
        </div>

        {/* Right Side - Auth Forms */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;