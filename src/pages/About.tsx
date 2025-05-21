
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">About Ceylon Serenity Resort</h1>
        <p className="text-muted-foreground">
          Discover the story behind our luxury retreat and our commitment to providing 
          exceptional experiences in the heart of Sri Lanka's pristine coastline.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold mb-4">Our Story</h2>
          <p className="mb-4">
            Ceylon Serenity Resort was founded in 2010 with a vision to create a sanctuary
            where travelers could experience the authentic beauty and culture of Sri Lanka while 
            enjoying world-class comfort and service.
          </p>
          <p className="mb-4">
            What began as a small beachfront property has grown into one of the most renowned 
            luxury resorts in the region, carefully preserving the natural surroundings while 
            offering modern amenities and exceptional hospitality.
          </p>
          <p>
            Today, we pride ourselves on creating memorable experiences for our guests, 
            showcasing the best of Sri Lankan heritage, cuisine, and natural wonders while 
            maintaining our commitment to sustainability and community support.
          </p>
        </div>
        <div className="relative rounded-lg overflow-hidden h-80">
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070" 
            alt="Resort exterior" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <Tabs defaultValue="values" className="space-y-8">
        <div className="flex justify-center">
          <TabsList className="grid grid-cols-1 md:grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="values">Our Values</TabsTrigger>
            <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="awards">Awards</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="values">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-3">Authentic Experiences</h3>
                <p className="text-muted-foreground">
                  We strive to provide genuine Sri Lankan hospitality and cultural experiences, 
                  connecting our guests with local traditions, cuisine, and natural wonders.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-3">Excellence in Service</h3>
                <p className="text-muted-foreground">
                  Every interaction with our staff reflects our commitment to exceptional service. 
                  We anticipate our guests' needs and exceed their expectations at every touchpoint.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-3">Environmental Stewardship</h3>
                <p className="text-muted-foreground">
                  We are dedicated to preserving the natural beauty of our surroundings through 
                  sustainable practices and eco-friendly initiatives throughout our operations.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="sustainability">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-xl font-bold">Our Sustainability Journey</h3>
              <p>
                At Ceylon Serenity Resort, we recognize our responsibility to protect and preserve the 
                environment for future generations. Our comprehensive sustainability program includes:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="font-medium mb-2">Energy & Water Conservation</h4>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Solar power generation for 40% of our energy needs</li>
                    <li>Advanced water recycling system for garden irrigation</li>
                    <li>Energy-efficient LED lighting throughout the property</li>
                    <li>Smart room controls to minimize energy usage</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Waste Reduction</h4>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Comprehensive recycling program</li>
                    <li>Elimination of single-use plastics</li>
                    <li>Food waste composting for our organic gardens</li>
                    <li>Eco-friendly amenities and packaging</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Responsible Sourcing</h4>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Locally sourced ingredients for our restaurants</li>
                    <li>Partnership with sustainable seafood providers</li>
                    <li>Eco-certified products and suppliers</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Conservation Efforts</h4>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Marine conservation program and coral reef protection</li>
                    <li>Native plant landscaping to support local biodiversity</li>
                    <li>Guest education and awareness programs</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="community">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-xl font-bold">Community Engagement</h3>
              <p>
                We believe that our success is intertwined with the wellbeing of the local community. 
                Our commitment to community development is reflected in various initiatives:
              </p>
              
              <div className="space-y-4 mt-4">
                <div>
                  <h4 className="font-medium mb-2">Local Employment</h4>
                  <p className="text-muted-foreground">
                    Over 80% of our staff are from surrounding villages. We provide comprehensive 
                    training and career development opportunities, helping to build capacity and skills in the local workforce.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Education Support</h4>
                  <p className="text-muted-foreground">
                    Our scholarship program supports promising students from nearby schools, 
                    and we regularly organize educational workshops for students interested in hospitality.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Cultural Preservation</h4>
                  <p className="text-muted-foreground">
                    We work with local artisans and performers to showcase traditional crafts and 
                    arts, helping to preserve cultural heritage while providing economic opportunities.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Community Development Projects</h4>
                  <p className="text-muted-foreground">
                    From infrastructure improvements to healthcare initiatives, we actively 
                    contribute to projects that enhance the quality of life in our community.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="awards">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <h3 className="text-xl font-bold">Industry Recognition</h3>
                <ul className="space-y-4">
                  <li className="border-b pb-3">
                    <div className="font-medium">Luxury Travel Awards 2023</div>
                    <div className="text-muted-foreground">Best Luxury Beach Resort in Asia</div>
                  </li>
                  <li className="border-b pb-3">
                    <div className="font-medium">World Travel Awards 2022</div>
                    <div className="text-muted-foreground">Sri Lanka's Leading Resort</div>
                  </li>
                  <li className="border-b pb-3">
                    <div className="font-medium">Condé Nast Traveler 2022</div>
                    <div className="text-muted-foreground">Readers' Choice Awards - Top 20 Resorts in Asia</div>
                  </li>
                  <li>
                    <div className="font-medium">TripAdvisor 2021</div>
                    <div className="text-muted-foreground">Travelers' Choice Award</div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 space-y-4">
                <h3 className="text-xl font-bold">Sustainability Awards</h3>
                <ul className="space-y-4">
                  <li className="border-b pb-3">
                    <div className="font-medium">Green Globe Certification</div>
                    <div className="text-muted-foreground">5-Star Sustainability Rating</div>
                  </li>
                  <li className="border-b pb-3">
                    <div className="font-medium">EarthCheck Gold 2023</div>
                    <div className="text-muted-foreground">Environmental Management Excellence</div>
                  </li>
                  <li className="border-b pb-3">
                    <div className="font-medium">Sustainable Tourism Awards 2022</div>
                    <div className="text-muted-foreground">Best Eco-Friendly Luxury Resort</div>
                  </li>
                  <li>
                    <div className="font-medium">Energy Efficiency Excellence 2021</div>
                    <div className="text-muted-foreground">Sri Lanka Sustainable Energy Authority</div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default About;
