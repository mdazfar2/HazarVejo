import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SuccessMessageProps {
  plan: {
    name: string;
    price: string;
  };
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ plan }) => {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
        <CheckCircle className="h-6 w-6 text-green-600" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">Payment Successful!</h3>
      <p className="mt-2 text-sm text-gray-500">
        Thank you for choosing HazarVejo {plan.name} Plan. You can now start sending emails!
      </p>
      <div className="mt-6">
        <Link
          to="/create"
          className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Continue to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default SuccessMessage;