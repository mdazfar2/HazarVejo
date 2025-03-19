import React, { useState } from 'react';
import { Building2 } from 'lucide-react';

interface NetBankingProps {
  onSubmit: (data: any) => void;
}

// Bank list
const banks = [
  { id: 'sbi', name: 'State Bank of India' },
  { id: 'hdfc', name: 'HDFC Bank' },
  { id: 'icici', name: 'ICICI Bank' },
  { id: 'axis', name: 'Axis Bank' },
  { id: 'kotak', name: 'Kotak Mahindra Bank' },
  { id: 'yes', name: 'Yes Bank' },
  { id: 'idfc', name: 'IDFC First Bank' },
  { id: 'federal', name: 'Federal Bank' },
];

const NetBanking: React.FC<NetBankingProps> = ({ onSubmit }) => {
  const [selectedBank, setSelectedBank] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedBank) {
      setError('Please select a bank');
      return;
    }

    // TODO: Backend Integration Point
    // Initialize net banking payment
    // - Redirect to bank's payment page
    // - Handle payment callbacks
    // - Implement status checking
    onSubmit({
      type: 'netbanking',
      data: { bankId: selectedBank },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="bank" className="block text-sm font-medium text-gray-700">
          Select Your Bank
        </label>
        <div className="relative mt-1">
          <select
            id="bank"
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            className={`block w-full rounded-md border ${
              error ? 'border-red-300' : 'border-gray-300'
            } px-10 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500`}
          >
            <option value="">Choose a bank</option>
            {banks.map((bank) => (
              <option key={bank.id} value={bank.id}>
                {bank.name}
              </option>
            ))}
          </select>
          <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>

      <div className="space-y-2 rounded-md bg-gray-50 p-4 text-sm text-gray-500">
        <p>• You will be redirected to your bank's secure payment page</p>
        <p>• Complete the payment using your net banking credentials</p>
        <p>• You will be redirected back after payment completion</p>
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Proceed to Pay
      </button>
    </form>
  );
};

export default NetBanking;