
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Leaf, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface IdealValueConfigProps {
  plantType: string;
  defaultTemperatureMin: number;
  defaultTemperatureMax: number;
  defaultHumidityMin: number;
  defaultHumidityMax: number;
  onSave: (values: {
    temperatureMin: number;
    temperatureMax: number;
    humidityMin: number;
    humidityMax: number;
  }) => void;
  className?: string;
}

const IdealValueConfig: React.FC<IdealValueConfigProps> = ({
  plantType,
  defaultTemperatureMin,
  defaultTemperatureMax,
  defaultHumidityMin,
  defaultHumidityMax,
  onSave,
  className
}) => {
  const [temperatureRange, setTemperatureRange] = useState<[number, number]>([
    defaultTemperatureMin,
    defaultTemperatureMax
  ]);
  
  const [humidityRange, setHumidityRange] = useState<[number, number]>([
    defaultHumidityMin,
    defaultHumidityMax
  ]);

  const { toast } = useToast();

  const handleSave = () => {
    onSave({
      temperatureMin: temperatureRange[0],
      temperatureMax: temperatureRange[1],
      humidityMin: humidityRange[0],
      humidityMax: humidityRange[1]
    });
    
    toast({
      title: "Settings saved",
      description: `Ideal values for ${plantType} updated successfully.`,
      duration: 3000,
    });
  };

  return (
    <Card className={cn("soil-card", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <Leaf className="mr-2 h-5 w-5 text-accent" />
          <CardTitle className="text-lg font-medium">Ideal Values for {plantType}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Temperature Range (°C)</span>
            <span className="text-sm font-medium">{temperatureRange[0]}°C - {temperatureRange[1]}°C</span>
          </div>
          <Slider
            defaultValue={temperatureRange}
            min={10}
            max={35}
            step={1}
            value={temperatureRange}
            onValueChange={(value) => setTemperatureRange(value as [number, number])}
            className="py-4"
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Humidity Range (%)</span>
            <span className="text-sm font-medium">{humidityRange[0]}% - {humidityRange[1]}%</span>
          </div>
          <Slider
            defaultValue={humidityRange}
            min={0}
            max={100}
            step={5}
            value={humidityRange}
            onValueChange={(value) => setHumidityRange(value as [number, number])}
            className="py-4"
          />
        </div>
        
        <Button 
          onClick={handleSave}
          className="w-full"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default IdealValueConfig;
