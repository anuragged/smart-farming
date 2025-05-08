
import { create } from 'zustand';

// Define types for our wheelchair simulation data
export type WheelchairReading = {
  temperature: number;
  humidity: number;
  distance: number;
  lightLevel: number;
  heartRate: number;
  joystickX: number;
  joystickY: number;
  joystickPressed: boolean;
  servoAngle: number;
  timestamp: string;
};

export type WheelchairState = {
  isConnected: boolean;
  latestReading: WheelchairReading;
  historicalData: WheelchairReading[];
  connect: () => void;
  disconnect: () => void;
  addReading: (reading: WheelchairReading) => void;
};

// Create a store for our wheelchair data
export const useWheelchairStore = create<WheelchairState>((set) => ({
  isConnected: false,
  latestReading: {
    temperature: 23.9,
    humidity: 42.3,
    distance: 55.25,
    lightLevel: 3418,
    heartRate: 75,
    joystickX: 2048,
    joystickY: 2048,
    joystickPressed: false,
    servoAngle: 90,
    timestamp: new Date().toISOString(),
  },
  historicalData: [],
  connect: () => set({ isConnected: true }),
  disconnect: () => set({ isConnected: false }),
  addReading: (reading) =>
    set((state) => ({
      latestReading: reading,
      historicalData: [...state.historicalData.slice(-29), reading],
    })),
}));

// WebSocket for wheelchair simulation
export class WheelchairWebSocket {
  private static instance: WheelchairWebSocket;
  private pollingInterval: number | null = null;

  private constructor() {}

  public static getInstance(): WheelchairWebSocket {
    if (!WheelchairWebSocket.instance) {
      WheelchairWebSocket.instance = new WheelchairWebSocket();
    }
    return WheelchairWebSocket.instance;
  }

  public connect() {
    const wheelchairStore = useWheelchairStore.getState();
    wheelchairStore.connect();
    
    // Generate initial data with exact values from ESP32
    this.generateSimulatedData();
    
    // Set up polling for mock real-time updates
    this.pollingInterval = window.setInterval(() => {
      this.generateSimulatedData();
    }, 15000); // Poll every 15 seconds (matches ESP32 update frequency)
  }
  
  private generateSimulatedData() {
    try {
      // Use realistic wheelchair values from ESP32 code
      const reading: WheelchairReading = {
        temperature: 23.9,
        humidity: 42.3,
        distance: 55.25,
        lightLevel: 3418,
        heartRate: 75,
        joystickX: 2048,
        joystickY: 2048,
        joystickPressed: false,
        servoAngle: 90,
        timestamp: new Date().toISOString(),
      };
      
      // Add the reading to the store
      useWheelchairStore.getState().addReading(reading);
      console.log('New wheelchair reading:', reading);
      
      // Generate historical data
      this.generateHistoricalData();
    } catch (error) {
      console.error('Error generating wheelchair data:', error);
    }
  }
  
  private generateHistoricalData() {
    try {
      // Generate 30 data points with small variations
      const historicalData: WheelchairReading[] = [];
      
      for (let i = 0; i < 30; i++) {
        // Add small variations to make the graph look realistic
        const variationFactor = (Math.random() * 0.1) - 0.05;
        
        historicalData.push({
          temperature: 23.9 + (23.9 * variationFactor * 0.1),
          humidity: 42.3 + (42.3 * variationFactor * 0.1),
          distance: 55.25 + (55.25 * variationFactor * 0.2),
          lightLevel: 3418 + (3418 * variationFactor * 0.05),
          heartRate: 75 + Math.floor((75 * variationFactor * 0.1)),
          joystickX: 2048 + Math.floor((2048 * variationFactor * 0.1)),
          joystickY: 2048 + Math.floor((2048 * variationFactor * 0.1)),
          joystickPressed: false,
          servoAngle: 90 + Math.floor((90 * variationFactor * 0.05)),
          timestamp: new Date(Date.now() - (30 - i) * 30000).toISOString(),
        });
      }
      
      // Set the historical data in the store
      if (historicalData.length > 0) {
        const store = useWheelchairStore.getState();
        store.historicalData = historicalData;
      }
    } catch (error) {
      console.error('Error generating historical wheelchair data:', error);
    }
  }

  public disconnect() {
    if (this.pollingInterval) {
      window.clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
    useWheelchairStore.getState().disconnect();
  }

  public isConnected() {
    return useWheelchairStore.getState().isConnected;
  }
}
