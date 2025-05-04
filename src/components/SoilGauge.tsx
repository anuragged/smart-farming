
import React from 'react';
import { cn } from '@/lib/utils';

interface SoilGaugeProps {
  value: number;
  min: number;
  max: number;
  optimalMin: number;
  optimalMax: number;
  warningMin: number;
  warningMax: number;
  unit: string;
  className?: string;
}

const SoilGauge: React.FC<SoilGaugeProps> = ({
  value,
  min,
  max,
  optimalMin,
  optimalMax,
  warningMin,
  warningMax,
  unit,
  className
}) => {
  // Calculate percentage for gauge fill
  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);
  
  // Determine status based on value
  const getStatusClass = () => {
    if (value >= optimalMin && value <= optimalMax) {
      return 'soil-gauge-optimal';
    } else if (value >= warningMin && value <= warningMax) {
      return 'soil-gauge-warning';
    } else {
      return 'soil-gauge-critical';
    }
  };
  
  const getValueClass = () => {
    if (value >= optimalMin && value <= optimalMax) {
      return 'soil-value-optimal';
    } else if (value >= warningMin && value <= warningMax) {
      return 'soil-value-warning';
    } else {
      return 'soil-value-critical';
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{min}{unit}</span>
        <span className={`text-lg ${getValueClass()}`}>{value}{unit}</span>
        <span className="text-sm text-muted-foreground">{max}{unit}</span>
      </div>
      <div className="soil-gauge">
        <div 
          className={cn("soil-gauge-fill", getStatusClass())}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Min</span>
        <div className="space-x-1">
          <span className="inline-block w-1 h-4 bg-status-optimal"></span>
          <span>{optimalMin}{unit} - {optimalMax}{unit}</span>
        </div>
        <span>Max</span>
      </div>
    </div>
  );
};

export default SoilGauge;
