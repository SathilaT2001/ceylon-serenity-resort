
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from 'lucide-react';

const AdminReservations = () => {
  // Mock data for reservations
  const mockReservations = [
    { id: 'RES001', guestName: 'John Doe', roomType: 'Deluxe Room', checkIn: '2025-05-25', checkOut: '2025-05-28', status: 'Confirmed' },
    { id: 'RES002', guestName: 'Jane Smith', roomType: 'Executive Suite', checkIn: '2025-06-01', checkOut: '2025-06-05', status: 'Pending' },
    { id: 'RES003', guestName: 'Robert Johnson', roomType: 'Family Room', checkIn: '2025-06-10', checkOut: '2025-06-15', status: 'Confirmed' },
    { id: 'RES004', guestName: 'Sarah Williams', roomType: 'Beachfront Villa', checkIn: '2025-06-20', checkOut: '2025-06-25', status: 'Cancelled' },
    { id: 'RES005', guestName: 'Michael Brown', roomType: 'Deluxe Room', checkIn: '2025-07-01', checkOut: '2025-07-03', status: 'Confirmed' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reservations</h1>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <span className="text-muted-foreground">{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Reservations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reservation ID</TableHead>
                <TableHead>Guest Name</TableHead>
                <TableHead>Room Type</TableHead>
                <TableHead>Check-In</TableHead>
                <TableHead>Check-Out</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>{reservation.id}</TableCell>
                  <TableCell>{reservation.guestName}</TableCell>
                  <TableCell>{reservation.roomType}</TableCell>
                  <TableCell>{reservation.checkIn}</TableCell>
                  <TableCell>{reservation.checkOut}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      reservation.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                      reservation.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {reservation.status}
                    </span>
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

export default AdminReservations;
