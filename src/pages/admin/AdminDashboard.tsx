
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';
import { Calendar, CreditCard, Users, Check, Clock, Home } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import RecentBookings from '@/components/admin/RecentBookings';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the Ceylon Serenity Resort admin dashboard.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Bookings"
          value="3,842"
          description="12% increase from last month"
          icon={Calendar}
          trend="up"
        />
        <StatCard 
          title="Total Revenue"
          value="$429,582"
          description="8.2% increase from last month"
          icon={CreditCard}
          trend="up"
        />
        <StatCard 
          title="Current Guests"
          value="124"
          description="32 check-ins expected today"
          icon={Users}
          trend="none"
        />
        <StatCard 
          title="Room Occupancy"
          value="82%"
          description="5% higher than last week"
          icon={Home}
          trend="up"
        />
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
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

          {/* Recent Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentBookings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
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
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          {/* Status Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
                <Check className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">248</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">43</div>
                <p className="text-xs text-muted-foreground">
                  -8% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
                <Users className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">17</div>
                <p className="text-xs text-muted-foreground">
                  +2% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Bookings would go here */}
          <Card>
            <CardHeader>
              <CardTitle>All Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentBookings extended />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
