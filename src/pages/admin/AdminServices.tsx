
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Bath, Wifi, Utensils, CreditCard, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
}

const AdminServices = () => {
  // Mock data for services
  const initialServices: Service[] = [
    { id: 'S001', name: 'Premium Wi-Fi', description: 'High-speed internet access', price: 10, icon: <Wifi className="h-4 w-4" /> },
    { id: 'S002', name: 'Breakfast Buffet', description: 'Full breakfast with local and international cuisine', price: 25, icon: <Utensils className="h-4 w-4" /> },
    { id: 'S003', name: 'Spa Package', description: 'Full body massage and wellness treatments', price: 120, icon: <Bath className="h-4 w-4" /> },
    { id: 'S004', name: 'Airport Transfer', description: 'Private transportation to/from airport', price: 45, icon: <CreditCard className="h-4 w-4" /> },
  ];

  const [services, setServices] = useState<Service[]>(initialServices);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: 0
  });

  const handleAddService = () => {
    setIsEditMode(false);
    setFormData({
      id: `S${String(services.length + 1).padStart(3, '0')}`,
      name: '',
      description: '',
      price: 0
    });
    setIsDialogOpen(true);
  };

  const handleEditService = (service: Service) => {
    setIsEditMode(true);
    setFormData({
      id: service.id,
      name: service.name,
      description: service.description,
      price: service.price
    });
    setCurrentService(service);
    setIsDialogOpen(true);
  };

  const handleDeleteService = (service: Service) => {
    setCurrentService(service);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (currentService) {
      setServices(services.filter(s => s.id !== currentService.id));
      toast({
        title: "Service Deleted",
        description: `${currentService.name} has been removed from services.`
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode && currentService) {
      // Update existing service
      setServices(services.map(service => 
        service.id === currentService.id ? 
        { 
          ...service, 
          name: formData.name,
          description: formData.description,
          price: formData.price
        } : service
      ));
      
      toast({
        title: "Service Updated",
        description: `${formData.name} has been updated successfully.`
      });
    } else {
      // Add new service
      const newService: Service = {
        id: formData.id,
        name: formData.name,
        description: formData.description,
        price: formData.price,
        icon: <Utensils className="h-4 w-4" /> // Default icon, in a real app you'd let them choose
      };
      
      setServices([...services, newService]);
      
      toast({
        title: "Service Added",
        description: `${formData.name} has been added to services.`
      });
    }
    
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Services Management</h1>
        <Button onClick={handleAddService}>
          <Plus className="mr-2 h-4 w-4" /> Add Service
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Services</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>{service.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="mr-2">{service.icon}</div>
                      {service.name}
                    </div>
                  </TableCell>
                  <TableCell>{service.description}</TableCell>
                  <TableCell>${service.price}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleEditService(service)}>
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDeleteService(service)}>
                      <Trash className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Service Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Service' : 'Add New Service'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Service Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter service name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                placeholder="Enter service description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
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
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit">{isEditMode ? 'Update' : 'Add'} Service</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete {currentService?.name}? This action cannot be undone.</p>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button type="button" variant="destructive" onClick={confirmDelete}>Delete Service</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminServices;
