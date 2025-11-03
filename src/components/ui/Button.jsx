import React from 'react';
import { cn } from '../../lib/utils';

const buttonVariants = {
  solid: 'bg-primary text-primary-foreground hover:bg-primary/90',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
};

const buttonSizes = {
  sm: 'h-8 px-3 text-xs rounded-md',
  md: 'h-10 px-4 py-2 rounded-md',
  lg: 'h-12 px-6 py-2 rounded-lg',
};

const Button = React.forwardRef(
  ({ className, variant = 'solid', size = 'md', disabled = false, ...props }, ref) => (
    <button
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        buttonVariants[variant],
        buttonSizes[size],
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      disabled={disabled}
      ref={ref}
      {...props}
    />
  )
);

Button.displayName = 'Button';

export { Button, buttonVariants, buttonSizes };
