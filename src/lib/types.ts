export interface FormData {
  electricity: number;
  gas: number;
  car: number;
  publicTransport: number;
  flights: number;
  meat: number;
  fruitsVeggies: number;
  waste: number;
  entertainment: number;
  housingType: 'apartment' | 'small-house' | 'large-house';
  vehicleType: 'gasoline' | 'diesel' | 'hybrid' | 'electric';
}

export interface EmissionResults {
  total: number;
  emissions: Record<string, number>;
  reductions: {
    renewable: number;
    recycling: number;
  };
  factors: {
    housingType: number;
    vehicleType: number;
  };
}

export interface AIConfig {
  apiKey: string;
  enabled: boolean;
}

export interface InputField {
  id: string;
  icon: string;
  title: string;
  titleEn: string;
  label: string;
  labelEn: string;
  placeholder?: string;
  select?: {
    options: { value: string; label: string }[];
  };
}