
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Calendar, Star, CreditCard } from 'lucide-react';
import RoomFeatured from '@/components/home/RoomFeatured';
import HeroSection from '@/components/home/HeroSection';
import ServiceHighlights from '@/components/home/ServiceHighlights';
import TestimonialSection from '@/components/home/TestimonialSection';

const Index = () => {
  return (
    <div className="space-y-16">
      <HeroSection />
      
      {/* Room Types Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl text-primary mb-4">Luxurious Accommodations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience unparalleled comfort in our thoughtfully designed rooms and suites, 
            each providing a sanctuary of relaxation with stunning views.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RoomFeatured 
            title="Deluxe Ocean View"
            description="Spacious room with breathtaking ocean views, king-sized bed, and modern amenities."
            price={250}
            image="/placeholder.svg"
          />
          <RoomFeatured 
            title="Garden Suite"
            description="Peaceful suite surrounded by lush tropical gardens with private terrace."
            price={320}
            image="/placeholder.svg"
          />
          <RoomFeatured 
            title="Presidential Villa"
            description="Ultimate luxury with private pool, ocean views, and exclusive butler service."
            price={550}
            image="/placeholder.svg"
          />
        </div>

        <div className="text-center mt-8">
          <Button asChild size="lg">
            <Link to="/rooms">View All Accommodations</Link>
          </Button>
        </div>
      </section>

      {/* Services Highlights */}
      <ServiceHighlights />

      {/* Booking Steps Section */}
      <section className="bg-accent/20 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl text-primary mb-4">Book Your Stay in 3 Simple Steps</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our streamlined booking process ensures you can quickly secure your perfect getaway
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Select Your Dates</h3>
                <p className="text-muted-foreground">
                  Choose your check-in and check-out dates to see available rooms
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Select Room & Services</h3>
                <p className="text-muted-foreground">
                  Choose your perfect room type and add any special services
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Confirm & Pay</h3>
                <p className="text-muted-foreground">
                  Securely complete your booking with our easy payment options
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-10">
            <Button asChild size="lg">
              <Link to="/booking">Book Your Stay Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />
    </div>
  );
};

export default Index;
