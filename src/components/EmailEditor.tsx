import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';
import { Save, Eye, EyeOff, Code, Download, Upload } from 'lucide-react';

interface EmailEditorProps {
  content: string;
  onChange: (content: string, subject: string) => void;
  csvData: any[];
}

const EmailEditor: React.FC<EmailEditorProps> = ({ content, onChange, csvData }) => {
  const [htmlContent, setHtmlContent] = useState(content || getDefaultTemplate());
  const [showPreview, setShowPreview] = useState(true);
  const [previewWidth, setPreviewWidth] = useState('desktop');
  const [emailSubject, setEmailSubject] = useState('');

  useEffect(() => {
    onChange(htmlContent, emailSubject);
  }, [htmlContent, emailSubject, onChange]);

  const handleSave = () => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-template.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setHtmlContent(content);
      };
      reader.readAsText(file);
    }
  };

  const insertPlaceholder = (field: string) => {
    setHtmlContent((prev) => prev + `{${field}}`);
  };

  const replacePlaceholders = (template: string, data: any) => {
    if (!data || Object.keys(data).length === 0) return template;
    return template.replace(/\{(\w+)\}/g, (match, field) => data[field] || match);
  };

  const previewContent = csvData.length > 0 
    ? replacePlaceholders(htmlContent, csvData[0]) 
    : htmlContent;

  return (
    <div className="space-y-4">
      {/* Subject Line Input */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4">
          <label htmlFor="email-subject" className="block text-sm font-medium text-gray-700 mb-2">
            Email Subject
          </label>
          <input
            type="text"
            id="email-subject"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
            placeholder="Enter your email subject line..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {csvData.length > 0 && (
            <p className="mt-2 text-sm text-gray-500">
              You can use placeholders like {'{name}'} in the subject line too!
            </p>
          )}
        </div>
      </div>

      {/* Email Editor */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="border-b border-gray-200 p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center px-3 py-2 rounded bg-gray-100 hover:bg-gray-200"
              >
                {showPreview ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Hide Preview
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Show Preview
                  </>
                )}
              </button>
              <button
                onClick={handleSave}
                className="flex items-center px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Template
              </button>
              <label className="flex items-center px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                Load Template
                <input
                  type="file"
                  accept=".html"
                  onChange={handleLoad}
                  className="hidden"
                />
              </label>
            </div>
            {showPreview && (
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Preview Width:</label>
                <select
                  value={previewWidth}
                  onChange={(e) => setPreviewWidth(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="mobile">Mobile</option>
                  <option value="tablet">Tablet</option>
                  <option value="desktop">Desktop</option>
                </select>
              </div>
            )}
          </div>
          {csvData.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Available Fields</h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(csvData[0]).map((field) => (
                  <button
                    key={field}
                    onClick={() => insertPlaceholder(field)}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm hover:bg-indigo-200"
                  >
                    {field}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={`flex ${showPreview ? 'divide-x' : ''}`}>
          <div className={showPreview ? 'w-1/2' : 'w-full'}>
            <CodeMirror
              value={htmlContent}
              height="600px"
              theme={oneDark}
              extensions={[html()]}
              onChange={(value) => setHtmlContent(value)}
              className="border-0"
            />
          </div>
          
          {showPreview && (
            <div className={`w-1/2 p-4 bg-gray-50 overflow-auto`}>
              <div
                className={`mx-auto bg-white shadow-lg ${
                  previewWidth === 'mobile'
                    ? 'max-w-sm'
                    : previewWidth === 'tablet'
                    ? 'max-w-2xl'
                    : 'max-w-full'
                }`}
              >
                <iframe
                  srcDoc={previewContent}
                  className="w-full h-[600px] border-0"
                  title="Email Preview"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function getDefaultTemplate() {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Template</title>
  <style>
    /* Reset styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    /* Base styles */
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
    }

    /* Container styles */
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    /* Header styles */
    .header {
      text-align: center;
      padding: 20px 0;
      border-bottom: 2px solid #eee;
    }

    .header h1 {
      color: #2563eb;
      font-size: 24px;
      margin-bottom: 10px;
    }

    /* Content styles */
    .content {
      padding: 20px 0;
    }

    .content p {
      margin-bottom: 15px;
      font-size: 16px;
    }

    /* Button styles */
    .button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #2563eb;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
      margin: 10px 0;
      transition: background-color 0.3s ease;
    }

    .button:hover {
      background-color: #1d4ed8;
    }

    /* Card styles */
    .card {
      border: 1px solid #eee;
      padding: 15px;
      margin: 15px 0;
      border-radius: 6px;
      background-color: #fafafa;
    }

    .card:hover {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    /* Footer styles */
    .footer {
      text-align: center;
      padding: 20px 0;
      border-top: 2px solid #eee;
      font-size: 14px;
      color: #666;
    }

    /* Responsive styles */
    @media only screen and (max-width: 600px) {
      .container {
        width: 100%;
        margin: 10px;
        padding: 15px;
      }

      .header h1 {
        font-size: 20px;
      }

      .content p {
        font-size: 14px;
      }

      .button {
        display: block;
        text-align: center;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1>Welcome, {name}!</h1></div>
    <div class="content">
      <div class="card">
        <p>Hello {name},</p>
        <p>This is a sample email template with interactive elements. Try hovering over this card!</p>
      </div>
      <p>Your email: {email}</p>
      <a href="#" class="button">Get Started</a>
    </div>
    <div class="footer">
      <p>© 2024 Your Company. All rights reserved.</p>
      <p>You received this email because you're subscribed to our newsletter.</p>
    </div>
  </div>
</body>
</html>`;
}

export default EmailEditor;