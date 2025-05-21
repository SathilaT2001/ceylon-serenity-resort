
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Bath, Wifi, Utensils, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminServices = () => {
  // Mock data for services
  const mockServices = [
    { id: 'S001', name: 'Premium Wi-Fi', description: 'High-speed internet access', price: 10, icon: <Wifi className="h-4 w-4" /> },
    { id: 'S002', name: 'Breakfast Buffet', description: 'Full breakfast with local and international cuisine', price: 25, icon: <Utensils className="h-4 w-4" /> },
    { id: 'S003', name: 'Spa Package', description: 'Full body massage and wellness treatments', price: 120, icon: <Bath className="h-4 w-4" /> },
    { id: 'S004', name: 'Airport Transfer', description: 'Private transportation to/from airport', price: 45, icon: <CreditCard className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Services Management</h1>
        <Button>
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
              {mockServices.map((service) => (
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
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
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

export default AdminServices;
