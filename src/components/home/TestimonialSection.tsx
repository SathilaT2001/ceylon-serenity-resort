
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    text: "Ceylon Serenity Resort exceeded all expectations. The staff went above and beyond to make our honeymoon truly special. We'll definitely be back!",
    author: "Sarah & James",
    location: "London, UK",
    rating: 5,
  },
  {
    text: "The most beautiful resort I've stayed at in Sri Lanka. The room was immaculate, the views were breathtaking, and the food was extraordinary.",
    author: "Robert Chen",
    location: "Singapore",
    rating: 5,
  },
  {
    text: "From the moment we arrived until our departure, the level of service was impeccable. The spa treatments are not to be missed!",
    author: "Priya Patel",
    location: "Mumbai, India",
    rating: 5,
  },
];

const TestimonialSection: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl text-primary mb-4">Guest Experiences</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our guests have to say about their stay with us.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="italic text-gray-700 mb-6">"{testimonial.text}"</p>
              <div className="flex items-center">
                <div>
                  <h4 className="font-medium">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
