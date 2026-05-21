/** Average weeks per month (52 ÷ 12) for monthly extrapolation from weekly hours */
export const WEEKS_PER_MONTH = 52 / 12;

export const ROI_LIMITS = {
  employees: { min: 1, max: 500, default: 8 },
  hoursPerWeek: { min: 1, max: 60, default: 6 },
  hourlyCost: { min: 5, max: 500, default: 25 },
  automationPercent: { min: 10, max: 95, default: 55 },
} as const;

export type RoiInputs = {
  employees: number;
  hoursPerWeek: number;
  hourlyCost: number;
  automationPercent: number;
};

export type RoiResults = {
  weeklyRepetitiveHours: number;
  weeklyHoursSaved: number;
  monthlyHoursSaved: number;
  yearlyHoursSaved: number;
  monthlyMoneySaved: number;
  yearlyMoneySaved: number;
};

export function clampRoiInput(
  value: number,
  min: number,
  max: number
): number {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
}

export function calculateRoi(inputs: RoiInputs): RoiResults {
  const weeklyRepetitiveHours = inputs.employees * inputs.hoursPerWeek;
  const weeklyHoursSaved =
    weeklyRepetitiveHours * (inputs.automationPercent / 100);
  const monthlyHoursSaved = weeklyHoursSaved * WEEKS_PER_MONTH;
  const yearlyHoursSaved = weeklyHoursSaved * 52;
  const monthlyMoneySaved = monthlyHoursSaved * inputs.hourlyCost;
  const yearlyMoneySaved = yearlyHoursSaved * inputs.hourlyCost;

  return {
    weeklyRepetitiveHours,
    weeklyHoursSaved,
    monthlyHoursSaved,
    yearlyHoursSaved,
    monthlyMoneySaved,
    yearlyMoneySaved,
  };
}
