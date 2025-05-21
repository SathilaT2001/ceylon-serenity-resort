
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

interface ServiceSelectorProps {
  services: Service[];
  selectedServices: string[];
  onToggleService: (serviceId: string) => void;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  services,
  selectedServices,
  onToggleService
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {services.map(service => (
        <div 
          key={service.id}
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            selectedServices.includes(service.id) 
              ? "border-primary bg-primary/5" 
              : "border-gray-200 hover:border-primary/50"
          }`}
          onClick={() => onToggleService(service.id)}
        >
          <div className="flex items-start space-x-3">
            <div className="text-2xl">{service.icon}</div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <h4 className="font-medium">{service.name}</h4>
                <span className="font-semibold">${service.price}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id={service.id} 
                  checked={selectedServices.includes(service.id)}
                  onCheckedChange={() => onToggleService(service.id)}
                />
                <Label htmlFor={service.id}>Add this service</Label>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceSelector;
