'use client';

import Link from 'next/link';

/**
 * Logo Component
 * Hepsitrend logo with modern styling
 */

const Logo = ({ className = "", href = "/" }) => {
  return (
    <Link href={href} className={`flex items-center space-x-3 group ${className}`}>
      <div className="relative">
        {/* Logo Text */}
        <span className="text-2xl font-bold group-hover:text-blue-600 transition-colors duration-300">
          Hepsitrend
        </span>
        
        {/* Red Dot */}
        <div className="absolute -right-1 top-0 w-3 h-3 bg-red-500 rounded-full"></div>
      </div>
    </Link>
  );
};

export default Logo;
