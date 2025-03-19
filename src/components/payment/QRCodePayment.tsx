import React from 'react';
import { QrCode } from 'lucide-react';

interface QRCodePaymentProps {
  onSubmit: (data: any) => void;
}

const QRCodePayment: React.FC<QRCodePaymentProps> = ({ onSubmit }) => {
  // TODO: Backend Integration Point
  // Generate dynamic QR code
  // - Get QR code data from payment gateway
  // - Handle payment status updates via webhooks
  // - Implement real-time status checking

  return (
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6">
        <QrCode className="h-48 w-48 text-gray-400" />
        <p className="mt-4 text-sm text-gray-500">
          Scan this QR code using PhonePe or Google Pay
        </p>
      </div>

      <div className="space-y-2 text-sm text-gray-500">
        <p>1. Open PhonePe or Google Pay</p>
        <p>2. Tap on "Scan QR"</p>
        <p>3. Point your camera at the QR code</p>
        <p>4. Complete the payment</p>
      </div>

      <button
        onClick={() => {
          // TODO: Backend Integration Point
          // Check payment status
          // - Poll payment status API
          // - Update UI based on payment status
          onSubmit({
            type: 'qr',
            data: { method: 'qr_scan' },
          });
        }}
        className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        I've Completed the Payment
      </button>
    </div>
  );
};

export default QRCodePayment;