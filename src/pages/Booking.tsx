import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import RoomTypeSelector from '@/components/booking/RoomTypeSelector';
import ServiceSelector from '@/components/booking/ServiceSelector';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { CalendarIcon, CreditCard, Wifi, Utensils, Bath } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface RoomType {
  id: string;
  name: string;
  description: string;
  price: number;
  pricePerNight: number;
  capacity: string;
  features: string[];
  amenities: string[];
  image: string;
  tag?: string;
}

const roomTypes: RoomType[] = [
  {
    id: 'deluxe',
    name: 'Deluxe Room',
    description: 'Spacious and comfortable accommodations with modern amenities.',
    pricePerNight: 150,
    price: 150,
    capacity: '2 Adults, 1 Child',
    features: ['King Bed', 'Ocean View', 'Free Wi-Fi', 'Mini Bar'],
    amenities: ['King Bed', 'Ocean View', 'Free Wi-Fi', 'Mini Bar'],
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070'
  },
  {
    id: 'suite',
    name: 'Executive Suite',
    description: 'Luxurious suite with separate living area and premium amenities.',
    pricePerNight: 250,
    price: 250,
    capacity: '2 Adults, 2 Children',
    features: ['King Bed', 'Balcony', 'Jacuzzi', 'Lounge Area'],
    amenities: ['King Bed', 'Balcony', 'Jacuzzi', 'Lounge Area'],
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070'
  },
  {
    id: 'family',
    name: 'Family Room',
    description: 'Perfect for families with spacious layout and convenient amenities.',
    pricePerNight: 200,
    price: 200,
    capacity: '2 Adults, 2 Children',
    features: ['2 Queen Beds', 'Kids Area', 'Family Entertainment', 'Kitchenette'],
    amenities: ['2 Queen Beds', 'Kids Area', 'Family Entertainment', 'Kitchenette'],
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074'
  },
  {
    id: 'villa',
    name: 'Beachfront Villa',
    description: 'Exclusive villa with direct beach access and private pool.',
    pricePerNight: 450,
    price: 450,
    capacity: '2 Adults',
    features: ['King Bed', 'Private Pool', 'Direct Beach Access', 'Outdoor Dining'],
    amenities: ['King Bed', 'Private Pool', 'Direct Beach Access', 'Outdoor Dining'],
    image: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?q=80&w=2025'
  },
];

const services = [
  {
    id: 'wifi',
    name: 'Premium Wi-Fi',
    description: 'High-speed internet for streaming and video calls',
    price: 10,
    icon: <Wifi className="h-6 w-6 text-primary" />
  },
  {
    id: 'breakfast',
    name: 'Daily Breakfast',
    description: 'Full breakfast buffet with local and international cuisine',
    price: 25,
    icon: <Utensils className="h-6 w-6 text-primary" />
  },
  {
    id: 'spa',
    name: 'Spa Package',
    description: 'Relaxing massage and wellness treatments',
    price: 120,
    icon: <Bath className="h-6 w-6 text-primary" />
  },
  {
    id: 'airport',
    name: 'Airport Transfer',
    description: 'Comfortable private transportation to/from the airport',
    price: 45,
    icon: <CreditCard className="h-6 w-6 text-primary" />
  }
];

