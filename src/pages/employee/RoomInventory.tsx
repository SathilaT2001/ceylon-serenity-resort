
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Home, Check, AlertTriangle, Clock } from 'lucide-react';

type RoomStatus = 'Available' | 'Booked' | 'Under Maintenance';

interface Room {
  id: string;
  number: string;
  type: string;
  status: RoomStatus;
}

const RoomInventory = () => {
  // Mock data for rooms
  const initialRooms: Room[] = [
    { id: 'R101', number: '101', type: 'Deluxe Room', status: 'Available' },
    { id: 'R102', number: '102', type: 'Deluxe Room', status: 'Booked' },
    { id: 'R103', number: '103', type: 'Deluxe Room', status: 'Available' },
    { id: 'R104', number: '104', type: 'Deluxe Room', status: 'Under Maintenance' },
    { id: 'R105', number: '105', type: 'Deluxe Room', status: 'Available' },
    { id: 'R201', number: '201', type: 'Executive Suite', status: 'Available' },
    { id: 'R202', number: '202', type: 'Executive Suite', status: 'Booked' },
    { id: 'R203', number: '203', type: 'Executive Suite', status: 'Booked' },
    { id: 'R204', number: '204', type: 'Executive Suite', status: 'Available' },
    { id: 'R205', number: '205', type: 'Executive Suite', status: 'Available' },
    { id: 'R301', number: '301', type: 'Family Room', status: 'Under Maintenance' },
    { id: 'R302', number: '302', type: 'Family Room', status: 'Available' },
    { id: 'R303', number: '303', type: 'Family Room', status: 'Booked' },
    { id: 'R304', number: '304', type: 'Family Room', status: 'Available' },
    { id: 'R305', number: '305', type: 'Family Room', status: 'Available' },
    { id: 'R401', number: '401', type: 'Beachfront Villa', status: 'Booked' },
    { id: 'R402', number: '402', type: 'Beachfront Villa', status: 'Available' },
    { id: 'R403', number: '403', type: 'Beachfront Villa', status: 'Available' },
    { id: 'R404', number: '404', type: 'Beachfront Villa', status: 'Available' },
    { id: 'R405', number: '405', type: 'Beachfront Villa', status: 'Under Maintenance' },
  ];

  const [rooms, setRooms] = useState<Room[]>(initialRooms);

  const updateRoomStatus = (roomId: string, newStatus: RoomStatus) => {
    setRooms(rooms.map(room => 
      room.id === roomId ? { ...room, status: newStatus } : room
    ));
    
    toast({
      title: "Room Updated",
      description: `Room ${rooms.find(r => r.id === roomId)?.number} status changed to ${newStatus}`,
    });
  };

  const availableCount = rooms.filter(room => room.status === 'Available').length;
  const bookedCount = rooms.filter(room => room.status === 'Booked').length;
  const maintenanceCount = rooms.filter(room => room.status === 'Under Maintenance').length;

  const getStatusBadge = (status: RoomStatus) => {
    switch (status) {
      case 'Available':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900"><Check className="mr-1 h-3 w-3" /> Available</Badge>;
      case 'Booked':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900"><Clock className="mr-1 h-3 w-3" /> Booked</Badge>;
      case 'Under Maintenance':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 hover:text-red-900"><AlertTriangle className="mr-1 h-3 w-3" /> Maintenance</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Room Inventory</h1>
        <p className="text-muted-foreground">Manage hotel room status and availability.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <Home className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableCount}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((availableCount / rooms.length) * 100)}% of total rooms
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Booked</CardTitle>
            <Home className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookedCount}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((bookedCount / rooms.length) * 100)}% of total rooms
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Under Maintenance</CardTitle>
            <Home className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{maintenanceCount}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((maintenanceCount / rooms.length) * 100)}% of total rooms
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Room Status Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room No.</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Current Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell>{room.number}</TableCell>
                  <TableCell>{room.type}</TableCell>
                  <TableCell>
                    {getStatusBadge(room.status)}
                  </TableCell>
                  <TableCell>
                    <Select onValueChange={(value) => updateRoomStatus(room.id, value as RoomStatus)} defaultValue={room.status}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Change status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Booked">Booked</SelectItem>
                        <SelectItem value="Under Maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
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

export default RoomInventory;
