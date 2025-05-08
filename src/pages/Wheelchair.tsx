
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Activity, ThermometerIcon, Droplet, Lightbulb, HeartPulse, Wifi, Upload, Terminal, AlertTriangle, Settings } from 'lucide-react';
import DashboardHeader from '@/components/DashboardHeader';

const Feature = ({ 
  title, 
  icon: Icon, 
  children 
}: { 
  title: string; 
  icon: React.ElementType; 
  children: React.ReactNode 
}) => {
  return (
    <Card className="h-full shadow-md hover:shadow-lg transition-all">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-sm text-muted-foreground">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

const Wheelchair = () => {
  return (
    <div className="min-h-screen">
      <DashboardHeader
        title="Smart Wheelchair Features"
        subtitle="Advanced ESP32-powered health monitoring and control system"
        className="mb-6"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Joystick Control */}
        <Feature title="Joystick Control" icon={Activity}>
          <ul className="list-disc pl-5 space-y-2">
            <li>Reads X and Y positions from analog inputs</li>
            <li>Detects joystick button press state</li>
            <li>Maps X-axis to servo motor angle (0° to 180°)</li>
          </ul>
        </Feature>
        
        {/* Servo Motor */}
        <Feature title="Servo Motor" icon={Settings}>
          <ul className="list-disc pl-5 space-y-2">
            <li>Controls chair direction precisely</li>
            <li>Directly mapped to joystick X-axis input</li>
            <li>180° range for full directional control</li>
          </ul>
        </Feature>
        
        {/* Obstacle Detection */}
        <Feature title="Obstacle Detection" icon={AlertTriangle}>
          <ul className="list-disc pl-5 space-y-2">
            <li>Uses HC-SR04 ultrasonic sensor for distance measurement</li>
            <li>Triggers alerts when obstacles are less than 30cm away</li>
            <li>Activates both buzzer and LED warning systems</li>
          </ul>
        </Feature>
        
        {/* Environmental Monitoring */}
        <Feature title="Environmental Monitoring" icon={ThermometerIcon}>
          <ul className="list-disc pl-5 space-y-2">
            <li>DHT22 sensor for accurate readings</li>
            <li>Temperature monitoring in °C</li>
            <li>Relative humidity monitoring in %</li>
          </ul>
        </Feature>
        
        {/* Light Detection */}
        <Feature title="Light Detection" icon={Lightbulb}>
          <ul className="list-disc pl-5 space-y-2">
            <li>LDR sensor measures ambient light intensity</li>
            <li>Provides visual environment awareness data</li>
            <li>Helps in adaptive lighting control systems</li>
          </ul>
        </Feature>
        
        {/* Heart Rate Estimation */}
        <Feature title="Heart Rate Estimation" icon={HeartPulse}>
          <ul className="list-disc pl-5 space-y-2">
            <li>Analog heart rate sensor integration</li>
            <li>Maps raw signals to BPM (beats per minute)</li>
            <li>Enables continuous health monitoring</li>
          </ul>
        </Feature>
        
        {/* Wi-Fi Connectivity */}
        <Feature title="Wi-Fi Connectivity" icon={Wifi}>
          <ul className="list-disc pl-5 space-y-2">
            <li>Built-in ESP32 Wi-Fi capabilities</li>
            <li>Connects to local wireless networks</li>
            <li>Enables remote monitoring and control</li>
          </ul>
        </Feature>
        
        {/* Data Upload to ThingSpeak */}
        <Feature title="Data Upload to ThingSpeak" icon={Upload}>
          <ul className="list-disc pl-5 space-y-2">
            <li>Sends all sensor data to ThingSpeak cloud platform</li>
            <li>Uploads temperature, humidity, distance readings</li>
            <li>Monitors light levels, heart rate, and joystick positions</li>
          </ul>
        </Feature>
        
        {/* Serial Monitoring */}
        <Feature title="Serial Monitoring" icon={Terminal}>
          <ul className="list-disc pl-5 space-y-2">
            <li>Comprehensive telemetry data output</li>
            <li>Real-time debugging capabilities</li>
            <li>Live observation of all system parameters</li>
          </ul>
        </Feature>
      </div>
      
      {/* Demo Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Live Demonstration</CardTitle>
          <CardDescription>
            See the Smart Wheelchair in action through our Wokwi simulation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <iframe 
            src="https://wokwi.com/projects/430413226017435649" 
            title="Smart Wheelchair Simulation"
            className="w-full h-[600px] border-0"
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Wheelchair;
