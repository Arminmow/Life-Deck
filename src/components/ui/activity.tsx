import { cn } from "@/lib/utils";
import { ClockFading, Trophy, Play } from "lucide-react";
import { Button } from "./button";

function ActivityContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("w-full relative", className)} {...props} />;
}

function ActivityBanner({ className, src, title, ...props }: React.ComponentProps<"img"> & { src: string; title: string }) {
  return (
    <div className="relative w-full h-[30vh] md:rounded-t-xl overflow-hidden">
      <img
        className={cn("w-full h-full object-cover", className)}
        src={src}
        alt="Activity image"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = "/fallback.jpg";
        }}
        {...props}
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
        <h1 className="md:text-5xl text-3xl font-semibold">{title}</h1>
      </div>
    </div>
  );
}

function ActivityStat({ icon, label, value }: { icon?: React.ReactNode; label: string; value?: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <div className="flex flex-col leading-tight">
        <span className="text-sm text-white/70">{label}</span>
        {value && <span className="font-medium">{value}</span>}
      </div>
    </div>
  );
}

function ActivitySessionBtn() {
  return (
    <Button size="session" variant="session">
      <Play size={32} strokeWidth={3} /> Start
    </Button>
  );
}

function ActivityInfo({ className, timeSpent, ...props }: React.ComponentProps<"div"> & { timeSpent: string }) {
  return (
    <section className={cn("w-full py-5 px-4 text-sidebar-accent bg-sidebar-accent-foreground", className)} {...props}>
      {/* Session Button Block */}
      <div className="mb-5">
        <ActivitySessionBtn />
      </div>

      {/* Stats Grid */}
      <div className="flex flex-wrap items-center justify-around gap-6 w-full">
        <ActivityStat icon={<ClockFading />} label="Time Spent" value="24h 13m" />
        <ActivityStat label="Last Play" value="May 16" />
        <ActivityStat icon={<Trophy />} label="Achievements" value="5 Unlocked" />
      </div>
    </section>
  );
}

export { ActivityBanner, ActivityContent, ActivityInfo };
