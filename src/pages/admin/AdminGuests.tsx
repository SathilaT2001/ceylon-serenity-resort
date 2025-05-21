
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users } from 'lucide-react';

const AdminGuests = () => {
  // Mock data for guests
  const mockGuests = [
    { id: 'G001', name: 'John Doe', email: 'john@example.com', phone: '+1234567890', nationality: 'USA', visits: 3 },
    { id: 'G002', name: 'Jane Smith', email: 'jane@example.com', phone: '+1987654321', nationality: 'UK', visits: 1 },
    { id: 'G003', name: 'Robert Johnson', email: 'robert@example.com', phone: '+1122334455', nationality: 'Canada', visits: 2 },
    { id: 'G004', name: 'Sarah Williams', email: 'sarah@example.com', phone: '+1555666777', nationality: 'Australia', visits: 5 },
    { id: 'G005', name: 'Michael Brown', email: 'michael@example.com', phone: '+1888999000', nationality: 'Germany', visits: 1 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Guest Management</h1>
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <span className="text-muted-foreground">Total: {mockGuests.length} guests</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Guests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Nationality</TableHead>
                <TableHead>Total Visits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockGuests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell>{guest.id}</TableCell>
                  <TableCell>{guest.name}</TableCell>
                  <TableCell>{guest.email}</TableCell>
                  <TableCell>{guest.phone}</TableCell>
                  <TableCell>{guest.nationality}</TableCell>
                  <TableCell>{guest.visits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminGuests;
