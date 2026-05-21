"use client";

type RoiSliderProps = {
  id: string;
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  displayValue: string;
  onChange: (value: number) => void;
};

export function RoiSlider({
  id,
  label,
  hint,
  value,
  min,
  max,
  step = 1,
  unit,
  displayValue,
  onChange,
}: RoiSliderProps) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="roi-slider-group">
      <div className="mb-2 flex items-end justify-between gap-3">
        <div>
          <label htmlFor={id} className="form-label mb-0">
            {label}
          </label>
          {hint && <p className="text-caption mt-0.5">{hint}</p>}
        </div>
        <span className="roi-slider-value font-mono text-sm font-semibold text-primary tabular-nums">
          {displayValue}
          {unit ? <span className="text-muted ml-0.5 text-xs font-normal">{unit}</span> : null}
        </span>
      </div>
      <div className="relative pt-1">
        <div
          className="roi-slider-track pointer-events-none absolute left-0 right-0 top-[0.65rem] h-1.5 rounded-full"
          aria-hidden
        >
          <div
            className="roi-slider-fill h-full rounded-full"
            style={{ width: `${percent}%` }}
          />
        </div>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="roi-range relative z-[1] w-full"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
        />
      </div>
    </div>
  );
}
