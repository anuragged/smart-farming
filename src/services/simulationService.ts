
import { create } from 'zustand';

// Define types for our simulation data
export type SensorReading = {
  temperature: number;
  humidity: number;
  soil_moisture: number;
  light: number;
  timestamp: string;
};

export type SimulationState = {
  isConnected: boolean;
  isSimulated: boolean;
  latestReading: SensorReading;
  historicalData: SensorReading[];
  toggleSimulation: () => void;
  connect: () => void;
  disconnect: () => void;
  addReading: (reading: SensorReading) => void;
};

// Create a store for our simulation data
export const useSimulationStore = create<SimulationState>((set) => ({
  isConnected: false,
  isSimulated: true,
  latestReading: {
    temperature: 15.30,
    humidity: 79.0,
    soil_moisture: 0.00,
    light: 497.043,
    timestamp: new Date().toISOString(),
  },
  historicalData: [],
  toggleSimulation: () => set((state) => ({ isSimulated: !state.isSimulated })),
  connect: () => set({ isConnected: true }),
  disconnect: () => set({ isConnected: false }),
  addReading: (reading) =>
    set((state) => ({
      latestReading: reading,
      historicalData: [...state.historicalData.slice(-29), reading],
    })),
}));

// WebSocket for simulation
export class SimulationWebSocket {
  private static instance: SimulationWebSocket;
  private pollingInterval: number | null = null;

  private constructor() {}

  public static getInstance(): SimulationWebSocket {
    if (!SimulationWebSocket.instance) {
      SimulationWebSocket.instance = new SimulationWebSocket();
    }
    return SimulationWebSocket.instance;
  }

  public connect() {
    const simulationStore = useSimulationStore.getState();
    simulationStore.connect();
    
    // Generate initial data with the exact values from the image
    this.generateSimulatedData();
    
    // Set up polling for mock real-time updates
    this.pollingInterval = window.setInterval(() => {
      this.generateSimulatedData();
    }, 15000); // Poll every 15 seconds
  }
  
  private generateSimulatedData() {
    try {
      // Use the exact values from the ESP32 image
      const reading: SensorReading = {
        temperature: 15.30,
        humidity: 79.0,
        soil_moisture: 0.00,
        light: 497.043,
        timestamp: new Date().toISOString(),
      };
      
      // Add the reading to the store
      useSimulationStore.getState().addReading(reading);
      console.log('New simulated reading:', reading);
      
      // Generate historical data
      this.generateHistoricalData();
    } catch (error) {
      console.error('Error generating simulated data:', error);
    }
  }
  
  private generateHistoricalData() {
    try {
      // Generate 30 data points using the same values
      const historicalData: SensorReading[] = [];
      
      for (let i = 0; i < 30; i++) {
        // Add small variations to make the graph look realistic
        // but make sure the latest value is exactly what's in the image
        const variationFactor = i === 29 ? 0 : (Math.random() * 0.1) - 0.05;
        
        historicalData.push({
          temperature: i === 29 ? 15.30 : 15.30 + (15.30 * variationFactor),
          humidity: i === 29 ? 79.0 : 79.0 + (79.0 * variationFactor),
          soil_moisture: i === 29 ? 0.00 : 0.00 + Math.random() * 0.5,
          light: i === 29 ? 497.043 : 497.043 + (497.043 * variationFactor),
          timestamp: new Date(Date.now() - (30 - i) * 30000).toISOString(),
        });
      }
      
      // Set the historical data in the store
      if (historicalData.length > 0) {
        const store = useSimulationStore.getState();
        store.historicalData = historicalData;
      }
    } catch (error) {
      console.error('Error generating historical data:', error);
    }
  }

  public disconnect() {
    if (this.pollingInterval) {
      window.clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
    useSimulationStore.getState().disconnect();
  }

  public isConnected() {
    return useSimulationStore.getState().isConnected;
  }
}
