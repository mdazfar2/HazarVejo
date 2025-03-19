import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';

interface PaymentFormProps {
  onSubmit: (data: any) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  // Form state
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  // Validation state
  const [errors, setErrors] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }

    // Format expiry date
    if (name === 'expiryDate') {
      const formatted = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .substr(0, 5);
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
    };

    // Card number validation
    const cardNumberClean = formData.cardNumber.replace(/\s/g, '');
    if (cardNumberClean.length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    // Expiry date validation
    const [month, year] = formData.expiryDate.split('/');
    const now = new Date();
    const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
    if (!month || !year || expiry < now) {
      newErrors.expiryDate = 'Invalid expiry date';
    }

    // CVV validation
    if (formData.cvv.length !== 3) {
      newErrors.cvv = 'CVV must be 3 digits';
    }

    // Cardholder name validation
    if (formData.cardholderName.length < 3) {
      newErrors.cardholderName = 'Please enter cardholder name';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // TODO: Backend Integration Point
      // Send card details to payment processor
      // - Use a secure payment gateway
      // - Implement tokenization
      // - Handle 3D Secure if required
      onSubmit({
        type: 'card',
        data: formData,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Card Number */}
      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
          Card Number
        </label>
        <div className="relative mt-1">
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            maxLength={19}
            placeholder="1234 5678 9012 3456"
            className={`block w-full rounded-md border ${
              errors.cardNumber ? 'border-red-300' : 'border-gray-300'
            } px-10 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500`}
          />
          <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        {errors.cardNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
        )}
      </div>

      {/* Expiry Date and CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
            Expiry Date
          </label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            placeholder="MM/YY"
            maxLength={5}
            className={`mt-1 block w-full rounded-md border ${
              errors.expiryDate ? 'border-red-300' : 'border-gray-300'
            } px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500`}
          />
          {errors.expiryDate && (
            <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
          )}
        </div>

        <div>
          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            placeholder="123"
            maxLength={3}
            className={`mt-1 block w-full rounded-md border ${
              errors.cvv ? 'border-red-300' : 'border-gray-300'
            } px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500`}
          />
          {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
        </div>
      </div>

      {/* Cardholder Name */}
      <div>
        <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700">
          Cardholder Name
        </label>
        <input
          type="text"
          id="cardholderName"
          name="cardholderName"
          value={formData.cardholderName}
          onChange={handleChange}
          placeholder="John Doe"
          className={`mt-1 block w-full rounded-md border ${
            errors.cardholderName ? 'border-red-300' : 'border-gray-300'
          } px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500`}
        />
        {errors.cardholderName && (
          <p className="mt-1 text-sm text-red-600">{errors.cardholderName}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Pay Now
      </button>
    </form>
  );
};

export default PaymentForm;