const Booking = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  // Default room type from navigation state if available
  const initialRoomType = location.state?.roomType || 'deluxe';
  
  // Form state
  const [activeTab, setActiveTab] = useState('rooms');
  const [selectedRoomType, setSelectedRoomType] = useState(initialRoomType);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [specialRequests, setSpecialRequests] = useState('');
  const [guestDetails, setGuestDetails] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: '',
  });
  
  // Payment details
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  
  useEffect(() => {
    // If a room type was passed in the navigation state, scroll to the room selector
    if (location.state?.roomType) {
      const roomsSection = document.getElementById('rooms-section');
      if (roomsSection) {
        roomsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.state]);
  
  // Calculate total price
  const calculateTotal = () => {
    const selectedRoom = roomTypes.find(room => room.id === selectedRoomType);
    if (!selectedRoom || !checkInDate || !checkOutDate) return 0;
    
    // Calculate number of nights
    const nights = Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Room cost
    let total = selectedRoom.pricePerNight * nights;
    
    // Add services cost
    services.forEach(service => {
      if (selectedServices.includes(service.id)) {
        total += service.price;
      }
    });
    
    return total;
  };
  
  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId) 
        : [...prev, serviceId]
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkInDate || !checkOutDate) {
      toast({
        title: "Missing Dates",
        description: "Please select both check-in and check-out dates.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would submit the booking to an API
    toast({
      title: "Booking Submitted",
      description: "Your booking request has been received. Check your email for confirmation.",
    });
    
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Book Your Stay</h1>
        <p className="text-muted-foreground">
          Experience luxury and tranquility at Ceylon Serenity Resort.
          Complete the form below to make your reservation.
        </p>
      </div>
      
      <Tabs defaultValue="rooms" value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-3 w-full mb-6">
          <TabsTrigger value="rooms">1. Select Room</TabsTrigger>
          <TabsTrigger value="details">2. Guest Details</TabsTrigger>
          <TabsTrigger value="payment">3. Payment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rooms" id="rooms-section">
          <Card>
            <CardHeader>
              <CardTitle>Select Your Room</CardTitle>
              <CardDescription>Choose from our luxurious accommodation options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="check-in">Check-in Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkInDate ? format(checkInDate, 'PPP') : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkInDate}
                          onSelect={setCheckInDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="check-out">Check-out Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkInDate && "pointer-events-none opacity-50"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOutDate ? format(checkOutDate, 'PPP') : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkOutDate}
                          onSelect={setCheckOutDate}
                          initialFocus
                          disabled={(date) => !checkInDate || date <= checkInDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="adults">Adults</Label>
                    <Input 
                      id="adults" 
                      type="number" 
                      min="1" 
                      max="4" 
                      value={adults}
                      onChange={(e) => setAdults(parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="children">Children</Label>
                    <Input 
                      id="children" 
                      type="number" 
                      min="0" 
                      max="3" 
                      value={children}
                      onChange={(e) => setChildren(parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Select Room Type</h3>
                <RoomTypeSelector 
                  roomTypes={roomTypes} 
                  selectedRoomType={selectedRoomType} 
                  onSelectRoom={(id) => setSelectedRoomType(id)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
              <Button variant="outline" onClick={() => navigate('/')}>Cancel</Button>
              <Button onClick={() => setActiveTab('details')}>Continue</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Guest Details</CardTitle>
              <CardDescription>Provide your information for the reservation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    value={guestDetails.firstName} 
                    onChange={(e) => setGuestDetails({...guestDetails, firstName: e.target.value})}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    value={guestDetails.lastName} 
                    onChange={(e) => setGuestDetails({...guestDetails, lastName: e.target.value})}
                    required 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={guestDetails.email} 
                    onChange={(e) => setGuestDetails({...guestDetails, email: e.target.value})}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={guestDetails.phone} 
                    onChange={(e) => setGuestDetails({...guestDetails, phone: e.target.value})}
                    required 
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Additional Services</h3>
                <ServiceSelector 
                  services={services} 
                  selectedServices={selectedServices} 
                  onToggleService={handleServiceToggle}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="requests">Special Requests</Label>
                <Textarea 
                  id="requests" 
                  placeholder="Any special requirements or preferences..." 
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
              <Button variant="outline" onClick={() => setActiveTab('rooms')}>Back</Button>
              <Button onClick={() => setActiveTab('payment')}>Continue</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>Secure payment to complete your booking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Booking Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Room Type</span>
                        <span>{roomTypes.find(room => room.id === selectedRoomType)?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Check-in</span>
                        <span>{checkInDate ? format(checkInDate, 'MMM dd, yyyy') : 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Check-out</span>
                        <span>{checkOutDate ? format(checkOutDate, 'MMM dd, yyyy') : 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Guests</span>
                        <span>{adults} Adults, {children} Children</span>
                      </div>
                      {selectedServices.length > 0 && (
                        <div>
                          <span className="text-muted-foreground">Additional Services</span>
                          <ul className="mt-1 space-y-1">
                            {selectedServices.map(serviceId => {
                              const service = services.find(s => s.id === serviceId);
                              return service ? (
                                <li key={serviceId} className="flex justify-between">
                                  <span>{service.name}</span>
                                  <span>${service.price}</span>
                                </li>
                              ) : null;
                            })}
                          </ul>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${calculateTotal()}</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Payment Method</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="creditCard" 
                            name="paymentMethod"
                            value="creditCard"
                            checked={paymentMethod === 'creditCard'}
                            onChange={() => setPaymentMethod('creditCard')}
                          />
                          <Label htmlFor="creditCard">Credit Card</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="paypal" 
                            name="paymentMethod"
                            value="paypal"
                            checked={paymentMethod === 'paypal'}
                            onChange={() => setPaymentMethod('paypal')}
                          />
                          <Label htmlFor="paypal">PayPal</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="bankTransfer" 
                            name="paymentMethod"
                            value="bankTransfer"
                            checked={paymentMethod === 'bankTransfer'}
                            onChange={() => setPaymentMethod('bankTransfer')}
                          />
                          <Label htmlFor="bankTransfer">Bank Transfer</Label>
                        </div>
                      </div>
                    </div>
                    
                    {paymentMethod === 'creditCard' && (
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input id="cardName" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="**** **** **** ****" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input id="expiryDate" placeholder="MM/YY" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="***" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
              <Button variant="outline" onClick={() => setActiveTab('details')}>Back</Button>
              <Button onClick={handleSubmit}>Complete Booking</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Booking;
