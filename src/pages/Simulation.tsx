
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardHeader from '@/components/DashboardHeader';

// ThingSpeak chart data with descriptions
const thingSpeakCharts = [
  {
    id: 1,
    title: "Temperature",
    url: "https://thingspeak.mathworks.com/channels/2954859/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"
  },
  {
    id: 2,
    title: "Humidity",
    url: "https://thingspeak.mathworks.com/channels/2954859/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"
  },
  {
    id: 3,
    title: "Distance",
    url: "https://thingspeak.mathworks.com/channels/2954859/charts/3?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"
  },
  {
    id: 4,
    title: "Light Level",
    url: "https://thingspeak.mathworks.com/channels/2954859/charts/4?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"
  },
  {
    id: 5,
    title: "Heart Rate (BPM)",
    url: "https://thingspeak.mathworks.com/channels/2954859/charts/5?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"
  },
  {
    id: 6,
    title: "Joystick X Position",
    url: "https://thingspeak.mathworks.com/channels/2954859/charts/6?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"
  },
  {
    id: 7,
    title: "Joystick Y Position",
    url: "https://thingspeak.mathworks.com/channels/2954859/charts/7?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"
  }
];

const Simulation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader 
        title="Smart Wheelchair Simulation & Monitoring" 
        subtitle="Live simulation and ThingSpeak data visualization"
        className="mb-6"
      />
      
      <div className="grid gap-6 mb-6">
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
      </div>
      
      {/* ThingSpeak Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {thingSpeakCharts.map((chart) => (
          <Card key={chart.id} className="h-[300px] shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">{chart.title}</CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-4rem)] p-0">
              <iframe 
                src={chart.url}
                title={`ThingSpeak Chart - ${chart.title}`}
                className="w-full h-full border-0"
                allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; microphone; midi; payment; usb; vr; xr-spatial-tracking" 
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Simulation;
