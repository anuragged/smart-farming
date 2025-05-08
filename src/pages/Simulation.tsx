
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardHeader from '@/components/DashboardHeader';

const Simulation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader 
        title="Smart Wheelchair Simulation & Monitoring" 
        subtitle="Live simulation and ThingSpeak data visualization"
        className="mb-6"
      />
      
      <div className="grid grid-cols-1 gap-6">
        {/* Wokwi Simulator */}
        <Card className="h-[600px] shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Smart Wheelchair Simulation</CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-4rem)] p-0">
            <iframe 
              src="https://wokwi.com/projects/430413226017435649" 
              title="Smart Wheelchair Simulation"
              className="w-full h-full border-0"
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; microphone; midi; payment; usb; vr; xr-spatial-tracking"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            />
          </CardContent>
        </Card>
        
        {/* ThingSpeak Charts */}
        <Card className="h-[600px] shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">ThingSpeak Data Visualization</CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-4rem)] p-0">
            <iframe 
              src="https://thingspeak.mathworks.com/channels/2954859"
              title="ThingSpeak Data Visualization"
              className="w-full h-full border-0"
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; microphone; midi; payment; usb; vr; xr-spatial-tracking" 
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Simulation;
