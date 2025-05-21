
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Spa, Utensils, Calendar, Wifi, CreditCard } from 'lucide-react';

const Services = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Services</h1>
        <p className="text-muted-foreground">
          Discover a range of premium services designed to enhance your stay at Ceylon Serenity Resort.
          From wellness treatments to exclusive experiences, we cater to your every need.
        </p>
      </div>
      
      <Tabs defaultValue="wellness" className="space-y-8">
        <div className="flex justify-center">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="wellness">Wellness</TabsTrigger>
            <TabsTrigger value="dining">Dining</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="wellness" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <span className="p-2 bg-primary/10 rounded-full">
                    <Spa className="h-6 w-6 text-primary" />
                  </span>
                  <CardTitle>Serene Spa Experience</CardTitle>
                </div>
                <CardDescription>
                  Indulge in a range of therapeutic treatments designed to relax your mind and body.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Aromatherapy Massage</span>
                    <span className="font-medium">$85</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Hot Stone Therapy</span>
                    <span className="font-medium">$120</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Traditional Ayurvedic Treatment</span>
                    <span className="font-medium">$150</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Deluxe Facial</span>
                    <span className="font-medium">$95</span>
                  </div>
                </div>
                <Button className="w-full">Book Treatment</Button>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Wellness Center</CardTitle>
                  <CardDescription>Our state-of-the-art wellness facilities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm">
                    Our wellness center features a fully-equipped gym, yoga studio, and meditation spaces. 
                    Take advantage of daily classes or private sessions with our expert instructors.
                  </p>
                  <Button variant="outline">View Schedule</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Beauty Salon</CardTitle>
                  <CardDescription>Complete your wellness journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm">
                    Our in-house beauty salon offers a complete range of services including hair styling, 
                    manicures, pedicures, and special event preparation.
                  </p>
                  <Button variant="outline">See Services</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="dining" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <span className="p-2 bg-primary/10 rounded-full">
                    <Utensils className="h-6 w-6 text-primary" />
                  </span>
                  <CardTitle>Culinary Experiences</CardTitle>
                </div>
                <CardDescription>
                  Explore our exquisite restaurants offering a variety of cuisines prepared by award-winning chefs.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">Ocean View Restaurant</h4>
                    <p className="text-sm text-muted-foreground">International cuisine with panoramic views</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Spice Garden</h4>
                    <p className="text-sm text-muted-foreground">Authentic Sri Lankan delicacies</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Sunset Lounge</h4>
                    <p className="text-sm text-muted-foreground">Cocktails and light bites</p>
                  </div>
                </div>
                <Button className="w-full">Make Reservation</Button>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Private Dining</CardTitle>
                  <CardDescription>Exclusive culinary experiences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm">
                    Enjoy a personalized dining experience in a romantic setting with customized menus 
                    prepared by our executive chef.
                  </p>
                  <Button variant="outline">Book Private Dining</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Cooking Classes</CardTitle>
                  <CardDescription>Learn from our master chefs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm">
                    Discover the secrets of Sri Lankan cuisine and international dishes with 
                    hands-on cooking classes offered weekly.
                  </p>
                  <Button variant="outline">View Schedule</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="activities" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <span className="p-2 bg-primary/10 rounded-full">
                    <Calendar className="h-6 w-6 text-primary" />
                  </span>
                  <CardTitle>Daily Activities</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Morning Yoga</span>
                    <span className="text-sm text-muted-foreground">6:00 AM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Beach Volleyball</span>
                    <span className="text-sm text-muted-foreground">10:00 AM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Cooking Demo</span>
                    <span className="text-sm text-muted-foreground">2:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Evening Meditation</span>
                    <span className="text-sm text-muted-foreground">6:00 PM</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Full Schedule</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Water Sports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li>Jet Skiing</li>
                  <li>Snorkeling</li>
                  <li>Paddle Boarding</li>
                  <li>Kayaking</li>
                  <li>Banana Boat Rides</li>
                </ul>
                <Button variant="outline" className="w-full">Book Activity</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Excursions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li>Wildlife Safari</li>
                  <li>Cultural Heritage Tour</li>
                  <li>Tea Plantation Visit</li>
                  <li>Whale Watching</li>
                  <li>Local Village Experience</li>
                </ul>
                <Button variant="outline" className="w-full">Book Excursion</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="amenities" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <span className="p-2 bg-primary/10 rounded-full">
                    <Wifi className="h-6 w-6 text-primary" />
                  </span>
                  <CardTitle>Complimentary Amenities</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-2 gap-2">
                  <li className="flex items-center">
                    <Wifi className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>High-Speed Wi-Fi</span>
                  </li>
                  <li className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Fitness Center</span>
                  </li>
                  <li className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Swimming Pools</span>
                  </li>
                  <li className="flex items-center">
                    <Utensils className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Breakfast Buffet</span>
                  </li>
                  <li className="flex items-center">
                    <Spa className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Beach Loungers</span>
                  </li>
                  <li className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Daily Housekeeping</span>
                  </li>
                  <li className="flex items-center">
                    <Wifi className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Business Center</span>
                  </li>
                  <li className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Welcome Drink</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <span className="p-2 bg-primary/10 rounded-full">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </span>
                  <CardTitle>Premium Add-Ons</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Airport Transfer</span>
                    <span className="font-medium">$45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Premium Wi-Fi</span>
                    <span className="font-medium">$10/day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Babysitting Service</span>
                    <span className="font-medium">$25/hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Private Butler</span>
                    <span className="font-medium">$150/day</span>
                  </div>
                </div>
                <Button className="w-full">Add to Reservation</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Services;
