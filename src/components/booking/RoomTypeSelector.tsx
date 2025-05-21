
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface RoomType {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  image: string;
}

interface RoomTypeSelectorProps {
  roomTypes: RoomType[];
  selectedRoomType: string | null;
  onSelectRoom: (roomId: string) => void;
}

const RoomTypeSelector: React.FC<RoomTypeSelectorProps> = ({
  roomTypes,
  selectedRoomType,
  onSelectRoom
}) => {
  return (
    <RadioGroup value={selectedRoomType || ''} onValueChange={onSelectRoom}>
      {roomTypes.map(room => (
        <div 
          key={room.id}
          className={cn(
            "flex flex-col md:flex-row border rounded-lg p-4 cursor-pointer transition-colors",
            selectedRoomType === room.id 
              ? "border-primary bg-primary/5" 
              : "border-gray-200 hover:border-primary/50"
          )}
          onClick={() => onSelectRoom(room.id)}
        >
          <div className="md:w-1/4 mb-4 md:mb-0">
            <img 
              src={room.image} 
              alt={room.name} 
              className="w-full h-32 object-cover rounded-md"
            />
          </div>
          <div className="md:w-3/4 md:pl-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-medium">{room.name}</h4>
                <div className="font-semibold">${room.price}/night</div>
              </div>
              <p className="text-muted-foreground mb-2">{room.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {room.features.map((feature, index) => (
                  <span 
                    key={index} 
                    className="text-xs bg-secondary/20 text-secondary-foreground px-2 py-1 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={room.id} id={room.id} />
                <Label htmlFor={room.id}>Select this room</Label>
              </div>
            </div>
          </div>
        </div>
      ))}
    </RadioGroup>
  );
};

export default RoomTypeSelector;
