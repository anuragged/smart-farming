
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

const THINGSPEAK_CHANNEL_ID = '2714180'; // Replace with your actual channel ID
const THINGSPEAK_API_KEY = '2P8Y3G0YIZSDJ80X'; // Your ThingSpeak API key

// Create a store for our simulation data
export const useSimulationStore = create<SimulationState>((set) => ({
  isConnected: false,
  isSimulated: true,
  latestReading: {
    temperature: 22.5,
    humidity: 45,
    soil_moisture: 60,
    light: 300,
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
    
    // Fetch initial data
    this.fetchThingSpeakData();
    
    // Set up polling for real-time updates
    this.pollingInterval = window.setInterval(() => {
      this.fetchThingSpeakData();
    }, 15000); // Poll every 15 seconds (ThingSpeak has a rate limit)
  }
  
  private async fetchThingSpeakData() {
    try {
      // Fetch the latest data point
      const response = await fetch(
        `https://api.thingspeak.com/channels/${THINGSPEAK_CHANNEL_ID}/feeds/last.json?api_key=${THINGSPEAK_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch ThingSpeak data');
      }
      
      const data = await response.json();
      
      // Parse the data and create a sensor reading
      const reading: SensorReading = {
        soil_moisture: parseFloat(data.field1) || 0,
        temperature: parseFloat(data.field2) || 0,
        humidity: parseFloat(data.field3) || 0,
        light: parseFloat(data.field4) || 0,
        timestamp: new Date(data.created_at).toISOString(),
      };
      
      // Add the reading to the store
      useSimulationStore.getState().addReading(reading);
      console.log('New ThingSpeak reading:', reading);
      
      // Fetch historical data for the charts
      this.fetchHistoricalData();
    } catch (error) {
      console.error('Error fetching ThingSpeak data:', error);
    }
  }
  
  private async fetchHistoricalData() {
    try {
      // Fetch the last 30 data points
      const response = await fetch(
        `https://api.thingspeak.com/channels/${THINGSPEAK_CHANNEL_ID}/feeds.json?api_key=${THINGSPEAK_API_KEY}&results=30`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch ThingSpeak historical data');
      }
      
      const data = await response.json();
      
      // Parse the historical data
      const historicalData: SensorReading[] = data.feeds.map((feed: any) => ({
        soil_moisture: parseFloat(feed.field1) || 0,
        temperature: parseFloat(feed.field2) || 0,
        humidity: parseFloat(feed.field3) || 0,
        light: parseFloat(feed.field4) || 0,
        timestamp: new Date(feed.created_at).toISOString(),
      }));
      
      // Set the historical data in the store
      if (historicalData.length > 0) {
        const store = useSimulationStore.getState();
        store.historicalData = historicalData;
      }
    } catch (error) {
      console.error('Error fetching ThingSpeak historical data:', error);
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
