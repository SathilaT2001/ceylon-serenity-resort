
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ServiceHighlights: React.FC = () => {
  const services = [
    {
      title: 'Fine Dining',
      description: 'Experience exquisite culinary delights with our award-winning chefs using locally-sourced ingredients.',
      image: 'https://www.aperitif.com/wp-content/uploads/2024/01/top-view-dining-tables-without-food-scaled.jpg',
      link: '/services/dining'
    },
    {
      title: 'Luxury Spa',
      description: 'Rejuvenate your mind and body with our traditional and modern spa treatments.',
      image: 'https://www.scenichotelgroup.co.nz/content/uploads/2022/03/Amaia-Luxury-Spa-7-Regular-2000x1333.jpg',
      link: '/services/spa'
    },
    {
      title: 'Water Sports',
      description: 'Dive into adventure with our range of exciting water activities and excursions.',
      image: 'https://greenwatersports.com/content/wp-content/uploads/2022/09/GreenWaterSportsLLC-171988-Involved-Water-Sports-Blogbanner1.jpg',
      link: '/services/activities'
    }
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl text-primary mb-4">Exceptional Services</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Indulge in our world-class amenities designed to make your stay with us truly memorable.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="group relative overflow-hidden rounded-lg">
            {/* Image overlay with gradient */}
            <div className="aspect-square relative overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
            
            {/* Service content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-medium mb-2">{service.title}</h3>
              <p className="text-gray-200 mb-4 opacity-90">{service.description}</p>
              <Button asChild variant="outline" className="text-white bg-transparent border-white hover:bg-white/20 hover:text-white">
                <Link to={service.link}>Learn More</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Button asChild size="lg">
          <Link to="/services">View All Services</Link>
        </Button>
      </div>
    </section>
  );
};

export default ServiceHighlights;
