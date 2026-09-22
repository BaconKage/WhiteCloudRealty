"use client";

import { useId, useMemo, useState, type CSSProperties } from "react";
import { formatPrice } from "@/lib/format";

const INITIAL = {
  priceLakh: 150,
  downPct: 20,
  ratePct: 8.5,
  years: 20,
  rentMonthly: 45_000,
} as const;

const currency = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/**
 * EMI and gross rental yield, worked out in the browser.
 *
 * Deliberately plain arithmetic with no fees, taxes or escalation modelled —
 * the copy says as much. It exists to make the "data-backed, not guesswork"
 * claim tangible, not to replace a lender's sanction letter.
 */
export function YieldCalculator() {
  const [priceLakh, setPriceLakh] = useState<number>(INITIAL.priceLakh);
  const [downPct, setDownPct] = useState<number>(INITIAL.downPct);
  const [ratePct, setRatePct] = useState<number>(INITIAL.ratePct);
  const [years, setYears] = useState<number>(INITIAL.years);
  const [rentMonthly, setRentMonthly] = useState<number>(INITIAL.rentMonthly);

  const result = useMemo(() => {
    const price = priceLakh * 100_000;
    const downPayment = price * (downPct / 100);
    const principal = price - downPayment;
    const monthlyRate = ratePct / 12 / 100;
    const months = years * 12;

    const emi =
      monthlyRate === 0
        ? principal / months
        : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1);

    const annualRent = rentMonthly * 12;

    return {
      price,
      downPayment,
      principal,
      emi,
      totalInterest: emi * months - principal,
      grossYield: price > 0 ? (annualRent / price) * 100 : 0,
      shortfall: emi - rentMonthly,
      annualRent,
      rentCoverage: emi > 0 ? (rentMonthly / emi) * 100 : 0,
    };
  }, [priceLakh, downPct, ratePct, years, rentMonthly]);

  const isInitial =
    priceLakh === INITIAL.priceLakh &&
    downPct === INITIAL.downPct &&
    ratePct === INITIAL.ratePct &&
    years === INITIAL.years &&
    rentMonthly === INITIAL.rentMonthly;

  const reset = () => {
    setPriceLakh(INITIAL.priceLakh);
    setDownPct(INITIAL.downPct);
    setRatePct(INITIAL.ratePct);
    setYears(INITIAL.years);
    setRentMonthly(INITIAL.rentMonthly);
  };

  return (
    <div className="border-line bg-surface overflow-hidden rounded-(--radius-card) border">
      <div className="border-line from-accent/8 border-b bg-gradient-to-br to-transparent p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-accent-text">Quick affordability check</p>
            <h3 className="mt-3 text-(length:--text-h3)">EMI &amp; rental yield</h3>
            <p className="text-muted mt-3 text-sm leading-relaxed sm:text-base">
              Set five assumptions and see how the loan, monthly payment and rental income fit
              together. The estimate updates instantly.
            </p>
          </div>

          <button
            type="button"
            onClick={reset}
            disabled={isInitial}
            className="border-line text-muted hover:border-accent hover:text-accent-text inline-flex min-h-10 shrink-0 items-center justify-center gap-2 self-start rounded-full border px-4 text-sm font-medium transition-colors disabled:cursor-default disabled:opacity-40"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 4v6h6M20 20v-6h-6" />
              <path d="M5.7 15A7 7 0 0 0 18 17.3L20 14M4 10l2-3.3A7 7 0 0 1 18.3 9" />
            </svg>
            Reset
          </button>
        </div>
      </div>

      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(21rem,0.88fr)] lg:gap-10">
        <section aria-labelledby="calculator-inputs-title">
          <StepHeading number="1" id="calculator-inputs-title" title="Set your assumptions" />

          <div className="mt-6 space-y-4">
            <Slider
              label="Property price"
              hint="The agreed or expected purchase price"
              value={priceLakh}
              min={30}
              max={1200}
              step={5}
              onChange={setPriceLakh}
              display={formatPrice(result.price) ?? ""}
              minLabel="₹30 L"
              maxLabel="₹12 Cr"
            />
            <Slider
              label="Down payment"
              hint="Cash paid upfront; the balance becomes the loan"
              value={downPct}
              min={10}
              max={60}
              step={1}
              onChange={setDownPct}
              display={`${downPct}%`}
              detail={formatPrice(Math.round(result.downPayment)) ?? ""}
              minLabel="10%"
              maxLabel="60%"
            />
            <Slider
              label="Interest rate"
              hint="The lender's annual interest rate"
              value={ratePct}
              min={6}
              max={12}
              step={0.05}
              onChange={setRatePct}
              display={`${ratePct.toFixed(2)}% p.a.`}
              minLabel="6%"
              maxLabel="12%"
            />
            <Slider
              label="Loan tenure"
              hint="A longer tenure lowers EMI but increases total interest"
              value={years}
              min={5}
              max={30}
              step={1}
              onChange={setYears}
              display={`${years} years`}
              detail={`${years * 12} payments`}
              minLabel="5 years"
              maxLabel="30 years"
            />
            <Slider
              label="Expected monthly rent"
              hint="Use a realistic rent before maintenance and vacancy"
              value={rentMonthly}
              min={5000}
              max={400000}
              step={1000}
              onChange={setRentMonthly}
              display={`₹${currency.format(rentMonthly)}`}
              detail={`${formatPrice(result.annualRent) ?? ""} / year`}
              minLabel="₹5k"
              maxLabel="₹4L"
            />
          </div>
        </section>

        <section aria-labelledby="calculator-result-title" className="lg:sticky lg:top-28 lg:self-start">
          <StepHeading number="2" id="calculator-result-title" title="Read the estimate" />

          <div className="border-line bg-raised mt-6 overflow-hidden rounded-2xl border">
            <div className="from-accent/12 border-line border-b bg-gradient-to-br to-transparent p-5 sm:p-6">
              <p className="text-muted text-sm">Estimated monthly EMI</p>
              <output className="numeric text-accent-text mt-2 block text-3xl font-semibold tracking-tight sm:text-4xl">
                ₹{currency.format(result.emi)}
              </output>
              <p className="text-faint mt-2 text-xs leading-relaxed">
                On a {formatPrice(Math.round(result.principal))} loan at {ratePct.toFixed(2)}% for {years} years
              </p>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-muted text-sm">Rent coverage</p>
                  <p className="text-fg mt-1 text-sm font-medium">
                    Rent covers {Math.min(result.rentCoverage, 999).toFixed(0)}% of the EMI
                  </p>
                </div>
                <p className="numeric text-accent-text text-lg font-semibold">
                  {result.shortfall > 0 ? "Gap" : "Surplus"} ₹{currency.format(Math.abs(result.shortfall))}
                </p>
              </div>

              <div className="bg-line mt-4 h-2 overflow-hidden rounded-full" aria-hidden="true">
                <span
                  className="from-accent block h-full rounded-full bg-gradient-to-r to-[#f0d878] transition-[width] duration-300 ease-(--ease-out-soft)"
                  style={{ width: `${Math.min(result.rentCoverage, 100)}%` }}
                />
              </div>
              <p className="text-faint mt-2 text-xs">
                ₹{currency.format(rentMonthly)} rent against ₹{currency.format(result.emi)} EMI each month
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-(--color-line)">
                <Metric label="Cash down payment" value={formatPrice(Math.round(result.downPayment)) ?? "—"} />
                <Metric label="Loan amount" value={formatPrice(Math.round(result.principal)) ?? "—"} />
                <Metric label="Total interest" value={formatPrice(Math.round(result.totalInterest)) ?? "—"} />
                <Metric label="Gross rental yield" value={`${result.grossYield.toFixed(2)}%`} accent />
              </dl>

              <div className="border-accent/25 bg-accent/6 mt-5 rounded-xl border p-4">
                <p className="text-fg text-sm font-medium">What “gross yield” means</p>
                <p className="text-muted mt-1 text-xs leading-relaxed">
                  Annual rent ({formatPrice(result.annualRent)}) ÷ property price ({formatPrice(result.price)}), before expenses.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="border-line text-faint flex gap-3 border-t px-6 py-4 text-xs leading-relaxed sm:px-8">
        <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 10v6M12 7h.01" />
        </svg>
        <p>
          Indicative only. Excludes registration, stamp duty, GST, maintenance, vacancy,
          processing fees and tax. Actual lending terms vary by borrower.
        </p>
      </div>
    </div>
  );
}

