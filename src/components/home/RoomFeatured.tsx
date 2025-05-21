
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface RoomFeaturedProps {
  title: string;
  description: string;
  price: number;
  image: string;
}

const RoomFeatured: React.FC<RoomFeaturedProps> = ({ 
  title, 
  description, 
  price, 
  image 
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-56">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
          From ${price}/night
        </div>
      </div>
      <CardContent className="pt-6">
        <h3 className="text-xl font-serif font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">King Bed</span>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">Ocean View</span>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">Free WiFi</span>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">Breakfast</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button asChild variant="outline" size="sm">
          <Link to={`/rooms/${title.toLowerCase().replace(/\s+/g, '-')}`}>View Details</Link>
        </Button>
        <Button asChild size="sm">
          <Link to={`/booking?room=${title.toLowerCase().replace(/\s+/g, '-')}`}>Book Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomFeatured;
