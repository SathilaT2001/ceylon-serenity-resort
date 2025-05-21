
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarIcon, Home, CreditCard, User, Calendar, Edit, CheckCircle, Bath, Wifi, Utensils, Plane } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface GuestProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  preferences: string;
}

interface Reservation {
  id: string;
  roomNumber: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  status: string;
  totalPrice: number;
}

interface ServiceRequest {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: JSX.Element;
  requested: boolean;
  requestDate?: string;
  status?: string;
}

const GuestDashboard = () => {
  const { user } = useAuth();
  
  // Profile state
  const [profile, setProfile] = useState<GuestProfile>({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+1 123-456-7890',
    address: '123 Main St, Anytown, CA 12345',
    preferences: 'Non-smoking room, extra pillows'
  });
  
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(profile);

  // Mock reservations data
  const [reservations] = useState<Reservation[]>([
    {
      id: "RES-001",
      roomNumber: "301",
      roomType: "Deluxe Ocean View",
      checkIn: "2025-05-25",
      checkOut: "2025-05-30",
      adults: 2,
      children: 1,
      status: "Confirmed",
      totalPrice: 1250
    },
    {
      id: "RES-002",
      roomNumber: "205",
      roomType: "Executive Suite",
      checkIn: "2025-07-10",
      checkOut: "2025-07-15",
      adults: 2,
      children: 0,
      status: "Pending",
      totalPrice: 1800
    }
  ]);

  // Services data
  const [services, setServices] = useState<ServiceRequest[]>([
    { 
      id: 'S001', 
      name: 'Premium Wi-Fi', 
      description: 'High-speed internet access for all your devices', 
      price: 10, 
      icon: <Wifi className="h-4 w-4" />,
      requested: false
    },
    { 
      id: 'S002', 
      name: 'Daily Breakfast', 
      description: 'Full breakfast buffet with local and international cuisine', 
      price: 25, 
      icon: <Utensils className="h-4 w-4" />,
      requested: false
    },
    { 
      id: 'S003', 
      name: 'Spa Package', 
      description: 'Full body massage and wellness treatments', 
      price: 120, 
      icon: <Bath className="h-4 w-4" />,
      requested: false
    },
    { 
      id: 'S004', 
      name: 'Airport Transfer', 
      description: 'Private transportation to/from airport', 
      price: 45, 
      icon: <Plane className="h-4 w-4" />,
      requested: false
    }
  ]);

  // My Service Requests
  const [myRequests, setMyRequests] = useState<ServiceRequest[]>([
    { 
      id: 'S003', 
      name: 'Spa Package', 
      description: 'Full body massage and wellness treatments', 
      price: 120, 
      icon: <Bath className="h-4 w-4" />,
      requested: true,
      requestDate: '2025-05-20',
      status: 'Confirmed'
    }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEditProfile = () => {
    setEditMode(true);
    setFormData(profile);
  };

  const handleSaveProfile = () => {
    setProfile(formData);
    setEditMode(false);
    toast({
      title: "Profile Updated",
      description: "Your information has been saved successfully."
    });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleServiceToggle = (serviceId: string, checked: boolean) => {
    setServices(services.map(service => 
      service.id === serviceId ? { ...service, requested: checked } : service
    ));
  };

  const handleRequestServices = () => {
    const selectedServices = services.filter(service => service.requested);
    
    if (selectedServices.length === 0) {
      toast({
        title: "No Services Selected",
        description: "Please select at least one service to request.",
        variant: "destructive"
      });
      return;
    }
    
    // Add the selected services to myRequests
    const newRequests = selectedServices.map(service => ({
      ...service,
      requestDate: new Date().toISOString().split('T')[0],
      status: 'Pending'
    }));
    
    setMyRequests([...myRequests, ...newRequests]);
    
    // Reset the selected services
    setServices(services.map(service => ({ ...service, requested: false })));
    
    toast({
      title: "Services Requested",
      description: `${selectedServices.length} service(s) have been requested successfully.`
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-6">Welcome back, {profile.name}</h1>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reservations">My Reservations</TabsTrigger>
          <TabsTrigger value="services">Request Services</TabsTrigger>
          <TabsTrigger value="profile">My Profile</TabsTrigger>
        </TabsList>
      
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-primary" />
                  Upcoming Stays
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {reservations.filter(r => r.status === "Confirmed").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Next check-in: {reservations.find(r => r.status === "Confirmed")?.checkIn || "None"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <CreditCard className="mr-2 h-4 w-4 text-primary" />
                  Loyalty Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,250</div>
                <p className="text-xs text-muted-foreground">
                  Silver Member Status
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Home className="mr-2 h-4 w-4 text-primary" />
                  Total Stays
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                  In the last 12 months
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Latest Reservations</CardTitle>
              <CardDescription>Your recent and upcoming bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Check-out</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell>{reservation.id}</TableCell>
                      <TableCell>{reservation.roomType} (Room {reservation.roomNumber})</TableCell>
                      <TableCell>{reservation.checkIn}</TableCell>
                      <TableCell>{reservation.checkOut}</TableCell>
                      <TableCell>
                        <Badge className={reservation.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                          {reservation.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>My Service Requests</CardTitle>
              <CardDescription>Services you've requested during your stay</CardDescription>
            </CardHeader>
            <CardContent>
              {myRequests.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Requested On</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="mr-2">{request.icon}</div>
                            {request.name}
                          </div>
                        </TableCell>
                        <TableCell>{request.requestDate}</TableCell>
                        <TableCell>${request.price}</TableCell>
                        <TableCell>
                          <Badge className={
                            request.status === "Confirmed" ? "bg-green-100 text-green-800" : 
                            request.status === "Completed" ? "bg-blue-100 text-blue-800" : 
                            "bg-yellow-100 text-yellow-800"
                          }>
                            {request.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No service requests yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reservations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Reservations</CardTitle>
              <CardDescription>All your bookings with us</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reservation ID</TableHead>
                    <TableHead>Room Type</TableHead>
                    <TableHead>Room Number</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Check-out</TableHead>
                    <TableHead>Guests</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell>{reservation.id}</TableCell>
                      <TableCell>{reservation.roomType}</TableCell>
                      <TableCell>{reservation.roomNumber}</TableCell>
                      <TableCell>{reservation.checkIn}</TableCell>
                      <TableCell>{reservation.checkOut}</TableCell>
                      <TableCell>{reservation.adults} Adults, {reservation.children} Children</TableCell>
                      <TableCell>${reservation.totalPrice}</TableCell>
                      <TableCell>
                        <Badge className={reservation.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                          {reservation.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto" onClick={() => window.location.href = "/booking"}>
                <CalendarIcon className="mr-2 h-4 w-4" /> Book New Stay
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Request Services</CardTitle>
              <CardDescription>Enhance your stay with our premium services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <Card key={service.id} className="overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        {service.icon} 
                        <span className="ml-2">{service.name}</span>
                      </CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <p className="font-medium">${service.price} / service</p>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id={`service-${service.id}`} 
                            checked={service.requested}
                            onCheckedChange={(checked) => handleServiceToggle(service.id, checked)}
                          />
                          <Label htmlFor={`service-${service.id}`}>
                            {service.requested ? 'Selected' : 'Select'}
                          </Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto" onClick={handleRequestServices}>
                <CheckCircle className="mr-2 h-4 w-4" /> Request Selected Services
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>My Requests</CardTitle>
              <CardDescription>Services you've already requested</CardDescription>
            </CardHeader>
            <CardContent>
              {myRequests.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Requested On</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="mr-2">{request.icon}</div>
                            {request.name}
                          </div>
                        </TableCell>
                        <TableCell>{request.requestDate}</TableCell>
                        <TableCell>${request.price}</TableCell>
                        <TableCell>
                          <Badge className={
                            request.status === "Confirmed" ? "bg-green-100 text-green-800" : 
                            request.status === "Completed" ? "bg-blue-100 text-blue-800" : 
                            "bg-yellow-100 text-yellow-800"
                          }>
                            {request.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No service requests yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Manage your personal details</CardDescription>
              </div>
              {!editMode && (
                <Button variant="outline" onClick={handleEditProfile}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {editMode ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferences">Preferences</Label>
                    <Textarea
                      id="preferences"
                      name="preferences"
                      value={formData.preferences}
                      onChange={handleInputChange}
                      placeholder="Room preferences, special requests, etc."
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  <div>
                    <div className="text-sm text-muted-foreground">Full Name</div>
                    <div className="font-medium">{profile.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium">{profile.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="font-medium">{profile.phone}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Address</div>
                    <div className="font-medium">{profile.address}</div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-sm text-muted-foreground">Preferences</div>
                    <div className="font-medium">{profile.preferences}</div>
                  </div>
                </div>
              )}
            </CardContent>
            {editMode && (
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                <Button onClick={handleSaveProfile}>Save Changes</Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GuestDashboard;
