import React, { useState } from 'react';
import { Smartphone, CheckCircle } from 'lucide-react';

interface UPIPaymentProps {
  onSubmit: (data: any) => void;
}

const UPIPayment: React.FC<UPIPaymentProps> = ({ onSubmit }) => {
  const [upiId, setUpiId] = useState('');
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  // Validate UPI ID format
  const validateUpiId = (id: string) => {
    const upiRegex = /^[\w\.\-_]{3,}@[a-zA-Z]{3,}$/;
    return upiRegex.test(id);
  };

  // Handle UPI ID verification
  const handleVerify = async () => {
    if (!validateUpiId(upiId)) {
      setError('Invalid UPI ID format');
      return;
    }

    try {
      // TODO: Backend Integration Point
      // Verify UPI ID with payment gateway
      // Example API call:
      // const response = await fetch('/api/verify-upi', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ upiId })
      // });
      // const result = await response.json();
      // if (!result.valid) throw new Error('Invalid UPI ID');

      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsVerified(true);
      setError('');
    } catch (err) {
      setError('Failed to verify UPI ID');
      setIsVerified(false);
    }
  };

  // Handle payment submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isVerified) {
      setError('Please verify UPI ID first');
      return;
    }

    // TODO: Backend Integration Point
    // Initialize UPI payment
    // - Generate UPI intent
    // - Handle payment status
    // - Implement webhooks for payment updates
    onSubmit({
      type: 'upi',
      data: { upiId },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="upiId" className="block text-sm font-medium text-gray-700">
          UPI ID
        </label>
        <div className="relative mt-1">
          <input
            type="text"
            id="upiId"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="example@upi"
            className={`block w-full rounded-md border ${
              error ? 'border-red-300' : 'border-gray-300'
            } px-10 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500`}
          />
          <Smartphone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          {isVerified && (
            <CheckCircle className="absolute right-3 top-2.5 h-5 w-5 text-green-500" />
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>

      {/* Verify Button */}
      <button
        type="button"
        onClick={handleVerify}
        className="w-full rounded-md border border-indigo-600 bg-white px-4 py-2 text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Verify UPI ID
      </button>

      {/* Pay Button */}
      <button
        type="submit"
        disabled={!isVerified}
        className={`w-full rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isVerified
            ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Pay Now
      </button>
    </form>
  );
};

export default UPIPayment;