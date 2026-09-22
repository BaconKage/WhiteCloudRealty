"use client";

import { useId, useMemo, useState } from "react";
import { formatPrice } from "@/lib/format";

/**
 * EMI and gross rental yield, worked out in the browser.
 *
 * Deliberately plain arithmetic with no fees, taxes or escalation modelled —
 * the copy says as much. It exists to make the "data-backed, not guesswork"
 * claim tangible, not to replace a lender's sanction letter.
 */
export function YieldCalculator() {
  const [priceLakh, setPriceLakh] = useState(150);
  const [downPct, setDownPct] = useState(20);
  const [ratePct, setRatePct] = useState(8.5);
  const [years, setYears] = useState(20);
  const [rentMonthly, setRentMonthly] = useState(45000);

  const result = useMemo(() => {
    const price = priceLakh * 100_000;
    const principal = price * (1 - downPct / 100);
    const monthlyRate = ratePct / 12 / 100;
    const months = years * 12;

    const emi =
      monthlyRate === 0
        ? principal / months
        : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1);

    return {
      price,
      principal,
      emi,
      totalInterest: emi * months - principal,
      grossYield: price > 0 ? ((rentMonthly * 12) / price) * 100 : 0,
      shortfall: emi - rentMonthly,
    };
  }, [priceLakh, downPct, ratePct, years, rentMonthly]);

  return (
    <div className="border-line bg-surface rounded-(--radius-card) border p-6 sm:p-8">
      <h3 className="text-(length:--text-h3)">EMI &amp; rental yield</h3>
      <p className="text-muted mt-2 text-sm leading-relaxed">
        A quick sanity check before the spreadsheet. Move the sliders.
      </p>

      <div className="mt-7 grid gap-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-5">
          <Slider
            label="Property price"
            value={priceLakh}
            min={30}
            max={1200}
            step={5}
            onChange={setPriceLakh}
            display={formatPrice(priceLakh * 100_000) ?? ""}
          />
          <Slider
            label="Down payment"
            value={downPct}
            min={10}
            max={60}
            step={1}
            onChange={setDownPct}
            display={`${downPct}%`}
          />
          <Slider
            label="Interest rate"
            value={ratePct}
            min={6}
            max={12}
            step={0.05}
            onChange={setRatePct}
            display={`${ratePct.toFixed(2)}% p.a.`}
          />
          <Slider
            label="Tenure"
            value={years}
            min={5}
            max={30}
            step={1}
            onChange={setYears}
            display={`${years} years`}
          />
          <Slider
            label="Expected rent"
            value={rentMonthly}
            min={5000}
            max={400000}
            step={1000}
            onChange={setRentMonthly}
            display={`₹${new Intl.NumberFormat("en-IN").format(rentMonthly)}/mo`}
          />
        </div>

        <dl className="border-line bg-raised space-y-4 self-start rounded-xl border p-5">
          <Row label="Loan amount" value={formatPrice(Math.round(result.principal)) ?? "—"} />
          <Row
            label="Monthly EMI"
            value={`₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(result.emi)}`}
            emphasis
          />
          <Row label="Total interest" value={formatPrice(Math.round(result.totalInterest)) ?? "—"} />
          <Row label="Gross rental yield" value={`${result.grossYield.toFixed(2)}%`} emphasis />
          <Row
            label={result.shortfall > 0 ? "Monthly gap after rent" : "Monthly surplus over EMI"}
            value={`₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.abs(result.shortfall))}`}
          />
        </dl>
      </div>

      <p className="text-faint mt-6 text-xs leading-relaxed">
        Indicative only. Excludes registration, stamp duty, GST, maintenance, vacancy periods,
        processing fees and tax. Actual lending terms vary by borrower.
      </p>
    </div>
  );
}

function Row({ label, value, emphasis }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div className="border-line flex items-baseline justify-between gap-4 border-b pb-4 last:border-b-0 last:pb-0">
      <dt className="text-muted text-sm">{label}</dt>
      <dd
        className={
          emphasis
            ? "numeric text-accent-text text-lg font-semibold"
            : "numeric text-fg text-sm font-medium"
        }
      >
        {value}
      </dd>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-muted text-sm font-medium">
          {label}
        </label>
        <output htmlFor={id} className="numeric text-fg text-sm font-semibold">
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="accent-accent mt-2 h-11 w-full cursor-pointer"
      />
    </div>
  );
}
