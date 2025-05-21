
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gray-900 text-white">
      {/* Placeholder for hero image - would be a real image in production */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 z-10" />
      <div 
        className="absolute inset-0 bg-[url('https://images.luxuryescapes.com/q_auto:best,dpr_2.0/3xaa6v0yhq2kaf49cc4m')] bg-cover bg-center"
        style={{ backgroundPositionY: '30%' }}
      />

      <div className="container mx-auto px-4 py-32 md:py-48 relative z-20">
        <div className="max-w-2xl">
          <span className="text-primary font-medium tracking-wide text-sm md:text-base uppercase">Ceylon Serenity Resort</span>
          <h1 className="font-serif text-4xl md:text-6xl mt-4 mb-6">
            Experience Luxury in Paradise
          </h1>
          <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-xl">
            Escape to our exclusive beachfront resort offering world-class amenities and 
            breathtaking views of the Indian Ocean.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/booking">
                <Calendar className="mr-2 h-5 w-5" />
                Book Now
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white bg-transparant text-white hover:bg-white/10">
              <Link to="/rooms">
                Explore Rooms
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Booking form would go here in a production site */}
    </div>
  );
};

export default HeroSection;