function StepHeading({ number, id, title }: { number: string; id: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="bg-accent text-ink numeric flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold">
        {number}
      </span>
      <h4 id={id} className="text-fg text-sm font-semibold tracking-wide uppercase">
        {title}
      </h4>
    </div>
  );
}

function Metric({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="bg-surface min-w-0 p-4">
      <dt className="text-faint text-[0.6875rem] leading-snug">{label}</dt>
      <dd className={`numeric mt-1 text-sm font-semibold sm:text-base ${accent ? "text-accent-text" : "text-fg"}`}>
        {value}
      </dd>
    </div>
  );
}

function Slider({
  label,
  hint,
  value,
  min,
  max,
  step,
  onChange,
  display,
  detail,
  minLabel,
  maxLabel,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
  detail?: string;
  minLabel: string;
  maxLabel: string;
}) {
  const id = useId();
  const hintId = `${id}-hint`;
  const progress = ((value - min) / (max - min)) * 100;

  return (
    <div className="border-line bg-raised/45 rounded-xl border p-4 transition-colors focus-within:border-(--color-accent)">
      <div className="flex items-start justify-between gap-5">
        <div>
          <label htmlFor={id} className="text-fg text-sm font-medium">
            {label}
          </label>
          <p id={hintId} className="text-faint mt-1 text-xs leading-snug">
            {hint}
          </p>
        </div>
        <output htmlFor={id} className="numeric text-fg shrink-0 text-right text-sm font-semibold">
          {display}
          {detail && <span className="text-faint mt-0.5 block text-[0.6875rem] font-normal">{detail}</span>}
        </output>
      </div>

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-describedby={hintId}
        onChange={(event) => onChange(Number(event.target.value))}
        className="calculator-range mt-4 w-full"
        style={{ "--range-progress": `${progress}%` } as CSSProperties}
      />

      <div className="text-faint mt-1 flex justify-between text-[0.625rem]">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
