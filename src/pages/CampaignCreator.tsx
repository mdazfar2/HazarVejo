import React, { useState } from 'react';
import { Menu, Upload, Mail, Settings, Send, BarChart } from 'lucide-react';
import CSVUploader from '../components/CSVUploader';
import EmailEditor from '../components/EmailEditor';
import EmailPreview from '../components/EmailPreview';
import SMTPSettings from '../components/SMTPSettings';
import SendingProgress from '../components/SendingProgress';
import Analytics from '../components/Analytics';

type Step = 'csv' | 'editor' | 'preview' | 'settings' | 'send' | 'analytics';

const steps: { id: Step; icon: typeof Menu; label: string }[] = [
  { id: 'csv', icon: Upload, label: 'Upload CSV' },
  { id: 'editor', icon: Mail, label: 'Design Email' },
  { id: 'preview', icon: Mail, label: 'Preview' },
  { id: 'settings', icon: Settings, label: 'SMTP Settings' },
  { id: 'send', icon: Send, label: 'Send Campaign' },
  { id: 'analytics', icon: BarChart, label: 'Analytics' },
];

const CampaignCreator = () => {
  const [currentStep, setCurrentStep] = useState<Step>('csv');
  const [csvData, setCSVData] = useState<any[]>([]);
  const [emailContent, setEmailContent] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [smtpSettings, setSMTPSettings] = useState({
    host: '',
    port: '',
    username: '',
    password: '',
  });

  const handleEmailChange = (content: string, subject: string) => {
    setEmailContent(content);
    setEmailSubject(subject);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'csv':
        return <CSVUploader onDataLoaded={setCSVData} />;
      case 'editor':
        return <EmailEditor content={emailContent} onChange={handleEmailChange} csvData={csvData} />;
      case 'preview':
        return <EmailPreview content={emailContent} csvData={csvData} />;
      case 'settings':
        return <SMTPSettings settings={smtpSettings} onChange={setSMTPSettings} />;
      case 'send':
        return (
          <SendingProgress 
            csvData={csvData} 
            emailContent={emailContent} 
            emailSubject={emailSubject}
            smtpSettings={smtpSettings} 
          />
        );
      case 'analytics':
        return <Analytics />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <nav className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Campaign Creator</h2>
          </div>
          <ul className="flex-1 overflow-y-auto py-4">
            {steps.map((step) => (
              <li key={step.id}>
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium ${
                    currentStep === step.id
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <step.icon className="mr-3 h-5 w-5" />
                  {step.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default CampaignCreator;