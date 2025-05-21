
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const roomTypes = [
  {
    id: 'deluxe',
    name: 'Deluxe Room',
    description: 'Spacious and comfortable accommodations with modern amenities.',
    features: ['King Bed', 'Ocean View', 'Free Wi-Fi', 'Mini Bar'],
    price: 150,
    capacity: '2 Adults',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070',
  },
  {
    id: 'suite',
    name: 'Executive Suite',
    description: 'Luxurious suite with separate living area and premium amenities.',
    features: ['King Bed', 'Balcony', 'Jacuzzi', 'Lounge Area'],
    price: 250,
    capacity: '2 Adults, 2 Children',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070',
  },
  {
    id: 'family',
    name: 'Family Room',
    description: 'Perfect for families with spacious layout and convenient amenities.',
    features: ['2 Queen Beds', 'Kids Area', 'Family Entertainment', 'Kitchenette'],
    price: 200,
    capacity: '2 Adults, 2 Children',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074',
  },
];

const Rooms = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Rooms & Suites</h1>
        <p className="text-muted-foreground">
          Experience luxury and comfort in our thoughtfully designed accommodations. 
          Each room is crafted to provide the perfect balance of relaxation and modern convenience.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roomTypes.map((room) => (
          <Card key={room.id} className="overflow-hidden flex flex-col h-full">
            <div className="relative h-60 overflow-hidden">
              <img 
                src={room.image} 
                alt={room.name} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
              />
              
            </div>
            <CardHeader>
              <CardTitle>{room.name}</CardTitle>
              <CardDescription>{room.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm">
                  <span className="font-medium mr-2">Capacity:</span>
                  <span className="text-muted-foreground">{room.capacity}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {room.features.map((feature, index) => (
                    <Badge key={index} variant="outline">{feature}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t pt-4">
              <div>
                <p className="text-lg font-bold">${room.price}</p>
                <p className="text-xs text-muted-foreground">per night</p>
              </div>
              <Button onClick={() => navigate('/booking', { state: { roomType: room.id } })}>
                Book Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* <div className="mt-16 bg-muted/30 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-serif font-bold mb-4">Special Packages</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Enhance your stay with our curated packages designed to make your experience truly memorable.
          From romantic getaways to family adventures, we have the perfect package for you.
        </p>
        <Button variant="outline" onClick={() => navigate('/booking')}>
          View Special Offers
        </Button>
      </div> */}
    </div>
  );
};

export default Rooms;
