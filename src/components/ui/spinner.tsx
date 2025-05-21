
import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('animate-spin text-primary', className)}
        {...props}
      >
        <Loader2 className="h-full w-full" />
        <span className="sr-only">Loading</span>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';
