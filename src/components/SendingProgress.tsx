import React, { useState } from 'react';
import { Send, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { useAnalytics } from '../context/AnalyticsContext';

interface SendingProgressProps {
  csvData: any[];
  emailContent: string;
  emailSubject: string;
  smtpSettings: {
    host: string;
    port: string;
    username: string;
    password: string;
  };
}

const SendingProgress: React.FC<SendingProgressProps> = ({
  csvData,
  emailContent,
  emailSubject,
  smtpSettings,
}) => {
  const [sending, setSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [stats, setStats] = useState({
    success: 0,
    failure: 0,
    total: 0,
  });
  const [completed, setCompleted] = useState(false);
  const { updateAnalytics, resetAnalytics } = useAnalytics();

  const startSending = async () => {
    setSending(true);
    setErrors([]);
    setCompleted(false);
    setProgress(0);
    setStats({ success: 0, failure: 0, total: csvData.length });
    resetAnalytics();

    try {
      const response = await fetch('http://localhost:3000/api/send-emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          smtpSettings,
          emailContent,
          emailSubject,
          recipients: csvData,
          batchSize: 100,
          delayBetweenBatches: 300,
        }),
      });

      const reader = response.body?.getReader();
      if (!reader) throw new Error('Failed to start reading response');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const lines = new TextDecoder().decode(value).split('\n');
        for (const line of lines) {
          if (!line) continue;
          
          const update = JSON.parse(line);
          if (update.type === 'progress') {
            setProgress(update.data.progress);
            setStats({
              success: update.data.success,
              failure: update.data.failure,
              total: update.data.total,
            });

            // Update analytics data
            updateAnalytics({
              totalSent: update.data.total,
              delivered: update.data.success,
              bounced: update.data.failure,
              recipients: update.data.recipients || [],
              timeSeriesData: update.data.timeSeriesData || {
                labels: [],
                opens: [],
                clicks: [],
              },
              deviceBreakdown: update.data.deviceBreakdown || {
                desktop: 0,
                mobile: 0,
                tablet: 0,
              },
              locationData: update.data.locationData || {},
            });
          } else if (update.type === 'complete') {
            setCompleted(true);
            if (update.data.errors.length > 0) {
              setErrors(update.data.errors.map((e: any) => `Failed to send to ${e.email}: ${e.error}`));
            }
          }
        }
      }
    } catch (error) {
      setErrors([`Failed to start sending: ${error.message}`]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Send Campaign</h3>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Campaign Summary</h4>
              <div className="mt-2 text-sm text-gray-500">
                <p>Total Recipients: {csvData.length}</p>
                <p>SMTP Server: {smtpSettings.host}</p>
                <p>Subject: {emailSubject || '(No subject)'}</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              {sending && (
                <div className="mt-2 text-sm text-gray-500">
                  Sent: {stats.success} / Failed: {stats.failure} / Total: {stats.total}
                </div>
              )}
            </div>

            {errors.length > 0 && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Errors</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <ul className="list-disc pl-5 space-y-1">
                        {errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {completed && (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      Campaign completed!
                    </h3>
                    <div className="mt-2 text-sm text-green-700">
                      Successfully sent {stats.success} emails.
                      {stats.failure > 0 && ` Failed to send ${stats.failure} emails.`}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={startSending}
              disabled={sending || !emailSubject}
              className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                sending || !emailSubject
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }`}
            >
              {sending ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  {!emailSubject ? 'Please add a subject line' : 'Start Sending'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendingProgress;