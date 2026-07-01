type LogoProps = {
  variant?: "dark" | "light";
  className?: string;
};

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const color = variant === "dark" ? "#9c1c47" : "#ffffff";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="6"
          width="7"
          height="28"
          rx="2"
          transform="rotate(-12 3 6)"
          fill={color}
        />
        <rect
          x="15"
          y="2"
          width="7"
          height="32"
          rx="2"
          transform="rotate(-12 15 2)"
          fill={color}
        />
        <rect
          x="27"
          y="10"
          width="7"
          height="24"
          rx="2"
          transform="rotate(-12 27 10)"
          fill={color}
        />
      </svg>
      <span
        className="text-2xl font-bold lowercase tracking-tight"
        style={{ color }}
      >
        wisecon
      </span>
    </div>
  );
}