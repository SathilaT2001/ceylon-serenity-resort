
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';
import { ChartBar } from 'lucide-react';

const AdminAnalytics = () => {
  // Mock data for charts
  const occupancyData = [
    { month: 'Jan', rate: 65 },
    { month: 'Feb', rate: 73 },
    { month: 'Mar', rate: 80 },
    { month: 'Apr', rate: 75 },
    { month: 'May', rate: 68 },
    { month: 'Jun', rate: 82 },
    { month: 'Jul', rate: 95 },
    { month: 'Aug', rate: 98 },
    { month: 'Sep', rate: 85 },
    { month: 'Oct', rate: 78 },
    { month: 'Nov', rate: 72 },
    { month: 'Dec', rate: 90 },
  ];

  const seasonalityData = [
    { month: 'Jan', weekend: 85, weekday: 60 },
    { month: 'Feb', weekend: 88, weekday: 65 },
    { month: 'Mar', weekend: 90, weekday: 70 },
    { month: 'Apr', weekend: 85, weekday: 65 },
    { month: 'May', weekend: 80, weekday: 60 },
    { month: 'Jun', weekend: 85, weekday: 75 },
    { month: 'Jul', weekend: 95, weekday: 85 },
    { month: 'Aug', weekend: 98, weekday: 90 },
    { month: 'Sep', weekend: 90, weekday: 75 },
    { month: 'Oct', weekend: 85, weekday: 70 },
    { month: 'Nov', weekend: 82, weekday: 65 },
    { month: 'Dec', weekend: 95, weekday: 80 },
  ];

  const serviceData = [
    { name: 'Spa Services', value: 35 },
    { name: 'Airport Transfer', value: 25 },
    { name: 'Dining', value: 20 },
    { name: 'Excursions', value: 15 },
    { name: 'Other', value: 5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const revenueData = [
    { month: 'Jan', revenue: 42000 },
    { month: 'Feb', revenue: 48000 },
    { month: 'Mar', revenue: 55000 },
    { month: 'Apr', revenue: 50000 },
    { month: 'May', revenue: 45000 },
    { month: 'Jun', revenue: 58000 },
    { month: 'Jul', revenue: 70000 },
    { month: 'Aug', revenue: 75000 },
    { month: 'Sep', revenue: 62000 },
    { month: 'Oct', revenue: 52000 },
    { month: 'Nov', revenue: 48000 },
    { month: 'Dec', revenue: 65000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <div className="flex items-center space-x-2">
          <ChartBar className="h-5 w-5 text-muted-foreground" />
          <span className="text-muted-foreground">Data updated daily</span>
        </div>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue ($)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Occupancy Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={occupancyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="rate" stroke="#3498db" name="Occupancy %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Services Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Top Services Ordered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seasonality Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weekday vs. Weekend Occupancy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={seasonalityData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="weekend" name="Weekend Occupancy %" fill="#8884d8" />
                <Bar dataKey="weekday" name="Weekday Occupancy %" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
