import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Building2, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import PaymentForm from './PaymentForm';
import UPIPayment from './UPIPayment';
import QRCodePayment from './QRCodePayment';
import NetBanking from './NetBanking';
import SuccessMessage from './SuccessMessage';

// Types for the payment modal props
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    name: string;
    price: string;
    period?: string;
    priceDetail?: string;
  };
}

// Payment method type
type PaymentMethod = 'card' | 'upi' | 'qr' | 'netbanking';

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, plan }) => {
  // State management for payment flow
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Payment methods configuration
  const paymentMethods = [
    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
    { id: 'upi', label: 'UPI', icon: Smartphone },
    { id: 'qr', label: 'PhonePe/Google Pay', icon: Smartphone },
    { id: 'netbanking', label: 'Net Banking', icon: Building2 },
  ];

  // Handle payment submission
  const handlePayment = async (paymentData: any) => {
    setIsProcessing(true);
    setError(null);

    try {
      // TODO: Backend Integration Point 1
      // Replace this setTimeout with actual payment API call
      // Example API call:
      // const response = await fetch('/api/payments', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     amount: plan.price,
      //     currency: 'INR',
      //     paymentMethod,
      //     paymentData,
      //     planDetails: plan
      //   })
      // });
      // 
      // if (!response.ok) throw new Error('Payment failed');
      // const result = await response.json();

      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Backend Integration Point 2
      // Handle successful payment
      // - Create subscription in database
      // - Update user's plan
      // - Generate invoice
      // - Send confirmation email
      
      setIsSuccess(true);
    } catch (err) {
      // TODO: Backend Integration Point 3
      // Handle payment failures
      // - Log error
      // - Show appropriate error message
      // - Retry logic if needed
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Early return if modal is closed
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Modal Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />

      {/* Modal Content */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Modal Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-2xl font-semibold text-gray-900">Complete Payment</h3>
            <p className="mt-1 text-sm text-gray-500">
              {plan.name} Plan - ₹{plan.price}
              {plan.period && `/${plan.period}`}
              {plan.priceDetail && ` ${plan.priceDetail}`}
            </p>
          </div>

          {/* Modal Body */}
          <div className="px-6 py-4">
            {!isSuccess ? (
              <>
                {/* Payment Method Selection */}
                <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                      className={`flex flex-col items-center justify-center rounded-lg border p-4 transition-colors ${
                        paymentMethod === method.id
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-200'
                      }`}
                    >
                      <method.icon
                        className={`h-6 w-6 ${
                          paymentMethod === method.id ? 'text-indigo-600' : 'text-gray-400'
                        }`}
                      />
                      <span
                        className={`mt-2 text-sm ${
                          paymentMethod === method.id ? 'text-indigo-600' : 'text-gray-500'
                        }`}
                      >
                        {method.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Payment Forms */}
                <div className="space-y-4">
                  {paymentMethod === 'card' && <PaymentForm onSubmit={handlePayment} />}
                  {paymentMethod === 'upi' && <UPIPayment onSubmit={handlePayment} />}
                  {paymentMethod === 'qr' && <QRCodePayment onSubmit={handlePayment} />}
                  {paymentMethod === 'netbanking' && <NetBanking onSubmit={handlePayment} />}

                  {/* Error Message */}
                  {error && (
                    <div className="mt-4 rounded-md bg-red-50 p-4">
                      <div className="flex">
                        <AlertCircle className="h-5 w-5 text-red-400" />
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">Payment Failed</h3>
                          <div className="mt-2 text-sm text-red-700">{error}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Processing State */}
                  {isProcessing && (
                    <div className="mt-4 flex items-center justify-center">
                      <Loader className="h-5 w-5 animate-spin text-indigo-600" />
                      <span className="ml-2 text-sm text-gray-500">Processing payment...</span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <SuccessMessage plan={plan} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;