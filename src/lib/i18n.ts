import { create } from 'zustand';

type Language = 'es' | 'en';

interface I18nStore {
  language: Language;
  toggleLanguage: () => void;
}

export const useI18nStore = create<I18nStore>((set) => ({
  language: 'es',
  toggleLanguage: () => set((state) => ({ 
    language: state.language === 'es' ? 'en' : 'es' 
  })),
}));

export const translations = {
  es: {
    title: 'Calculadora de Huella Verde',
    subtitle: 'Conoce tu impacto y contribuye al cuidado del planeta',
    footprint: {
      title: 'Tu Huella Verde',
      unit: 'kg CO₂/mes',
    },
    tabs: {
      cards: 'Tarjetas',
      charts: 'Gráficos',
    },
    categories: {
      electricity: 'Electricidad',
      gas: 'Gas',
      car: 'Automóvil',
      publicTransport: 'Transporte Público',
      flights: 'Vuelos',
      meat: 'Carne',
      fruitsVeggies: 'Frutas y Verduras',
      waste: 'Residuos',
      entertainment: 'Entretenimiento',
    },
    fields: {
      housingType: {
        title: 'Tipo de Vivienda',
        options: {
          apartment: 'Departamento',
          'small-house': 'Casa Pequeña',
          'large-house': 'Casa Grande',
        },
      },
      vehicleType: {
        title: 'Tipo de Vehículo',
        options: {
          gasoline: 'Gasolina',
          diesel: 'Diesel',
          hybrid: 'Híbrido',
          electric: 'Eléctrico',
        },
      },
    },
    charts: {
      distribution: 'Distribución de Emisiones',
      comparison: 'Comparación con Promedios',
      sectorAnalysis: 'Análisis por Sector',
      yourEmissions: 'Tus emisiones',
      average: 'Promedio',
      sectorImpact: 'Impacto por sector',
      sectors: {
        housing: 'Vivienda',
        transport: 'Transporte',
        consumption: 'Consumo',
      },
    },
    reductions: {
      title: 'Reducciones',
      renewable: 'Por energías renovables',
      recycling: 'Por reciclaje',
    },
    aiConfig: {
      title: 'Configurar Asistente IA',
      enableButton: 'Activar Asistente IA',
      apiKeyLabel: 'API Key de OpenAI',
      apiKeyPlaceholder: 'Ingresa tu API key',
      saveButton: 'Guardar',
    },
    aiSuggestions: {
      title: 'Sugerencias de IA',
      error: 'Error al obtener sugerencias. Por favor, intenta nuevamente.',
    },
    infoDialog: {
      title: 'Información sobre la Huella de Carbono',
      description: 'La huella de carbono refleja las emisiones de gases de efecto invernadero (GEI) generadas por nuestras actividades diarias, expresadas en kilogramos o toneladas de CO₂ equivalente (CO₂e).',
      sections: {
        housing: {
          title: '1. Vivienda y Energía',
          content: 'El consumo de electricidad emite en promedio 0.475 kg de CO₂e por kWh, mientras que el gas natural genera 2.75 kg de CO₂e por metro cúbico. Las viviendas en departamentos suelen tener una menor huella debido a su menor demanda energética en comparación con casas individuales.',
        },
        transport: {
          title: '2. Transporte Terrestre',
          content: 'Los automóviles de gasolina producen alrededor de 2.31 kg de CO₂e por litro de combustible consumido, mientras que el transporte público, como los autobuses, emite entre 0.05 y 0.1 kg de CO₂e por kilómetro recorrido por pasajero.',
        },
        flights: {
          title: '3. Viajes Aéreos',
          content: 'Un vuelo comercial en clase económica genera aproximadamente 0.15-0.25 kg de CO₂e por kilómetro recorrido por pasajero, dependiendo de la distancia y eficiencia del avión.',
        },
        consumption: {
          title: '4. Consumo y Residuos',
          content: 'La producción de carne de res emite 27 kg de CO₂e por kilogramo, mientras que frutas y verduras oscilan entre 0.5 y 1 kg de CO₂e por kilogramo. Los residuos orgánicos depositados en vertederos generan cerca de 1.9 kg de CO₂e por kilogramo debido a la liberación de metano, un GEI potente. Además, actividades como el streaming o los videojuegos contribuyen con 0.055 kg de CO₂e por hora de uso.',
        },
        note: 'Estos valores son aproximados y pueden variar según el contexto local, hábitos personales y acceso a tecnologías sostenibles. Reflexionar sobre ellos nos ayuda a tomar decisiones conscientes y a reducir nuestro impacto ambiental.',
      },
    },
  },
  en: {
    title: 'Green Footprint Calculator',
    subtitle: 'Know your impact and contribute to planet care',
    footprint: {
      title: 'Your Green Footprint',
      unit: 'kg CO₂/month',
    },
    tabs: {
      cards: 'Cards',
      charts: 'Charts',
    },
    categories: {
      electricity: 'Electricity',
      gas: 'Gas',
      car: 'Car',
      publicTransport: 'Public Transport',
      flights: 'Flights',
      meat: 'Meat',
      fruitsVeggies: 'Fruits & Vegetables',
      waste: 'Waste',
      entertainment: 'Entertainment',
    },
    fields: {
      housingType: {
        title: 'Housing Type',
        options: {
          apartment: 'Apartment',
          'small-house': 'Small House',
          'large-house': 'Large House',
        },
      },
      vehicleType: {
        title: 'Vehicle Type',
        options: {
          gasoline: 'Gasoline',
          diesel: 'Diesel',
          hybrid: 'Hybrid',
          electric: 'Electric',
        },
      },
    },
    charts: {
      distribution: 'Emissions Distribution',
      comparison: 'Comparison with Averages',
      sectorAnalysis: 'Sector Analysis',
      yourEmissions: 'Your emissions',
      average: 'Average',
      sectorImpact: 'Impact by sector',
      sectors: {
        housing: 'Housing',
        transport: 'Transport',
        consumption: 'Consumption',
      },
    },
    reductions: {
      title: 'Reductions',
      renewable: 'From renewable energy',
      recycling: 'From recycling',
    },
    aiConfig: {
      title: 'Configure AI Assistant',
      enableButton: 'Enable AI Assistant',
      apiKeyLabel: 'OpenAI API Key',
      apiKeyPlaceholder: 'Enter your API key',
      saveButton: 'Save',
    },
    aiSuggestions: {
      title: 'AI Suggestions',
      error: 'Error getting suggestions. Please try again.',
    },
    infoDialog: {
      title: 'Carbon Footprint Information',
      description: 'The carbon footprint reflects greenhouse gas (GHG) emissions generated by our daily activities, expressed in kilograms or tons of CO₂ equivalent (CO₂e).',
      sections: {
        housing: {
          title: '1. Housing and Energy',
          content: 'Electricity consumption emits an average of 0.475 kg of CO₂e per kWh, while natural gas generates 2.75 kg of CO₂e per cubic meter. Apartment dwellings typically have a lower footprint due to their lower energy demand compared to individual houses.',
        },
        transport: {
          title: '2. Ground Transportation',
          content: 'Gasoline cars produce around 2.31 kg of CO₂e per liter of fuel consumed, while public transportation, such as buses, emits between 0.05 and 0.1 kg of CO₂e per kilometer traveled per passenger.',
        },
        flights: {
          title: '3. Air Travel',
          content: 'A commercial flight in economy class generates approximately 0.15-0.25 kg of CO₂e per kilometer traveled per passenger, depending on the distance and efficiency of the aircraft.',
        },
        consumption: {
          title: '4. Consumption and Waste',
          content: 'Beef production emits 27 kg of CO₂e per kilogram, while fruits and vegetables range between 0.5 and 1 kg of CO₂e per kilogram. Organic waste in landfills generates about 1.9 kg of CO₂e per kilogram due to methane release, a potent GHG. Additionally, activities like streaming or gaming contribute 0.055 kg of CO₂e per hour of use.',
        },
        note: 'These values are approximate and may vary according to local context, personal habits, and access to sustainable technologies. Reflecting on them helps us make conscious decisions and reduce our environmental impact.',
      },
    },
  },
} as const;