"use client";

import { useEffect, useState } from "react";

type DonatePopupProps = {
  amounts: Array<{ id: string; value: number; title: string }>;
};

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function DonatePopup({ amounts }: DonatePopupProps) {
  const [open, setOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(amounts[0]?.id ?? "");

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const chosenAmount = amounts.find((amount) => amount.id === selectedAmount);

  return (
    <>
      <div className="flex justify-center bg-[#e8f1df] px-6 py-8 md:px-[6%]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full bg-[#15452e] px-7 py-3.5 font-[Arial,Helvetica,sans-serif] text-sm font-bold text-[#e6f5ae] transition-transform hover:-translate-y-0.5 hover:bg-[#8a6b36] hover:text-[#fdfbf3] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b49358]"
        >
          Start a donation
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#15452e]/70 px-5 py-8 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="donate-popup-title"
            className="relative max-h-[calc(100svh-4rem)] w-full max-w-lg overflow-y-auto rounded-[1.5rem] bg-[#fdfbf3] p-6 text-[#15452e] shadow-2xl sm:p-9"
          >
            <button
              type="button"
              aria-label="Close donation popup"
              onClick={() => setOpen(false)}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#15452e]/25 text-xl leading-none transition-colors hover:bg-[#e8f1df] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b49358]"
            >
              ×
            </button>

            <p className="mb-0 pr-10 font-[Arial,Helvetica,sans-serif] text-xs font-bold uppercase tracking-[0.18em] text-[#8a6b36]">
              Make an impact
            </p>
            <h2
              id="donate-popup-title"
              className="mb-0 mt-4 max-w-[12ch] font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(2rem,6vw,3.25rem)] font-normal leading-[0.98] tracking-[-0.04em]"
            >
              Choose your gift
            </h2>
            <p className="mb-0 mt-5 max-w-[42ch] text-sm leading-[1.7] text-[#15452e]/75">
              Select an amount to begin. You’ll add your details in the secure donation form next.
            </p>

            <form
              className="mt-8"
              onSubmit={(event) => {
                event.preventDefault();
                setOpen(false);
                document.getElementById("donation-flow")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <fieldset>
                <legend className="sr-only">Donation amount</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {amounts.map((amount) => (
                    <label key={amount.id} className="cursor-pointer">
                      <input
                        type="radio"
                        name="popup-donation-amount"
                        value={amount.id}
                        checked={selectedAmount === amount.id}
                        onChange={() => setSelectedAmount(amount.id)}
                        className="peer sr-only"
                      />
                      <span className="flex min-h-24 flex-col justify-between rounded-xl border border-[#15452e]/25 bg-white/40 p-4 transition-colors peer-checked:border-[#15452e] peer-checked:bg-[#15452e] peer-checked:text-[#e6f5ae] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#b49358]">
                        <span className="font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-2xl">{money(amount.value)}</span>
                        <span className="mt-2 text-sm opacity-80">{amount.title}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <button
                type="submit"
                disabled={!chosenAmount}
                className="mt-7 w-full rounded-full bg-[#15452e] px-6 py-4 font-[Arial,Helvetica,sans-serif] text-sm font-bold text-[#e6f5ae] transition-transform hover:-translate-y-0.5 hover:bg-[#8a6b36] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b49358]"
              >
                Continue with {chosenAmount ? money(chosenAmount.value) : "your gift"}
              </button>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
