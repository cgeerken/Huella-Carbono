export const EMISSION_FACTORS = {
  electricity: 0.4,
  gas: 2.0,
  car: 0.19,
  publicTransport: 0.08,
  flights: 0.09,
  meat: 27,
  fruitsVeggies: 0.8,
  waste: 0.03,
  entertainment: 0.02,
} as const;

export const HOUSING_FACTORS = {
  'apartment': 0.8,    // -20% emisiones
  'small-house': 1,    // Base
  'large-house': 1.3,  // +30% emisiones
} as const;

export const VEHICLE_FACTORS = {
  'gasoline': 1,     // Base
  'diesel': 1.1,     // +10% emisiones
  'hybrid': 0.6,     // -40% emisiones
  'electric': 0.3,   // -70% emisiones
} as const;

export const INPUT_GROUPS = [
  {
    title: 'Vivienda y Energía',
    titleEn: 'Housing and Energy',
    fields: [
      {
        id: 'housingType',
        icon: 'Building2',
        title: 'Tipo de Vivienda',
        titleEn: 'Housing Type',
        label: 'Selecciona',
        labelEn: 'Select',
        select: {
          options: [
            { value: 'apartment', label: 'Departamento' },
            { value: 'small-house', label: 'Casa Pequeña' },
            { value: 'large-house', label: 'Casa Grande' },
          ],
        },
      },
      {
        id: 'electricity',
        icon: 'Zap',
        title: 'Electricidad',
        titleEn: 'Electricity',
        label: 'kWh/mes',
        labelEn: 'kWh/month',
        placeholder: '350',
      },
      {
        id: 'gas',
        icon: 'Flame',
        title: 'Gas',
        titleEn: 'Gas',
        label: 'm³/mes',
        labelEn: 'm³/month',
        placeholder: '100',
      },
    ],
  },
  {
    title: 'Transporte',
    titleEn: 'Transportation',
    fields: [
      {
        id: 'vehicleType',
        icon: 'Car',
        title: 'Tipo de Vehículo',
        titleEn: 'Vehicle Type',
        label: 'Selecciona',
        labelEn: 'Select',
        select: {
          options: [
            { value: 'gasoline', label: 'Gasolina' },
            { value: 'diesel', label: 'Diesel' },
            { value: 'hybrid', label: 'Híbrido' },
            { value: 'electric', label: 'Eléctrico' },
          ],
        },
      },
      {
        id: 'car',
        icon: 'Route',
        title: 'Automóvil',
        titleEn: 'Car',
        label: 'km/mes',
        labelEn: 'km/month',
        placeholder: '800',
      },
      {
        id: 'publicTransport',
        icon: 'Bus',
        title: 'Transporte Público',
        titleEn: 'Public Transport',
        label: 'km/mes',
        labelEn: 'km/month',
        placeholder: '150',
      },
      {
        id: 'flights',
        icon: 'Plane',
        title: 'Vuelos',
        titleEn: 'Flights',
        label: 'km/mes',
        labelEn: 'km/month',
        placeholder: '1000',
      },
    ],
  },
  {
    title: 'Consumo y Residuos',
    titleEn: 'Consumption and Waste',
    fields: [
      {
        id: 'meat',
        icon: 'Beef',
        title: 'Carne',
        titleEn: 'Meat',
        label: 'kg/mes',
        labelEn: 'kg/month',
        placeholder: '5',
      },
      {
        id: 'fruitsVeggies',
        icon: 'Apple',
        title: 'Frutas y Verduras',
        titleEn: 'Fruits & Vegetables',
        label: 'kg/mes',
        labelEn: 'kg/month',
        placeholder: '10',
      },
      {
        id: 'waste',
        icon: 'Trash2',
        title: 'Residuos',
        titleEn: 'Waste',
        label: 'kg/mes',
        labelEn: 'kg/month',
        placeholder: '30',
      },
      {
        id: 'entertainment',
        icon: 'Gamepad2',
        title: 'Entretenimiento',
        titleEn: 'Entertainment',
        label: 'horas/mes',
        labelEn: 'hours/month',
        placeholder: '50',
      },
    ],
  },
] as const;