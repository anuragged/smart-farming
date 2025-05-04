
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Device {
  id: string;
  name: string;
  location: string;
  status: 'optimal' | 'warning' | 'critical' | 'offline';
  lastUpdated: string;
}

interface DeviceListProps {
  devices: Device[];
  onSelectDevice: (deviceId: string) => void;
  selectedDeviceId?: string;
}

const DeviceList: React.FC<DeviceListProps> = ({
  devices,
  onSelectDevice,
  selectedDeviceId
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const sortedDevices = [...devices].sort((a, b) => {
    // Sort by status priority: critical, warning, optimal, offline
    const statusPriority = {
      critical: 0,
      warning: 1,
      optimal: 2,
      offline: 3
    };
    
    return statusPriority[a.status] - statusPriority[b.status];
  });

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm animate-fade-in">
      <div 
        className="flex justify-between items-center p-3 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="font-medium">Devices ({devices.length})</h3>
        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>
      
      {isExpanded && (
        <div className="max-h-[300px] overflow-y-auto p-1">
          {sortedDevices.map((device) => (
            <div
              key={device.id}
              className={cn(
                "p-2 rounded-md cursor-pointer transition-colors mb-1",
                selectedDeviceId === device.id
                  ? "bg-secondary"
                  : "hover:bg-secondary/50"
              )}
              onClick={() => onSelectDevice(device.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{device.name}</div>
                  <div className="text-xs text-muted-foreground">{device.location}</div>
                </div>
                <div className={`sensor-dot sensor-dot-${device.status}`} />
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Updated: {device.lastUpdated}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeviceList;
