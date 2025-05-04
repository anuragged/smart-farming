
import React, { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import DashboardHeader from '@/components/DashboardHeader';
import { SimulationWebSocket, useSimulationStore } from '@/services/simulationService';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Cloud, Thermometer, Droplets } from 'lucide-react';

const Simulation = () => {
  const { isConnected, isSimulated, toggleSimulation, latestReading, historicalData } = useSimulationStore();
  const { toast } = useToast();

  useEffect(() => {
    const simulationWs = SimulationWebSocket.getInstance();
    
    // Connect on component mount
    simulationWs.connect();
    
    // Disconnect on component unmount
    return () => {
      simulationWs.disconnect();
    };
  }, []);

  const formattedData = historicalData.map(item => ({
    time: new Date(item.timestamp).toLocaleTimeString(),
    temperature: item.temperature,
    humidity: item.humidity,
    soil_moisture: item.soil_moisture,
    light: item.light
  }));

  const handleToggleSimulation = () => {
    toggleSimulation();
    toast({
      title: isSimulated ? "Using real data" : "Using simulated data",
      description: isSimulated 
        ? "Switched to real sensor readings" 
        : "Switched to simulated data from Wokwi",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 md:px-8">
      <DashboardHeader 
        title="ThingSpeak Data Monitor" 
        subtitle="Real-time data from ESP32 via ThingSpeak API"
        className="mb-6"
      />
      
      <div className="flex items-center space-x-4 mb-4">
        <Badge variant={isConnected ? "success" : "destructive"} className="py-1">
          {isConnected ? "Connected to ThingSpeak" : "Disconnected"}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Wokwi Simulator */}
        <Card className="lg:col-span-7 h-[600px] soil-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">ESP32 Soil Monitor Simulation</CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-4rem)] p-0">
            <iframe 
              src="https://wokwi.com/projects/429142972859937793" 
              title="ESP32 Soil Monitoring Simulation"
              className="w-full h-full border-0"
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; microphone; midi; payment; usb; vr; xr-spatial-tracking"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            />
          </CardContent>
        </Card>
        
        {/* Live Data */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card className="soil-card">
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
                  <span className="text-muted-foreground text-sm">Soil Moisture</span>
                  <span className="text-2xl font-semibold">
                    {latestReading.soil_moisture.toFixed(1)}%
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">Light Level</span>
                  <span className="text-2xl font-semibold">
                    {latestReading.light.toFixed(1)} lux
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="soil-card flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Real-time Data</CardTitle>
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
                    domain={[10, 35]}
                    label={{ value: '°C', angle: -90, position: 'insideLeft', dx: -15 }}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    domain={[0, 100]}
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
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="soil_moisture"
                    stroke="#33FF57"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                    dot={{ r: 3 }}
                    name="Soil Moisture (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card className="mt-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Light Levels</CardTitle>
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
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: "#ccc" }}
                domain={[0, 'auto']}
                label={{ value: 'lux', angle: -90, position: 'insideLeft', dx: -15 }}
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
                type="monotone"
                dataKey="light"
                stroke="#FFCC33"
                strokeWidth={2}
                activeDot={{ r: 6 }}
                dot={{ r: 3 }}
                name="Light (lux)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Simulation;
