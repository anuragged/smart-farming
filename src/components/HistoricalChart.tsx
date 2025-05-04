
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DataPoint {
  time: string;
  temperature: number;
  humidity: number;
}

interface HistoricalChartProps {
  data: DataPoint[];
  title: string;
  className?: string;
}

const HistoricalChart: React.FC<HistoricalChartProps> = ({ data, title, className }) => {
  return (
    <Card className={cn("soil-card h-full", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
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
              stroke="#8B6D5D"
              strokeWidth={2}
              activeDot={{ r: 6 }}
              dot={{ r: 3 }}
              name="Temperature (°C)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="humidity"
              stroke="#5CB85C"
              strokeWidth={2}
              activeDot={{ r: 6 }}
              dot={{ r: 3 }}
              name="Humidity (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default HistoricalChart;
