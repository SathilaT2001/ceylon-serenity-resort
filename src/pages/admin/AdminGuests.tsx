import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users } from 'lucide-react';
import axios from 'axios';

const AdminGuests = () => {  const [guests, setGuests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching guests...');
    setLoading(true);
    axios.get('http://localhost:5000/api/guests')
      .then(response => {
        console.log('Received guests data:', response.data);
        setGuests(response.data);
      })
      .catch(error => {
        console.error('Error fetching guests:', error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Guest Management</h1>
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <span className="text-muted-foreground">Total: {guests.length} guests</span>
        </div>
      </div>      <Card>
        <CardHeader>
          <CardTitle>All Guests</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Loading guests...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">Error: {error}</div>
          ) : guests.length === 0 ? (
            <div className="text-center py-4">No guests found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guest ID</TableHead>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>DOB</TableHead>
                  <TableHead>NIC</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Nationality</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {guests.map((guest) => (
                <TableRow key={guest.Guest_ID}>
                  <TableCell>{guest.Guest_ID}</TableCell>
                  <TableCell>{guest.First_Name}</TableCell>
                  <TableCell>{guest.Last_Name}</TableCell>
                  <TableCell>{guest.Address}</TableCell>
                  <TableCell>{new Date(guest.DOB).toLocaleDateString()}</TableCell>
                  <TableCell>{guest.NIC}</TableCell>
                  <TableCell>{guest.Email}</TableCell>
                  <TableCell>{guest.Contact_No}</TableCell>
                  <TableCell>{guest.Nationality}</TableCell>
                </TableRow>
              ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminGuests;
