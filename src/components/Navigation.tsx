
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Leaf, MonitorDot } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from '@/components/ui/navigation-menu';

const Navigation = () => {
  const location = useLocation();
  
  return (
    <NavigationMenu className="mb-4">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/" className={cn(
            "flex items-center px-4 py-2 text-sm font-medium rounded-md",
            location.pathname === '/' ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
          )}>
            <Leaf className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/simulation" className={cn(
            "flex items-center px-4 py-2 text-sm font-medium rounded-md",
            location.pathname === '/simulation' ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
          )}>
            <MonitorDot className="mr-2 h-4 w-4" />
            Simulation
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
