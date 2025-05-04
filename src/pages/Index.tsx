
import React, { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import SensorSummary from '@/components/SensorSummary';
import SoilStatusCard from '@/components/SoilStatusCard';
import DeviceList from '@/components/DeviceList';
import HistoricalChart from '@/components/HistoricalChart';
import IdealValueConfig from '@/components/IdealValueConfig';

// Mock data for demonstration
const mockDevices = [
  {
    id: 'device-1',
    name: 'Garden Sensor 1',
    location: 'Vegetable Garden',
    status: 'optimal' as const,
    lastUpdated: '2 mins ago',
  },
  {
    id: 'device-2',
    name: 'Garden Sensor 2',
    location: 'Flower Bed',
    status: 'warning' as const,
    lastUpdated: '5 mins ago',
  },
  {
    id: 'device-3',
    name: 'Garden Sensor 3',
    location: 'Herb Garden',
    status: 'critical' as const,
    lastUpdated: '10 mins ago',
  },
  {
    id: 'device-4',
    name: 'Garden Sensor 4',
    location: 'Fruit Trees',
    status: 'offline' as const,
    lastUpdated: '1 hour ago',
  },
];

const mockSensorData = {
  'device-1': {
    title: 'Vegetable Garden Monitor',
    deviceName: 'Garden Sensor 1',
    location: 'Vegetable Garden',
    temperature: 22.5,
    humidity: 45,
    lastUpdated: '2 mins ago',
    status: 'optimal' as const,
  },
  'device-2': {
    title: 'Flower Bed Monitor',
    deviceName: 'Garden Sensor 2',
    location: 'Flower Bed',
    temperature: 26.8,
    humidity: 65,
    lastUpdated: '5 mins ago',
    status: 'warning' as const,
  },
  'device-3': {
    title: 'Herb Garden Monitor',
    deviceName: 'Garden Sensor 3',
    location: 'Herb Garden',
    temperature: 32.1,
    humidity: 15,
    lastUpdated: '10 mins ago',
    status: 'critical' as const,
  },
  'device-4': {
    title: 'Fruit Trees Monitor',
    deviceName: 'Garden Sensor 4',
    location: 'Fruit Trees',
    temperature: 0,
    humidity: 0,
    lastUpdated: '1 hour ago',
    status: 'offline' as const,
  },
};

const mockHistoricalData = [
  { time: '00:00', temperature: 18.2, humidity: 42 },
  { time: '03:00', temperature: 17.8, humidity: 45 },
  { time: '06:00', temperature: 18.5, humidity: 48 },
  { time: '09:00', temperature: 20.2, humidity: 46 },
  { time: '12:00', temperature: 23.8, humidity: 40 },
  { time: '15:00', temperature: 24.5, humidity: 38 },
  { time: '18:00', temperature: 22.1, humidity: 42 },
  { time: '21:00', temperature: 19.8, humidity: 45 },
];

const mockSummaryStats = {
  totalSensors: 4,
  onlineSensors: 3,
  optimalSensors: 1,
  warningSensors: 1,
  criticalSensors: 1,
  averageTemperature: 20.3,
  averageHumidity: 41.5,
};

const Index = () => {
  const [selectedDeviceId, setSelectedDeviceId] = useState(mockDevices[0].id);
  
  const handleSaveIdealValues = (values: {
    temperatureMin: number;
    temperatureMax: number;
    humidityMin: number;
    humidityMax: number;
  }) => {
    console.log('Saving ideal values:', values);
    // In a real app, this would update the backend
  };

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 md:px-8">
      <DashboardHeader 
        title="Soil Monitoring System" 
        subtitle="Real-time soil temperature and humidity monitoring"
        className="mb-6"
      />
      
      <SensorSummary stats={mockSummaryStats} className="mb-6" />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <DeviceList 
            devices={mockDevices}
            onSelectDevice={setSelectedDeviceId}
            selectedDeviceId={selectedDeviceId}
          />
          
          <IdealValueConfig 
            plantType="Tomatoes"
            defaultTemperatureMin={18}
            defaultTemperatureMax={24}
            defaultHumidityMin={30}
            defaultHumidityMax={60}
            onSave={handleSaveIdealValues}
          />
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-3 space-y-6">
          {selectedDeviceId && mockSensorData[selectedDeviceId] && (
            <SoilStatusCard {...mockSensorData[selectedDeviceId]} />
          )}
          
          <HistoricalChart 
            data={mockHistoricalData}
            title="24-Hour Soil Conditions"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
