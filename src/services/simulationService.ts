
import { create } from 'zustand';

// Define types for our simulation data
export type SensorReading = {
  temperature: number;
  humidity: number;
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
    temperature: 22.5,
    humidity: 45,
    timestamp: new Date().toISOString(),
  },
  historicalData: Array.from({ length: 10 }).map((_, i) => ({
    temperature: 20 + Math.random() * 5,
    humidity: 40 + Math.random() * 10,
    timestamp: new Date(Date.now() - (9 - i) * 60000).toISOString(),
  })),
  toggleSimulation: () => set((state) => ({ isSimulated: !state.isSimulated })),
  connect: () => set({ isConnected: true }),
  disconnect: () => set({ isConnected: false }),
  addReading: (reading) =>
    set((state) => ({
      latestReading: reading,
      historicalData: [...state.historicalData.slice(-29), reading],
    })),
}));

// Mock WebSocket for simulation
export class SimulationWebSocket {
  private static instance: SimulationWebSocket;
  private socket: WebSocket | null = null;
  private simulationInterval: number | null = null;

  private constructor() {}

  public static getInstance(): SimulationWebSocket {
    if (!SimulationWebSocket.instance) {
      SimulationWebSocket.instance = new SimulationWebSocket();
    }
    return SimulationWebSocket.instance;
  }

  public connect() {
    if (this.socket) return;

    // In a real implementation, we would connect to a WebSocket server
    // For this simulation, we'll use a timer to generate mock data
    const simulationStore = useSimulationStore.getState();
    simulationStore.connect();

    this.simulationInterval = window.setInterval(() => {
      // Generate random variations in temperature and humidity
      const reading: SensorReading = {
        temperature: 20 + Math.sin(Date.now() / 10000) * 5 + Math.random() * 2,
        humidity: 40 + Math.sin(Date.now() / 15000) * 15 + Math.random() * 5,
        timestamp: new Date().toISOString(),
      };

      // Add reading to store
      useSimulationStore.getState().addReading(reading);

      // Log for debugging
      console.log('New simulation reading:', reading);
    }, 3000); // Update every 3 seconds
  }

  public disconnect() {
    if (this.simulationInterval) {
      window.clearInterval(this.simulationInterval);
      this.simulationInterval = null;
    }
    useSimulationStore.getState().disconnect();
  }

  public isConnected() {
    return useSimulationStore.getState().isConnected;
  }
}
