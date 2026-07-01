import Logo from "./Logo";

type BrandPanelProps = {
  side: "left" | "right";
  tagline: string;
};

export default function BrandPanel({ side, tagline }: BrandPanelProps) {
  const radius =
    side === "right"
      ? "rounded-l-[40%] md:rounded-l-[35%]"
      : "rounded-r-[40%] md:rounded-r-[35%]";

  return (
    <div
      className={`relative hidden md:flex w-1/2 min-h-screen bg-brand ${radius} items-center justify-center px-12 overflow-hidden`}
    >
      <div className="flex flex-col items-center text-center gap-3">
        <Logo variant="light" className="scale-125" />
        <p className="text-white font-bold tracking-wide text-sm">{tagline}</p>
      </div>
    </div>
  );
}