
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarCheck, CalendarClock, CalendarMinus } from 'lucide-react';

interface Booking {
  id: string;
  guest: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  total: string;
}

interface RecentBookingsProps {
  extended?: boolean;
}

const RecentBookings: React.FC<RecentBookingsProps> = ({ extended = false }) => {
  // Mock data for recent bookings
  const bookings: Booking[] = [
    {
      id: 'BOOK-1234',
      guest: 'John Smith',
      room: 'Deluxe Ocean View',
      checkIn: '2025-06-01',
      checkOut: '2025-06-05',
      status: 'confirmed',
      total: '$1,250.00',
    },
    {
      id: 'BOOK-1235',
      guest: 'Sarah Johnson',
      room: 'Presidential Villa',
      checkIn: '2025-05-28',
      checkOut: '2025-06-02',
      status: 'confirmed',
      total: '$2,750.00',
    },
    {
      id: 'BOOK-1236',
      guest: 'Robert Chen',
      room: 'Garden Suite',
      checkIn: '2025-06-10',
      checkOut: '2025-06-15',
      status: 'pending',
      total: '$1,600.00',
    },
    {
      id: 'BOOK-1237',
      guest: 'Priya Patel',
      room: 'Deluxe Ocean View',
      checkIn: '2025-05-25',
      checkOut: '2025-05-27',
      status: 'cancelled',
      total: '$500.00',
    },
    {
      id: 'BOOK-1238',
      guest: 'Michael Taylor',
      room: 'Garden Suite',
      checkIn: '2025-06-15',
      checkOut: '2025-06-20',
      status: 'confirmed',
      total: '$1,600.00',
    },
  ];

  // Display only the first 3 bookings unless extended is true
  const displayBookings = extended ? bookings : bookings.slice(0, 3);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CalendarCheck className="mr-1 h-3 w-3" /> Confirmed
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-600">
            <CalendarClock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge variant="destructive">
            <CalendarMinus className="mr-1 h-3 w-3" /> Cancelled
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
            <TableHead>Guest</TableHead>
            <TableHead>Room Type</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total</TableHead>
            {extended && <TableHead></TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayBookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">{booking.id}</TableCell>
              <TableCell>{booking.guest}</TableCell>
              <TableCell>{booking.room}</TableCell>
              <TableCell>{booking.checkIn}</TableCell>
              <TableCell>{booking.checkOut}</TableCell>
              <TableCell>{getStatusBadge(booking.status)}</TableCell>
              <TableCell className="text-right">{booking.total}</TableCell>
              {extended && (
                <TableCell>
                  <Button variant="ghost" size="sm">View</Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {!extended && (
        <div className="mt-4 flex justify-center">
          <Button variant="outline" size="sm">View All Bookings</Button>
        </div>
      )}
    </div>
  );
};

export default RecentBookings;
