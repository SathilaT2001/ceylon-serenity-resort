
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const AdminReports = () => {
  const [activeTab, setActiveTab] = useState('financial');

  // Mock data for financial reports
  const financialReports = [
    { id: 'FR001', title: 'Monthly Revenue Report', period: 'May 2025', generated: '2025-06-01', type: 'PDF' },
    { id: 'FR002', title: 'Quarterly Financial Summary', period: 'Q2 2025', generated: '2025-07-01', type: 'Excel' },
    { id: 'FR003', title: 'Payment Collection Report', period: 'May 2025', generated: '2025-06-01', type: 'PDF' },
    { id: 'FR004', title: 'Service Revenue Breakdown', period: 'May 2025', generated: '2025-06-01', type: 'Excel' },
  ];

  // Mock data for occupancy reports
  const occupancyReports = [
    { id: 'OR001', title: 'Monthly Occupancy Report', period: 'May 2025', generated: '2025-06-01', type: 'PDF' },
    { id: 'OR002', title: 'Room Type Occupancy Analysis', period: 'Q2 2025', generated: '2025-07-01', type: 'Excel' },
    { id: 'OR003', title: 'Seasonal Trends Report', period: '2025', generated: '2025-06-15', type: 'PDF' },
  ];

  // Mock data for guest reports
  const guestReports = [
    { id: 'GR001', title: 'Guest Demographics Report', period: 'Q2 2025', generated: '2025-07-01', type: 'PDF' },
    { id: 'GR002', title: 'Guest Satisfaction Survey Results', period: 'May 2025', generated: '2025-06-01', type: 'Excel' },
    { id: 'GR003', title: 'Repeat Guest Analysis', period: '2025 YTD', generated: '2025-06-15', type: 'PDF' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <span className="text-muted-foreground">{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <Tabs defaultValue="financial" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
          <TabsTrigger value="guest">Guest</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <Button className="mb-6">
            <FileText className="mr-2 h-4 w-4" /> Generate New Report
          </Button>
          
          <TabsContent value="financial">
            <Card>
              <CardHeader>
                <CardTitle>Financial Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Generated On</TableHead>
                      <TableHead>Format</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {financialReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>{report.id}</TableCell>
                        <TableCell>{report.title}</TableCell>
                        <TableCell>{report.period}</TableCell>
                        <TableCell>{report.generated}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" /> Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="occupancy">
            <Card>
              <CardHeader>
                <CardTitle>Occupancy Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Generated On</TableHead>
                      <TableHead>Format</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {occupancyReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>{report.id}</TableCell>
                        <TableCell>{report.title}</TableCell>
                        <TableCell>{report.period}</TableCell>
                        <TableCell>{report.generated}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" /> Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guest">
            <Card>
              <CardHeader>
                <CardTitle>Guest Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Generated On</TableHead>
                      <TableHead>Format</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {guestReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>{report.id}</TableCell>
                        <TableCell>{report.title}</TableCell>
                        <TableCell>{report.period}</TableCell>
                        <TableCell>{report.generated}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" /> Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AdminReports;
