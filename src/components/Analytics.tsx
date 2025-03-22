import React, { useState } from 'react';
import {
  BarChart2,
  PieChart as PieChartIcon,
  TrendingUp,
  Download,
  Search,
  Filter,
  Monitor,
  Smartphone,
  Tablet,
  MapPin,
  Calendar,
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [dateRange, setDateRange] = useState('7days');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data - In a real app, this would come from your backend
  const campaignData = {
    totalSent: 1000,
    delivered: 980,
    opened: 450,
    clicked: 200,
    bounced: 20,
    spamComplaints: 2,
  };

  const calculateRate = (value: number, total: number) => {
    return ((value / total) * 100).toFixed(1);
  };

  // Time series data for email activity
  const timeSeriesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Opens',
        data: [65, 75, 70, 80, 75, 68, 72],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Clicks',
        data: [28, 35, 32, 38, 30, 25, 32],
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1,
      },
    ],
  };

  // Device breakdown data
  const deviceData = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
      {
        data: [45, 40, 15],
        backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
          'rgb(255, 205, 86)',
        ],
      },
    ],
  };

  // Email status distribution
  const statusData = {
    labels: ['Delivered', 'Opened', 'Clicked', 'Bounced'],
    datasets: [
      {
        data: [980, 450, 200, 20],
        backgroundColor: [
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(255, 99, 132)',
        ],
      },
    ],
  };

  // Sample recipient data
  const recipients = [
    {
      email: 'user1@example.com',
      opened: true,
      clicked: true,
      bounced: false,
      device: 'Desktop',
      location: 'New York',
      openTime: '2024-03-15 10:30:00',
    },
    // Add more recipients as needed
  ];

  const downloadPDFReport = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Email Campaign Report', 20, 20);
    
    // Add campaign overview
    doc.setFontSize(14);
    doc.text('Campaign Overview', 20, 40);
    doc.setFontSize(12);
    doc.text(`Total Sent: ${campaignData.totalSent}`, 20, 50);
    doc.text(`Delivered: ${campaignData.delivered}`, 20, 60);
    doc.text(`Opened: ${campaignData.opened}`, 20, 70);
    doc.text(`Clicked: ${campaignData.clicked}`, 20, 80);
    
    // Save the PDF
    doc.save('campaign-report.pdf');
  };

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Email,Opened,Clicked,Bounced,Device,Location,Open Time\n" +
      recipients.map(r => 
        `${r.email},${r.opened},${r.clicked},${r.bounced},${r.device},${r.location},${r.openTime}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "campaign-data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Campaign Overview */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Campaign Overview</h3>
            <div className="flex space-x-2">
              <button
                onClick={downloadPDFReport}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Download className="h-4 w-4 mr-2" />
                PDF Report
              </button>
              <button
                onClick={downloadCSV}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </button>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BarChart2 className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Open Rate
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {calculateRate(campaignData.opened, campaignData.delivered)}%
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Click Rate
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {calculateRate(campaignData.clicked, campaignData.delivered)}%
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <PieChartIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Bounce Rate
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {calculateRate(campaignData.bounced, campaignData.totalSent)}%
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Email Activity Over Time */}
        <div className="bg-white shadow rounded-lg p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Email Activity</h4>
          <Line data={timeSeriesData} options={{ responsive: true }} />
        </div>

        {/* Device Breakdown */}
        <div className="bg-white shadow rounded-lg p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Device Breakdown</h4>
          <Pie data={deviceData} options={{ responsive: true }} />
        </div>

        {/* Email Status Distribution */}
        <div className="bg-white shadow rounded-lg p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Email Status</h4>
          <Pie data={statusData} options={{ responsive: true }} />
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white shadow rounded-lg p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Geographic Distribution</h4>
          <Bar
            data={{
              labels: ['New York', 'London', 'Tokyo', 'Paris', 'Sydney'],
              datasets: [
                {
                  label: 'Opens by Location',
                  data: [65, 59, 80, 81, 56],
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgb(75, 192, 192)',
                  borderWidth: 1,
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </div>
      </div>

      {/* Recipient Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Recipient Details</h3>
            <div className="flex space-x-2">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search recipients..."
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Device
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Open Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recipients.map((recipient, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {recipient.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      recipient.opened ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {recipient.opened ? 'Opened' : 'Not Opened'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {recipient.device}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {recipient.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {recipient.openTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;