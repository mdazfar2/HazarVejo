import React from 'react';
import { Save } from 'lucide-react';

interface SMTPSettings {
  host: string;
  port: string;
  username: string;
  password: string;
}

interface SMTPSettingsProps {
  settings: SMTPSettings;
  onChange: (settings: SMTPSettings) => void;
}

const SMTPSettings: React.FC<SMTPSettingsProps> = ({ settings, onChange }) => {
  const handleChange = (field: keyof SMTPSettings) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...settings,
      [field]: e.target.value,
    });
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('smtp_settings', JSON.stringify(settings));
    alert('SMTP settings saved successfully!');
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">SMTP Settings</h3>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          <div>
            <label htmlFor="host" className="block text-sm font-medium text-gray-700">
              SMTP Host
            </label>
            <input
              type="text"
              id="host"
              value={settings.host}
              onChange={handleChange('host')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="smtp.gmail.com"
            />
          </div>
          <div>
            <label htmlFor="port" className="block text-sm font-medium text-gray-700">
              SMTP Port
            </label>
            <input
              type="text"
              id="port"
              value={settings.port}
              onChange={handleChange('port')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="587"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={settings.username}
              onChange={handleChange('username')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={settings.password}
              onChange={handleChange('password')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="pt-4">
            <button
              onClick={saveToLocalStorage}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMTPSettings;