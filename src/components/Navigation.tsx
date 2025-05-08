
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Leaf, MonitorDot, Wheelchair } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="mb-4">
      <div className="flex space-x-4">
        <Link 
          to="/" 
          className={cn(
            "flex items-center px-4 py-2 text-sm font-medium rounded-md",
            location.pathname === '/' ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50"
          )}
        >
          <Leaf className="mr-2 h-4 w-4" />
          Dashboard
        </Link>
        <Link
          to="/simulation"
          className={cn(
            "flex items-center px-4 py-2 text-sm font-medium rounded-md",
            location.pathname === '/simulation' ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50"
          )}
        >
          <MonitorDot className="mr-2 h-4 w-4" />
          ThingSpeak Monitor
        </Link>
        <Link
          to="/wheelchair"
          className={cn(
            "flex items-center px-4 py-2 text-sm font-medium rounded-md",
            location.pathname === '/wheelchair' ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50"
          )}
        >
          <Wheelchair className="mr-2 h-4 w-4" />
          Smart Wheelchair
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
