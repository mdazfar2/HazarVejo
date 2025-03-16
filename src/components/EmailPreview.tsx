import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface EmailPreviewProps {
  content: string;
  csvData: any[];
}

const EmailPreview: React.FC<EmailPreviewProps> = ({ content, csvData }) => {
  const [selectedContact, setSelectedContact] = useState(0);
  const [testEmail, setTestEmail] = useState('');

  const replacePlaceholders = (content: string, data: any) => {
    return content.replace(/\{(\w+)\}/g, (match, field) => data[field] || match);
  };

  const previewContent = csvData.length > 0 ? replacePlaceholders(content, csvData[selectedContact]) : content;

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Email Preview</h3>
            <select
              value={selectedContact}
              onChange={(e) => setSelectedContact(Number(e.target.value))}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {csvData.map((_, index) => (
                <option key={index} value={index}>
                  Preview for Contact {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="p-4">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: previewContent }}
          />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Send Test Email</h3>
        </div>
        <div className="p-4">
          <div className="flex gap-4">
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="Enter test email address"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <button
              onClick={() => {
                // Implement test email sending
                alert('Test email sending will be implemented');
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;