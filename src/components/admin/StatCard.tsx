
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'none';
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend = 'none',
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="flex items-center text-xs text-muted-foreground">
            {trend === 'up' && <TrendingUp className={cn("mr-1 h-3 w-3 text-green-500")} />}
            {trend === 'down' && <TrendingDown className={cn("mr-1 h-3 w-3 text-red-500")} />}
            {trend === 'none' && <Minus className={cn("mr-1 h-3 w-3 text-gray-500")} />}
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
