
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Clock, Check, Loader2 } from 'lucide-react';

type ServiceStatus = 'Pending' | 'In Progress' | 'Completed';

interface ServiceRequest {
  id: string;
  guestName: string;
  roomNumber: string;
  service: string;
  requestTime: string;
  status: ServiceStatus;
}

const ServiceRequests = () => {
  // Mock data for service requests
  const initialRequests: ServiceRequest[] = [
    { id: 'SR001', guestName: 'John Smith', roomNumber: '101', service: 'Premium Wi-Fi', requestTime: '2025-05-21 08:30', status: 'Pending' },
    { id: 'SR002', guestName: 'Emma Johnson', roomNumber: '205', service: 'Breakfast Buffet', requestTime: '2025-05-21 07:15', status: 'In Progress' },
    { id: 'SR003', guestName: 'Michael Brown', roomNumber: '302', service: 'Spa Package', requestTime: '2025-05-20 16:45', status: 'Completed' },
    { id: 'SR004', guestName: 'Sophia Williams', roomNumber: '402', service: 'Airport Transfer', requestTime: '2025-05-21 10:00', status: 'Pending' },
    { id: 'SR005', guestName: 'James Davis', roomNumber: '103', service: 'Premium Wi-Fi', requestTime: '2025-05-21 09:20', status: 'In Progress' },
    { id: 'SR006', guestName: 'Olivia Miller', roomNumber: '204', service: 'Breakfast Buffet', requestTime: '2025-05-21 06:50', status: 'Pending' },
    { id: 'SR007', guestName: 'William Wilson', roomNumber: '305', service: 'Spa Package', requestTime: '2025-05-20 14:30', status: 'Completed' },
    { id: 'SR008', guestName: 'Isabella Moore', roomNumber: '403', service: 'Airport Transfer', requestTime: '2025-05-21 11:15', status: 'In Progress' },
  ];

  const [requests, setRequests] = useState<ServiceRequest[]>(initialRequests);

  const updateRequestStatus = (requestId: string, newStatus: ServiceStatus) => {
    setRequests(requests.map(request => 
      request.id === requestId ? { ...request, status: newStatus } : request
    ));
    
    const request = requests.find(r => r.id === requestId);
    
    toast({
      title: "Service Request Updated",
      description: `${request?.service} for ${request?.guestName} is now ${newStatus}`,
    });
  };

  const pendingCount = requests.filter(req => req.status === 'Pending').length;
  const inProgressCount = requests.filter(req => req.status === 'In Progress').length;
  const completedCount = requests.filter(req => req.status === 'Completed').length;

  const getStatusBadge = (status: ServiceStatus) => {
    switch (status) {
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-900"><Clock className="mr-1 h-3 w-3" /> Pending</Badge>;
      case 'In Progress':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900"><Loader2 className="mr-1 h-3 w-3 animate-spin" /> In Progress</Badge>;
      case 'Completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900"><Check className="mr-1 h-3 w-3" /> Completed</Badge>;
      default:
        return null;
    }
  };

  const getNextStatusButton = (request: ServiceRequest) => {
    if (request.status === 'Pending') {
      return (
        <Button size="sm" variant="outline" onClick={() => updateRequestStatus(request.id, 'In Progress')}>
          Start Service
        </Button>
      );
    }
    
    if (request.status === 'In Progress') {
      return (
        <Button size="sm" variant="outline" onClick={() => updateRequestStatus(request.id, 'Completed')}>
          Mark Complete
        </Button>
      );
    }
    
    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Service Requests</h1>
        <p className="text-muted-foreground">Manage and track guest service requests.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressCount}</div>
            <p className="text-xs text-muted-foreground">
              Currently being handled
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCount}</div>
            <p className="text-xs text-muted-foreground">
              Successfully delivered
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Service Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Requested Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>{request.guestName}</TableCell>
                  <TableCell>{request.roomNumber}</TableCell>
                  <TableCell>{request.service}</TableCell>
                  <TableCell>{request.requestTime}</TableCell>
                  <TableCell>
                    {getStatusBadge(request.status)}
                  </TableCell>
                  <TableCell>
                    {getNextStatusButton(request)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceRequests;
