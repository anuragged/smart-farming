
import React, { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardHeader from '@/components/DashboardHeader';
import { WheelchairWebSocket, useWheelchairStore } from '@/services/wheelchairService';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const Wheelchair = () => {
  const { isConnected, latestReading, historicalData } = useWheelchairStore();
  const { toast } = useToast();

  useEffect(() => {
    const wheelchairWs = WheelchairWebSocket.getInstance();
    
    // Connect on component mount
    wheelchairWs.connect();
    
    // Show toast with the exact values
    toast({
      title: "Smart Wheelchair Telemetry",
      description: `Temperature: ${latestReading.temperature.toFixed(1)}°C | Humidity: ${latestReading.humidity.toFixed(1)}% | Distance: ${latestReading.distance.toFixed(2)}cm`,
      duration: 5000,
    });
    
    // Disconnect on component unmount
    return () => {
      wheelchairWs.disconnect();
    };
  }, []);

  const formattedData = historicalData.map(item => ({
    time: new Date(item.timestamp).toLocaleTimeString(),
    temperature: item.temperature,
    humidity: item.humidity,
    distance: item.distance,
    lightLevel: item.lightLevel,
    heartRate: item.heartRate,
    joystickX: item.joystickX,
    joystickY: item.joystickY,
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader 
        title="Smart Wheelchair Simulation" 
        subtitle="Monitoring wheelchair telemetry data in real-time"
        className="mb-6"
      />
      
      <div className="flex items-center space-x-4 mb-4">
        <Badge variant={isConnected ? "success" : "destructive"} className="py-1">
          {isConnected ? "Connected to Wheelchair" : "Disconnected"}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Wokwi Simulator */}
        <Card className="lg:col-span-7 h-[600px]">
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
        
        {/* Live Data */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Current Readings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">Temperature</span>
                  <span className="text-2xl font-semibold">
                    {latestReading.temperature.toFixed(1)}°C
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">Humidity</span>
                  <span className="text-2xl font-semibold">
                    {latestReading.humidity.toFixed(1)}%
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">Distance</span>
                  <span className="text-2xl font-semibold">
                    {latestReading.distance.toFixed(2)} cm
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">Light Level</span>
                  <span className="text-2xl font-semibold">
                    {latestReading.lightLevel}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">Heart Rate</span>
                  <span className="text-2xl font-semibold">
                    {latestReading.heartRate} BPM
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">Servo Angle</span>
                  <span className="text-2xl font-semibold">
                    {latestReading.servoAngle}°
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Joystick Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">X Position</span>
                  <span className="text-2xl font-semibold">
                    {latestReading.joystickX}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">Y Position</span>
                  <span className="text-2xl font-semibold">
                    {latestReading.joystickY}
                  </span>
                </div>
                <div className="flex flex-col col-span-2">
                  <span className="text-muted-foreground text-sm">Button Status</span>
                  <span className="text-2xl font-semibold">
                    {latestReading.joystickPressed ? "Pressed" : "Released"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">ESP32 Serial Output</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="bg-muted p-4 rounded-md font-mono text-sm">
                <pre className="whitespace-pre-wrap break-all">
                  === SMART WHEELCHAIR TELEMETRY ===
                  Joystick: X={latestReading.joystickX} | Y={latestReading.joystickY} | Button: {latestReading.joystickPressed ? "Pressed" : "Released"}
                  Servo Angle: {latestReading.servoAngle}°
                  Distance: {latestReading.distance.toFixed(2)} cm
                  Temp: {latestReading.temperature.toFixed(1)}°C | Humidity: {latestReading.humidity.toFixed(1)}%
                  Light Level: {latestReading.lightLevel}
                  Heart Rate: {latestReading.heartRate} BPM
                  ==================================

                  ✅ Data sent to ThingSpeak!
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Temperature & Humidity</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={formattedData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: "#ccc" }}
                />
                <YAxis 
                  yAxisId="left"
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: "#ccc" }}
                  domain={[20, 30]}
                  label={{ value: '°C', angle: -90, position: 'insideLeft', dx: -15 }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  domain={[30, 60]}
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: "#ccc" }}
                  label={{ value: '%', angle: -90, position: 'insideRight', dx: 15 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #ddd',
                    borderRadius: '0.5rem',
                  }} 
                />
                <Legend verticalAlign="top" height={36} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="temperature"
                  stroke="#FF5733"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  dot={{ r: 3 }}
                  name="Temperature (°C)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="humidity"
                  stroke="#33A1FF"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  dot={{ r: 3 }}
                  name="Humidity (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Distance & Light Level</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={formattedData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: "#ccc" }}
                />
                <YAxis 
                  yAxisId="left"
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: "#ccc" }}
                  domain={[0, 100]}
                  label={{ value: 'cm', angle: -90, position: 'insideLeft', dx: -15 }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  domain={[3000, 4000]}
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: "#ccc" }}
                  label={{ value: 'lux', angle: -90, position: 'insideRight', dx: 15 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #ddd',
                    borderRadius: '0.5rem',
                  }} 
                />
                <Legend verticalAlign="top" height={36} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="distance"
                  stroke="#9b87f5"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  dot={{ r: 3 }}
                  name="Distance (cm)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="lightLevel"
                  stroke="#FFCC33"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  dot={{ r: 3 }}
                  name="Light Level"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Heart Rate & Joystick Position</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={formattedData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: "#ccc" }}
                />
                <YAxis 
                  yAxisId="left"
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: "#ccc" }}
                  domain={[60, 90]}
                  label={{ value: 'BPM', angle: -90, position: 'insideLeft', dx: -15 }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  domain={[1800, 2200]}
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: "#ccc" }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #ddd',
                    borderRadius: '0.5rem',
                  }} 
                />
                <Legend verticalAlign="top" height={36} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="heartRate"
                  stroke="#D946EF"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  dot={{ r: 3 }}
                  name="Heart Rate (BPM)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="joystickX"
                  stroke="#0EA5E9"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  dot={{ r: 3 }}
                  name="Joystick X"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="joystickY"
                  stroke="#F97316"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  dot={{ r: 3 }}
                  name="Joystick Y"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Wheelchair;
