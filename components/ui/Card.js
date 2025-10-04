'use client';

import { forwardRef } from 'react';

/**
 * Reusable Card component
 * Provides consistent card styling across the app
 */

const Card = forwardRef(({
  children,
  className = '',
  padding = 'md',
  shadow = 'md',
  rounded = 'lg',
  hover = false,
  ...props
}, ref) => {
  // Base classes
  const baseClasses = 'bg-white border border-gray-200 transition-all duration-200';

  // Padding classes
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };

  // Shadow classes
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  // Rounded classes
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };

  // Hover classes
  const hoverClasses = hover ? 'hover:shadow-lg hover:scale-105 cursor-pointer' : '';

  // Combine all classes
  const cardClasses = [
    baseClasses,
    paddingClasses[padding],
    shadowClasses[shadow],
    roundedClasses[rounded],
    hoverClasses,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={cardClasses}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

// Card sub-components
const CardHeader = forwardRef(({ children, className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={`border-b border-gray-200 pb-4 mb-4 ${className}`}
    {...props}
  >
    {children}
  </div>
));

CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef(({ children, className = '', ...props }, ref) => (
  <h3
    ref={ref}
    className={`text-lg font-semibold text-gray-900 ${className}`}
    {...props}
  >
    {children}
  </h3>
));

CardTitle.displayName = 'CardTitle';

const CardContent = forwardRef(({ children, className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={`text-gray-700 ${className}`}
    {...props}
  >
    {children}
  </div>
));

CardContent.displayName = 'CardContent';

const CardFooter = forwardRef(({ children, className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={`border-t border-gray-200 pt-4 mt-4 ${className}`}
    {...props}
  >
    {children}
  </div>
));

CardFooter.displayName = 'CardFooter';

// Attach sub-components to Card
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
