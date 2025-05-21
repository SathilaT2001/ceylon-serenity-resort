
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CreditCard, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminPayments = () => {
  // Mock data for payments
  const mockPayments = [
    { id: 'P001', reservationId: 'RES001', guestName: 'John Doe', amount: 450, method: 'Credit Card', status: 'Completed', date: '2025-05-20' },
    { id: 'P002', reservationId: 'RES002', guestName: 'Jane Smith', amount: 1250, method: 'PayPal', status: 'Completed', date: '2025-05-25' },
    { id: 'P003', reservationId: 'RES003', guestName: 'Robert Johnson', amount: 1000, method: 'Bank Transfer', status: 'Pending', date: '2025-05-28' },
    { id: 'P004', reservationId: 'RES004', guestName: 'Sarah Williams', amount: 2250, method: 'Credit Card', status: 'Refunded', date: '2025-06-01' },
    { id: 'P005', reservationId: 'RES005', guestName: 'Michael Brown', amount: 300, method: 'Credit Card', status: 'Completed', date: '2025-06-15' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Payment Management</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" /> Export Records
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,250</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,000</div>
            <p className="text-xs text-muted-foreground">
              1 transaction pending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Refunded Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,250</div>
            <p className="text-xs text-muted-foreground">
              1 refund processed
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Reservation</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.id}</TableCell>
                  <TableCell>{payment.reservationId}</TableCell>
                  <TableCell>{payment.guestName}</TableCell>
                  <TableCell>${payment.amount}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      payment.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {payment.status}
                    </span>
                  </TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Details</Button>
                    <Button variant="ghost" size="sm">Invoice</Button>
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

export default AdminPayments;
