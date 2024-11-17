import type { FormData, EmissionResults } from './types';
import { EMISSION_FACTORS, HOUSING_FACTORS, VEHICLE_FACTORS } from './constants';

export function calculateEmissions(
  formData: FormData,
  useRenewable: boolean,
  recycles: boolean
): EmissionResults {
  // Calcular factores de ajuste
  const housingFactor = HOUSING_FACTORS[formData.housingType] || 1;
  const vehicleFactor = VEHICLE_FACTORS[formData.vehicleType] || 1;

  // Calcular emisiones base
  const emissions = {
    electricity: formData.electricity * EMISSION_FACTORS.electricity * housingFactor,
    gas: formData.gas * EMISSION_FACTORS.gas * housingFactor,
    car: formData.car * EMISSION_FACTORS.car * vehicleFactor,
    publicTransport: formData.publicTransport * EMISSION_FACTORS.publicTransport,
    flights: formData.flights * EMISSION_FACTORS.flights,
    meat: formData.meat * EMISSION_FACTORS.meat,
    fruitsVeggies: formData.fruitsVeggies * EMISSION_FACTORS.fruitsVeggies,
    waste: formData.waste * EMISSION_FACTORS.waste,
    entertainment: formData.entertainment * EMISSION_FACTORS.entertainment,
  };

  let total = Object.values(emissions).reduce((a, b) => a + b, 0);

  const reductions = {
    renewable: useRenewable ? total * 0.1 : 0,
    recycling: recycles ? total * 0.1 : 0,
  };

  total -= reductions.renewable + reductions.recycling;

  return {
    total,
    emissions,
    reductions,
    factors: {
      housingType: housingFactor,
      vehicleType: vehicleFactor,
    },
  };
}