
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminRooms = () => {
  // Mock data for rooms
  const mockRooms = [
    { id: 'R101', type: 'Deluxe Room', status: 'Available', price: 150, capacity: '2 Adults, 1 Child', maintenance: false },
    { id: 'R102', type: 'Deluxe Room', status: 'Occupied', price: 150, capacity: '2 Adults, 1 Child', maintenance: false },
    { id: 'R201', type: 'Executive Suite', status: 'Available', price: 250, capacity: '2 Adults, 2 Children', maintenance: false },
    { id: 'R202', type: 'Executive Suite', status: 'Reserved', price: 250, capacity: '2 Adults, 2 Children', maintenance: false },
    { id: 'R301', type: 'Family Room', status: 'Maintenance', price: 200, capacity: '2 Adults, 2 Children', maintenance: true },
    { id: 'R401', type: 'Beachfront Villa', status: 'Available', price: 450, capacity: '2 Adults', maintenance: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Room Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Room
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRooms.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              50% of total rooms
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Occupied</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              16.7% of total rooms
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              16.7% of total rooms
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Room Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room No.</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price/Night</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell>{room.id}</TableCell>
                  <TableCell>{room.type}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      room.status === 'Available' ? 'bg-green-100 text-green-800' : 
                      room.status === 'Occupied' ? 'bg-blue-100 text-blue-800' : 
                      room.status === 'Reserved' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {room.status}
                    </span>
                  </TableCell>
                  <TableCell>${room.price}</TableCell>
                  <TableCell>{room.capacity}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm">View</Button>
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

export default AdminRooms;
