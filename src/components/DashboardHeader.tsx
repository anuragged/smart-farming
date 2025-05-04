
import React from 'react';
import { Leaf, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ModeToggle } from './ModeToggle';

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  title, 
  subtitle,
  className
}) => {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-up", className)}>
      <div className="flex items-center">
        <div className="bg-accent/10 p-3 rounded-lg mr-4">
          <Leaf className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <ModeToggle />
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
