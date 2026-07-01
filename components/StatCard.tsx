import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  iconColor: string;
  label: string;
  value: number;
  footer: string;
  footerColor?: string;
}

export default function StatCard({
  icon: Icon,
  iconColor,
  label,
  value,
  footer,
  footerColor = "text-gray-400",
}: StatCardProps) {
  return (
    <div className="flex-1 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-sm text-gray-500">
          <Icon size={15} className={iconColor} />
          {label}
        </span>
      </div>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      <p className={`mt-1 text-xs font-medium ${footerColor}`}>{footer}</p>
    </div>
  );
}