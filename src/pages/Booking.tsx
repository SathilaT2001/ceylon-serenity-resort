
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import RoomTypeSelector from '@/components/booking/RoomTypeSelector';
import ServiceSelector from '@/components/booking/ServiceSelector';

const Booking = () => {
  const { toast } = useToast();
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedRoomType, setSelectedRoomType] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [bookingStep, setBookingStep] = useState(1);

  const roomTypes = [
    {
      id: 'deluxe',
      name: 'Deluxe Ocean View',
      description: 'Spacious room with breathtaking ocean views',
      price: 250,
      features: ['King Bed', 'Ocean View', 'Free WiFi', 'Breakfast Included'],
      image: '/placeholder.svg'
    },
    {
      id: 'garden',
      name: 'Garden Suite',
      description: 'Peaceful suite surrounded by lush tropical gardens',
      price: 320,
      features: ['King Bed', 'Garden View', 'Private Terrace', 'Free WiFi', 'Breakfast Included'],
      image: '/placeholder.svg'
    },
    {
      id: 'presidential',
      name: 'Presidential Villa',
      description: 'Ultimate luxury with private pool and exclusive butler service',
      price: 550,
      features: ['King Bed', 'Ocean View', 'Private Pool', 'Butler Service', 'Free WiFi', 'Breakfast Included'],
      image: '/placeholder.svg'
    }
  ];

  const services = [
    {
      id: 'airport-transfer',
      name: 'Airport Transfer',
      description: 'Luxury vehicle to/from airport',
      price: 75,
      icon: '🚗'
    },
    {
      id: 'spa-package',
      name: 'Spa Package',
      description: '60-minute massage and facial treatment',
      price: 120,
      icon: '💆'
    },
    {
      id: 'dinner-reservation',
      name: 'Special Dinner',
      description: 'Private beachfront dining experience',
      price: 150,
      icon: '🍽️'
    },
    {
      id: 'excursion',
      name: 'Guided Excursion',
      description: 'Tour of local attractions with expert guide',
      price: 90,
      icon: '🗺️'
    }
  ];

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotal = () => {
    if (!checkInDate || !checkOutDate || !selectedRoomType) return 0;
    
    const nights = Math.max(1, Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)));
    const room = roomTypes.find(r => r.id === selectedRoomType);
    const roomCost = room ? room.price * nights : 0;
    
    const servicesCost = selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return total + (service ? service.price : 0);
    }, 0);
    
    return roomCost + servicesCost;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1);
      return;
    }

    // Final submission
    toast({
      title: "Booking Submitted",
      description: "Your reservation has been confirmed. A confirmation email will be sent shortly.",
    });

    // In a real application, this would submit to an API
    console.log({
      checkInDate,
      checkOutDate,
      adults,
      children,
      selectedRoomType,
      selectedServices,
      specialRequests,
      paymentMethod,
      totalAmount: calculateTotal()
    });
  };

  const handleBack = () => {
    if (bookingStep > 1) {
      setBookingStep(bookingStep - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="font-serif text-3xl lg:text-4xl text-primary mb-4">Book Your Stay</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Complete the form below to reserve your room at Ceylon Serenity Resort
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Dates and Guests */}
                {bookingStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-medium">Step 1: Select Dates & Guests</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Check-in Date */}
                      <div className="space-y-2">
                        <Label htmlFor="check-in">Check-in Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="check-in"
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !checkInDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {checkInDate ? format(checkInDate, "PPP") : <span>Select date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={checkInDate}
                              onSelect={setCheckInDate}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Check-out Date */}
                      <div className="space-y-2">
                        <Label htmlFor="check-out">Check-out Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="check-out"
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !checkOutDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {checkOutDate ? format(checkOutDate, "PPP") : <span>Select date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={checkOutDate}
                              onSelect={setCheckOutDate}
                              disabled={(date) => date < (checkInDate || new Date())}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    {/* Guests */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="adults">Adults</Label>
                        <Input
                          id="adults"
                          type="number"
                          min={1}
                          max={10}
                          value={adults}
                          onChange={(e) => setAdults(parseInt(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="children">Children</Label>
                        <Input
                          id="children"
                          type="number"
                          min={0}
                          max={10}
                          value={children}
                          onChange={(e) => setChildren(parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Room Types and Services */}
                {bookingStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-medium">Step 2: Select Room & Services</h2>
                    
                    {/* Room Types */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Select Room Type</h3>
                      <div className="space-y-4">
                        <RoomTypeSelector 
                          roomTypes={roomTypes}
                          selectedRoomType={selectedRoomType}
                          onSelectRoom={setSelectedRoomType}
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Additional Services */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Additional Services</h3>
                      <ServiceSelector 
                        services={services}
                        selectedServices={selectedServices}
                        onToggleService={handleServiceToggle}
                      />
                    </div>

                    {/* Special Requests */}
                    <div className="space-y-2">
                      <Label htmlFor="special-requests">Special Requests</Label>
                      <Textarea
                        id="special-requests"
                        placeholder="Let us know if you have any special requests or requirements"
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Guest Information & Payment */}
                {bookingStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-medium">Step 3: Guest Information & Payment</h2>
                    
                    {/* Guest Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Guest Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="full-name">Full Name</Label>
                          <Input id="full-name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" type="tel" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input id="country" defaultValue="Sri Lanka" required />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Payment Method */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Payment Method</h3>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="credit-card" id="credit-card" />
                          <Label htmlFor="credit-card">Credit Card</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal">PayPal</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                          <Label htmlFor="bank-transfer">Bank Transfer</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Credit Card Details */}
                    {paymentMethod === 'credit-card' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input id="card-number" placeholder="0000 0000 0000 0000" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="card-holder">Card Holder</Label>
                            <Input id="card-holder" placeholder="Name on card" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="expiry-date">Expiry Date</Label>
                            <Input id="expiry-date" placeholder="MM/YY" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" required />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Terms and Conditions */}
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" required />
                      <label htmlFor="terms" className="text-sm text-muted-foreground">
                        I agree to the{" "}
                        <a href="#" className="text-primary hover:underline">terms and conditions</a>{" "}
                        and{" "}
                        <a href="#" className="text-primary hover:underline">privacy policy</a>
                      </label>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  {bookingStep > 1 ? (
                    <Button type="button" variant="outline" onClick={handleBack}>
                      Back
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  <Button type="submit">
                    {bookingStep < 3 ? "Continue" : "Complete Booking"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Booking Summary */}
        <div>
          <div className="sticky top-24">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-4">Booking Summary</h3>
                
                {/* Date Summary */}
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Check-in</span>
                    <span className="font-medium">
                      {checkInDate ? format(checkInDate, "MMM d, yyyy") : "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Check-out</span>
                    <span className="font-medium">
                      {checkOutDate ? format(checkOutDate, "MMM d, yyyy") : "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Guests</span>
                    <span className="font-medium">{adults} adults, {children} children</span>
                  </div>

                  <Separator />
                  
                  {/* Room Summary */}
                  <div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Room Type</span>
                      <span className="font-medium">
                        {selectedRoomType 
                          ? roomTypes.find(r => r.id === selectedRoomType)?.name
                          : "Not selected"}
                      </span>
                    </div>
                    {selectedRoomType && checkInDate && checkOutDate && (
                      <div className="flex justify-between mt-2">
                        <span className="text-muted-foreground">
                          {Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))} nights
                        </span>
                        <span className="font-medium">
                          ${roomTypes.find(r => r.id === selectedRoomType)?.price} per night
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Services Summary */}
                  {selectedServices.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <span className="text-muted-foreground">Additional Services</span>
                        {selectedServices.map(serviceId => {
                          const service = services.find(s => s.id === serviceId);
                          return service && (
                            <div className="flex justify-between mt-2" key={serviceId}>
                              <span>{service.name}</span>
                              <span className="font-medium">${service.price}</span>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}

                  <Separator />
                  
                  {/* Total */}
                  <div className="flex justify-between text-lg">
                    <span className="font-medium">Total</span>
                    <span className="font-bold text-primary">${calculateTotal()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
