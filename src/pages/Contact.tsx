
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll respond shortly.",
    });
    
    // Reset form
    (e.target as HTMLFormElement).reset();
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground">
          We're here to answer your questions and help you plan your perfect stay at Ceylon Serenity Resort.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>
              Fill out the form below and our team will get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help you?" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Please provide details about your inquiry..." 
                  rows={5}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Location</h3>
                <p className="text-muted-foreground">
                  Ceylon Serenity Resort<br />
                  Beach Road, Bentota<br />
                  Southern Province, Sri Lanka
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Phone</h3>
                <p className="text-muted-foreground">
                  Reservations: +94 11 234 5678<br />
                  Front Desk: +94 11 234 5679<br />
                  Customer Service: +94 11 234 5680
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Email</h3>
                <p className="text-muted-foreground">
                  Reservations: reservations@ceylonserenity.com<br />
                  General Inquiries: info@ceylonserenity.com<br />
                  Customer Support: support@ceylonserenity.com
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Hours</h3>
                <p className="text-muted-foreground">
                  Reception: 24 hours, 7 days a week<br />
                  Restaurant: 6:30 AM - 11:00 PM<br />
                  Spa: 9:00 AM - 8:00 PM
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Map Location</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-[16/9] bg-muted flex items-center justify-center">
                <p className="text-muted-foreground text-center p-4">
                  Interactive map would be embedded here<br />
                  <span className="text-xs">(In a production environment)</span>
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center py-4">
              <Button variant="outline">Get Directions</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
