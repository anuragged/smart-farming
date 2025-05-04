
import React from 'react';
import { Droplet, Thermometer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SoilGauge from './SoilGauge';
import { cn } from '@/lib/utils';

interface SoilStatusCardProps {
  title: string;
  deviceName: string;
  location: string;
  temperature: number;
  humidity: number;
  lastUpdated: string;
  status: 'optimal' | 'warning' | 'critical' | 'offline';
  className?: string;
}

const statusLabels = {
  optimal: 'Optimal',
  warning: 'Warning',
  critical: 'Critical',
  offline: 'Offline'
};

const SoilStatusCard: React.FC<SoilStatusCardProps> = ({
  title,
  deviceName,
  location,
  temperature,
  humidity,
  lastUpdated,
  status,
  className
}) => {
  return (
    <Card className={cn('soil-card overflow-hidden animate-fade-in', className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-0.5">{deviceName} • {location}</p>
          </div>
          <div className={`status-badge status-badge-${status}`}>
            <span className={`sensor-dot sensor-dot-${status} align-middle`}></span>
            {statusLabels[status]}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center text-sm font-medium">
              <Thermometer className="mr-2 h-4 w-4 text-soil-brown" />
              Temperature
            </div>
            <SoilGauge
              value={temperature}
              min={10}
              max={35}
              optimalMin={18}
              optimalMax={24}
              warningMin={15}
              warningMax={28}
              unit="°C"
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center text-sm font-medium">
              <Droplet className="mr-2 h-4 w-4 text-accent" />
              Humidity
            </div>
            <SoilGauge
              value={humidity}
              min={0}
              max={100}
              optimalMin={30}
              optimalMax={60}
              warningMin={20}
              warningMax={75}
              unit="%"
            />
          </div>
          
          <div className="text-xs text-muted-foreground text-right mt-2">
            Last updated: {lastUpdated}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SoilStatusCard;
