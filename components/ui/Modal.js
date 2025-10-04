'use client';

import { forwardRef, useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Reusable Modal component
 * Provides consistent modal functionality across the app
 */

const Modal = forwardRef(({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = '',
  ...props
}, ref) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Size classes
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  // Handle overlay click
  const handleOverlayClick = (event) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div
        ref={ref}
        className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {title && (
              <h2 className="text-lg font-semibold text-gray-900">
                {title}
              </h2>
            )}
            
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
});

Modal.displayName = 'Modal';

// Modal sub-components
const ModalHeader = forwardRef(({ children, className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={`border-b border-gray-200 pb-4 mb-4 ${className}`}
    {...props}
  >
    {children}
  </div>
));

ModalHeader.displayName = 'ModalHeader';

const ModalTitle = forwardRef(({ children, className = '', ...props }, ref) => (
  <h2
    ref={ref}
    className={`text-lg font-semibold text-gray-900 ${className}`}
    {...props}
  >
    {children}
  </h2>
));

ModalTitle.displayName = 'ModalTitle';

const ModalContent = forwardRef(({ children, className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={`text-gray-700 ${className}`}
    {...props}
  >
    {children}
  </div>
));

ModalContent.displayName = 'ModalContent';

const ModalFooter = forwardRef(({ children, className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={`border-t border-gray-200 pt-4 mt-4 flex justify-end space-x-3 ${className}`}
    {...props}
  >
    {children}
  </div>
));

ModalFooter.displayName = 'ModalFooter';

// Attach sub-components to Modal
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export default Modal;
