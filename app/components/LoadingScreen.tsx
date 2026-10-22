
export default function LoadingScreen() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="flex fixed top-0 left-0 z-10 min-h-svh w-full items-center justify-center bg-[#fdfbf3] px-6 text-[#252d4a]"
    >
      <div className="flex flex-col items-center text-center">
        <div
          aria-hidden="true"
          className="grid h-14 w-14 place-items-center rounded-full border border-[#3b4d28]/25"
        >
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#3b4d28]/20 border-t-[#3b4d28] motion-reduce:animate-none" />
        </div>

        <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-[#3b4d28]">
          Loading
        </p>
        <p className="mt-3 text-sm text-[#252d4a]/60">Preparing your experience</p>
      </div>
    </div>
  );
}
