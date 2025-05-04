
import React from 'react';
import { Gauge, Leaf, Droplet, Thermometer, CircleCheck, CircleX } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SummaryStats {
  totalSensors: number;
  onlineSensors: number;
  optimalSensors: number;
  warningSensors: number;
  criticalSensors: number;
  averageTemperature: number;
  averageHumidity: number;
}

interface SensorSummaryProps {
  stats: SummaryStats;
  className?: string;
}

const SensorSummary: React.FC<SensorSummaryProps> = ({ stats, className }) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up", className)}>
      <Card className="soil-card">
        <CardContent className="p-6 flex items-center">
          <div className="p-2 bg-primary/10 rounded-full mr-4">
            <Gauge className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Online Sensors</p>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">{stats.onlineSensors}</span>
              <span className="text-sm text-muted-foreground ml-1">/ {stats.totalSensors}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="soil-card">
        <CardContent className="p-6 flex items-center">
          <div className="p-2 bg-status-optimalLight rounded-full mr-4">
            <CircleCheck className="h-5 w-5 text-status-optimal" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Optimal Soil</p>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">{stats.optimalSensors}</span>
              <span className="text-sm text-muted-foreground ml-1">sensors in ideal range</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="soil-card">
        <CardContent className="p-6 flex items-center">
          <div className="p-2 bg-accent/10 rounded-full mr-4">
            <Thermometer className="h-5 w-5 text-soil-brown" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Average Temperature</p>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">{stats.averageTemperature.toFixed(1)}°C</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="soil-card">
        <CardContent className="p-6 flex items-center">
          <div className="p-2 bg-accent/10 rounded-full mr-4">
            <Droplet className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Average Humidity</p>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">{stats.averageHumidity.toFixed(1)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SensorSummary;
