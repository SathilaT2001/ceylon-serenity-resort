
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Home, Edit, Eye, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

type RoomStatus = 'Available' | 'Occupied' | 'Reserved' | 'Maintenance';

interface Room {
  id: string;
  type: string;
  status: RoomStatus;
  price: number;
  capacity: string;
  maintenance: boolean;
}

const AdminRooms = () => {
  // Mock data for rooms
  const initialRooms: Room[] = [
    { id: 'R101', type: 'Deluxe Room', status: 'Available', price: 150, capacity: '2 Adults, 1 Child', maintenance: false },
    { id: 'R102', type: 'Deluxe Room', status: 'Occupied', price: 150, capacity: '2 Adults, 1 Child', maintenance: false },
    { id: 'R201', type: 'Executive Suite', status: 'Available', price: 250, capacity: '2 Adults, 2 Children', maintenance: false },
    { id: 'R202', type: 'Executive Suite', status: 'Reserved', price: 250, capacity: '2 Adults, 2 Children', maintenance: false },
    { id: 'R301', type: 'Family Room', status: 'Maintenance', price: 200, capacity: '2 Adults, 2 Children', maintenance: true },
    { id: 'R401', type: 'Beachfront Villa', status: 'Available', price: 450, capacity: '2 Adults', maintenance: false },
  ];

  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    type: '',
    status: 'Available' as RoomStatus,
    price: 0,
    capacity: '',
    maintenance: false
  });

  const handleAddRoom = () => {
    setIsEditMode(false);
    setFormData({
      id: `R${401 + rooms.length}`,
      type: '',
      status: 'Available',
      price: 0,
      capacity: '',
      maintenance: false
    });
    setIsDialogOpen(true);
  };

  const handleViewRoom = (room: Room) => {
    setCurrentRoom(room);
    setIsViewDialogOpen(true);
  };

  const handleEditRoom = (room: Room) => {
    setIsEditMode(true);
    setFormData({
      id: room.id,
      type: room.type,
      status: room.status,
      price: room.price,
      capacity: room.capacity,
      maintenance: room.maintenance
    });
    setCurrentRoom(room);
    setIsDialogOpen(true);
  };

  const handleDeleteRoom = (room: Room) => {
    setCurrentRoom(room);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (currentRoom) {
      setRooms(rooms.filter(r => r.id !== currentRoom.id));
      toast({
        title: "Room Deleted",
        description: `Room ${currentRoom.id} has been removed from inventory.`
      });
      setIsDeleteDialogOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    });
  };

  const handleStatusChange = (status: string) => {
    const isMaintenance = status === 'Maintenance';
    setFormData({
      ...formData,
      status: status as RoomStatus,
      maintenance: isMaintenance
    });
  };

  const handleRoomTypeChange = (type: string) => {
    setFormData({
      ...formData,
      type
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode && currentRoom) {
      // Update existing room
      setRooms(rooms.map(room => 
        room.id === currentRoom.id ? { ...formData } : room
      ));
      
      toast({
        title: "Room Updated",
        description: `Room ${formData.id} has been updated successfully.`
      });
    } else {
      // Add new room
      setRooms([...rooms, { ...formData }]);
      
      toast({
        title: "Room Added",
        description: `Room ${formData.id} has been added to inventory.`
      });
    }
    
    setIsDialogOpen(false);
  };

  const availableCount = rooms.filter(room => room.status === 'Available').length;
  const occupiedCount = rooms.filter(room => room.status === 'Occupied').length;
  const maintenanceCount = rooms.filter(room => room.status === 'Maintenance').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Room Management</h1>
        <Button onClick={handleAddRoom}>
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
            <div className="text-2xl font-bold">{rooms.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
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
            <CardTitle className="text-sm font-medium">Occupied</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupiedCount}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((occupiedCount / rooms.length) * 100)}% of total rooms
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
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
              {rooms.map((room) => (
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
                  <TableCell className="space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => handleViewRoom(room)}>
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEditRoom(room)}>
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDeleteRoom(room)}>
                      <Trash className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Room Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Room' : 'Add New Room'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="id">Room Number</Label>
              <Input
                id="id"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                required
                placeholder="Enter room number"
                disabled={isEditMode}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Room Type</Label>
              <Select value={formData.type} onValueChange={handleRoomTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Deluxe Room">Deluxe Room</SelectItem>
                  <SelectItem value="Executive Suite">Executive Suite</SelectItem>
                  <SelectItem value="Family Room">Family Room</SelectItem>
                  <SelectItem value="Beachfront Villa">Beachfront Villa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price per Night ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                required
                placeholder="e.g., 2 Adults, 1 Child"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Occupied">Occupied</SelectItem>
                  <SelectItem value="Reserved">Reserved</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit">{isEditMode ? 'Update' : 'Add'} Room</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Room Dialog */}
      {currentRoom && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Room Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Room Number</p>
                  <p className="font-medium">{currentRoom.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">{currentRoom.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Price per Night</p>
                  <p className="font-medium">${currentRoom.price}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Capacity</p>
                  <p className="font-medium">{currentRoom.capacity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      currentRoom.status === 'Available' ? 'bg-green-100 text-green-800' : 
                      currentRoom.status === 'Occupied' ? 'bg-blue-100 text-blue-800' : 
                      currentRoom.status === 'Reserved' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {currentRoom.status}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Maintenance Required</p>
                  <p className="font-medium">{currentRoom.maintenance ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete Room {currentRoom?.id}? This action cannot be undone.</p>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button type="button" variant="destructive" onClick={confirmDelete}>Delete Room</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminRooms;
