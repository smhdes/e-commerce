'use client';

import { forwardRef } from 'react';

/**
 * Reusable Input component
 * Supports various input types and states
 */

const Input = forwardRef(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  size = 'md',
  variant = 'default',
  className = '',
  ...props
}, ref) => {
  // Base classes
  const baseClasses = 'w-full border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0';

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  // Variant classes
  const variantClasses = {
    default: 'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
    error: 'border-red-300 focus:border-red-500 focus:ring-red-500',
    success: 'border-green-300 focus:border-green-500 focus:ring-green-500',
  };

  // Error state
  const isError = !!error;
  const inputVariant = isError ? 'error' : variant;

  // Combine classes
  const inputClasses = [
    baseClasses,
    sizeClasses[size],
    variantClasses[inputVariant],
    leftIcon ? 'pl-10' : '',
    rightIcon ? 'pr-10' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-gray-400">
              {leftIcon}
            </div>
          </div>
        )}
        
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <div className="text-gray-400">
              {rightIcon}
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
