import React, { createContext, useContext, useState, useEffect } from 'react';

interface AnalyticsData {
  totalSent: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
  spamComplaints: number;
  recipients: Array<{
    email: string;
    opened: boolean;
    clicked: boolean;
    bounced: boolean;
    device: string;
    location: string;
    openTime: string;
  }>;
  timeSeriesData: {
    labels: string[];
    opens: number[];
    clicks: number[];
  };
  deviceBreakdown: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  locationData: {
    [key: string]: number;
  };
}

interface AnalyticsContextType {
  analyticsData: AnalyticsData;
  updateAnalytics: (data: Partial<AnalyticsData>) => void;
  resetAnalytics: () => void;
}

const defaultAnalytics: AnalyticsData = {
  totalSent: 0,
  delivered: 0,
  opened: 0,
  clicked: 0,
  bounced: 0,
  spamComplaints: 0,
  recipients: [],
  timeSeriesData: {
    labels: [],
    opens: [],
    clicks: [],
  },
  deviceBreakdown: {
    desktop: 0,
    mobile: 0,
    tablet: 0,
  },
  locationData: {},
};

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>(defaultAnalytics);

  const updateAnalytics = (data: Partial<AnalyticsData>) => {
    setAnalyticsData(prev => ({
      ...prev,
      ...data,
    }));
  };

  const resetAnalytics = () => {
    setAnalyticsData(defaultAnalytics);
  };

  return (
    <AnalyticsContext.Provider value={{ analyticsData, updateAnalytics, resetAnalytics }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};