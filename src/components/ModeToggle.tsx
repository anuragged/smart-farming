
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSimulationStore } from '@/services/simulationService';
import { Badge } from '@/components/ui/badge';

export function ModeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { isSimulated } = useSimulationStore();

  // Check for system preference on component mount
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="flex items-center gap-2">
      {isSimulated && (
        <Badge variant="outline" className="bg-accent/20 text-accent-foreground">
          Simulation
        </Badge>
      )}
      
      <Button variant="outline" size="icon" onClick={toggleTheme}>
        {theme === 'light' ? (
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        ) : (
          <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
