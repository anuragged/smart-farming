
import React from 'react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Leaf, MonitorDot } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  return (
    <NavigationMenu className="mb-4">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/" className={cn(
            navigationMenuTriggerStyle(),
            location.pathname === '/' && "bg-accent text-accent-foreground",
            "flex items-center"
          )}>
            <Leaf className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/simulation" className={cn(
            navigationMenuTriggerStyle(),
            location.pathname === '/simulation' && "bg-accent text-accent-foreground",
            "flex items-center"
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
