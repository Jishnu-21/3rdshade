'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart as BarChartIcon, 
  Users, 
  Clock, 
  Eye, 
  MousePointerClick, 
  Globe, 
  ArrowUpRight,
  LineChart,
  Activity,
  TrendingUp,
  ExternalLink,
  Calendar
} from 'lucide-react';
import { Card, AreaChart, Title, Text, Flex } from '@tremor/react';

// Define the expected data structure
interface AnalyticsData {
  dailyViews: { date: string; views: number; visitors: number }[];
  referrers: { source: string; visits: number }[];
  topPages: { path: string; views: number; visitors: number }[];
  totalViews: number | null;
  totalVisitors: number | null;
  averageDuration: string | null;
}

// Format date for chart display
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Enhance tooltip with better styling
const CustomTooltip = ({ payload, active }: { payload?: any[]; active?: boolean }) => {
  if (!active || !payload) return null;
  return (
    <div className="w-64 rounded-xl text-tremor-default bg-white/95 backdrop-blur-sm p-4 shadow-lg border border-gray-200">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <p className="text-tremor-content-emphasis font-medium">
            {formatDate(payload[0]?.payload?.date)}
          </p>
        </div>
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-500" />
            <span className="text-tremor-content">Views</span>
          </div>
          <span className="font-medium text-tremor-content-emphasis">
            {payload[0]?.value?.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-500" />
            <span className="text-tremor-content">Visitors</span>
          </div>
          <span className="font-medium text-tremor-content-emphasis">
            {payload[1]?.value?.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

// Enhanced empty state with better styling
const EmptyState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center p-12 text-center">
    <Activity className="w-16 h-16 text-gray-300 mb-4 animate-pulse" />
    <Text className="text-gray-600 font-medium text-lg mb-2">{message}</Text>
    <Text className="text-gray-400 text-sm">Select a different time range or check back later</Text>
  </div>
);

// Card header component for consistency
const CardHeader = ({ icon: Icon, title, subtitle, color }: { 
  icon: (props: { className?: string }) => JSX.Element, 
  title: string, 
  subtitle?: string,
  color: string 
}) => (
  <div className="flex items-center gap-4 mb-4">
    <div className={`p-3 ${color} rounded-xl`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <Title className="text-lg font-semibold">{title}</Title>
      {subtitle && <Text className="text-sm text-gray-500 mt-1">{subtitle}</Text>}
    </div>
  </div>
);

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [range, setRange] = useState('7d');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const res = await fetch(`/api/admin/analytics?range=${range}`, {
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.detail || 'Failed to fetch analytics');
        }

        const analyticsData: AnalyticsData = await res.json();
        setData(analyticsData);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        setData(null);
      }
    };
    fetchData();
  }, [range]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-500 text-center">
          <p className="text-lg font-medium mb-2">Error: {error}</p>
          <button
            onClick={() => setRange(range)}
            className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all shadow-sm hover:shadow-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  const hasData = data.totalViews !== null && data.totalViews > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <LineChart className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h1>
        </div>
        <div className="flex gap-2">
          {['7d', '30d', '90d'].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                range === r 
                  ? 'bg-blue-500 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {r === '7d' ? '7 Days' : r === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {!hasData ? (
        <Card className="bg-white shadow-sm">
          <EmptyState message="No analytics data available for the selected period" />
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white shadow-sm hover:shadow-md transition-all">
              <CardHeader
                icon={(props: { className?: string }) => <Eye {...props} className={props.className} />}
                title="Total Views"
                color="bg-blue-50"
              />
              <div className="mt-4">
                <Title className="text-2xl font-bold">{data.totalViews?.toLocaleString()}</Title>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <Text className="text-sm text-emerald-600">Growing steadily</Text>
                </div>
              </div>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-all">
              <CardHeader
                icon={(props: { className?: string }) => <MousePointerClick {...props} className={props.className} />}
                title="Total Visitors"
                color="bg-emerald-50"
              />
              <div className="mt-4">
                <Title className="text-2xl font-bold">{data.totalVisitors?.toLocaleString()}</Title>
                <div className="flex items-center gap-2 mt-2">
                  <Users className="w-4 h-4 text-emerald-500" />
                  <Text className="text-sm text-emerald-600">Active users</Text>
                </div>
              </div>
            </Card>
            
            {data.averageDuration && (
              <Card className="bg-white shadow-sm hover:shadow-md transition-all">
                <CardHeader
                  icon={(props: { className?: string }) => <Clock {...props} className={props.className} />}
                  title="Avg Duration"
                  color="bg-violet-50"
                />
                <div className="mt-4">
                  <Title className="text-2xl font-bold">{data.averageDuration}</Title>
                  <div className="flex items-center gap-2 mt-2">
                    <Activity className="w-4 h-4 text-violet-500" />
                    <Text className="text-sm text-violet-600">Session time</Text>
                  </div>
                </div>
              </Card>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {data.dailyViews.length > 0 && (
              <Card className="lg:col-span-4 bg-white shadow-sm hover:shadow-md transition-all">
                <CardHeader
                  icon={(props: { className?: string }) => <BarChartIcon {...props} className={props.className} />}
                  title="Traffic Overview"
                  subtitle="Daily views and visitors"
                  color="bg-blue-50"
                />
                <div className="h-[400px]">
                  <AreaChart
                    data={data.dailyViews.map(d => ({
                      ...d,
                      date: formatDate(d.date)
                    }))}
                    index="date"
                    categories={['views', 'visitors']}
                    colors={['blue', 'emerald']}
                    valueFormatter={(n: number) => n.toLocaleString()}
                    yAxisWidth={48}
                    showLegend={true}
                    className="h-full"
                    customTooltip={CustomTooltip}
                    curveType="monotone"
                    showAnimation={true}
                  />
                </div>
              </Card>
            )}

            {data.topPages.length > 0 && (
              <Card className="lg:col-span-2 bg-white shadow-sm hover:shadow-md transition-all">
                <CardHeader
                  icon={(props: { className?: string }) => <Globe {...props} className={props.className} />}
                  title="Top Pages"
                  subtitle="Most viewed pages"
                  color="bg-emerald-50"
                />
                <div className="flex-1 overflow-auto">
                  <div className="space-y-4">
                    {data.topPages.map((page) => (
                      <div key={page.path} className="flex items-start justify-between gap-4 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-gray-900 truncate">{page.path}</p>
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {page.views.toLocaleString()} views • {page.visitors.toLocaleString()} visitors
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {data.referrers.length > 0 && (
              <Card className="lg:col-span-2 bg-white shadow-sm hover:shadow-md transition-all">
                <CardHeader
                  icon={(props: { className?: string }) => <ArrowUpRight {...props} className={props.className} />}
                  title="Top Referrers"
                  subtitle="Traffic sources"
                  color="bg-blue-50"
                />
                <div className="flex-1 overflow-auto">
                  <div className="space-y-4">
                    {data.referrers.map((referrer) => (
                      <div key={referrer.source} className="flex items-start justify-between gap-4 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-gray-900 truncate">{referrer.source}</p>
                            {referrer.source !== 'Direct' && (
                              <ExternalLink className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{referrer.visits.toLocaleString()} visits</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  );
}