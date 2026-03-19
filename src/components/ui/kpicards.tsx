import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/utils";

export type KpiAccent =
  | "pink"
  | "violet"
  | "sky"
  | "emerald"
  | "amber"
  | "rose"
  | "indigo"
  | "slate";

export type KpiCardProps = {
  title: string;
  value: string;
  trendLabel: string;
  trendPositive?: boolean;
  icon: LucideIcon;
  accent?: KpiAccent;
  className?: string;
};

export function KpiCard({
  title,
  value,
  trendLabel,
  trendPositive = true,
  icon: Icon,
  accent = "pink",
  className,
}: KpiCardProps) {
  const iconAccentClasses: Record<KpiAccent, string> = {
    pink: "bg-pink-50 text-pink-500 group-hover:bg-pink-100",
    violet: "bg-violet-50 text-violet-500 group-hover:bg-violet-100",
    sky: "bg-sky-50 text-sky-500 group-hover:bg-sky-100",
    emerald: "bg-emerald-50 text-emerald-500 group-hover:bg-emerald-100",
    amber: "bg-amber-50 text-amber-500 group-hover:bg-amber-100",
    rose: "bg-rose-50 text-rose-500 group-hover:bg-rose-100",
    indigo: "bg-indigo-50 text-indigo-500 group-hover:bg-indigo-100",
    slate: "bg-slate-50 text-slate-500 group-hover:bg-slate-100",
  };

  return (
    <article
      className={cn(
        "group rounded-2xl border border-pink-50 bg-white/80 p-4 shadow-[0_10px_30px_rgba(236,90,135,0.06)] ring-1 ring-transparent transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(236,90,135,0.10)] hover:ring-pink-100 sm:p-4.5",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gray-400">
            {title}
          </p>
          <p className="text-xl font-semibold text-gray-900 sm:text-2xl">
            {value}
          </p>
        </div>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-2xl shadow-sm",
            iconAccentClasses[accent]
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
        <div
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium",
            trendPositive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          )}
        >
          {trendPositive ? (
            <ArrowUpRight className="h-3 w-3" />
          ) : (
            <ArrowDownRight className="h-3 w-3" />
          )}
          <span>{trendLabel}</span>
        </div>
        <span className="text-[11px] text-gray-400">vs last 30 days</span>
      </div>
    </article>
  );
}

export default KpiCard;