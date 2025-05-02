import { cn } from "@/lib/utils";
import { ClockFading, Trophy, Play, X } from "lucide-react";
import { Button } from "./button";
import { Progress } from "./progress";
import { Separator } from "./separator";
import { activityService } from "@/services/activityService";
import { Activity } from "@/types/activity";
import { SessionModal } from "./sessionModal";

function ActivityContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("w-full relative", className)} {...props} />;
}

function ActivityBanner({
  className,
  src,
  title,
  id,
  ...props
}: React.ComponentProps<"img"> & { src: string; title: string; id: string }) {
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
      <div className="flex items-center justify-between absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
        <h1 className="md:text-5xl text-3xl font-semibold">{title}</h1>
        <div className="flex gap-2">
          <Button>Edit</Button>
          <Button onClick={() => activityService.deleteActivity(id)}>Delete</Button>
        </div>
      </div>
    </div>
  );
}

function ActivityStat({ icon, label, value }: { icon?: React.ReactNode; label: string; value?: string | number }) {
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

function ActivityAchievements({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section className={cn("flex flex-col w-full ", className)} {...props}>
      <header className="pb-1">
        <h2 className="text-lg font-semibold text-accent-foreground text-left">ACHIEVEMENTS</h2>
      </header>
      <ActivityAchievementsProgress />
      <div className="bg-accent-foreground rounded-b-sm">
        {/* unlocked achievements */}
        <ActivityAchievementWrapper unlocked={true} />
        <div className="flex justify-center mt-3">
          <Separator />
        </div>
        <ActivityAchievementWrapper unlocked={false} />
        <ActivityAchievementsFooter />
      </div>
    </section>
  );
}

function ActivityAchievementsProgress({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("w-full flex flex-col gap-2 text-accent bg-accent-foreground/80 p-3 rounded-t-sm", className)}
      {...props}
    >
      <span>You've unlocked 3/10 (30%)</span>
      <Progress value={30} />
    </div>
  );
}

function ActivityAchievementsFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("w-full flex  justify-end pr-5 pb-4 ", className)} {...props}>
      <span className="text-sm text-accent"> View my achievements</span>
    </div>
  );
}

function ActivityAchievementWrapper({ className, unlocked, ...props }: React.ComponentProps<"div"> & { unlocked: boolean }) {
  return (
    <div className="p-3 flex flex-col gap-2">
      <header className="w-full">
        <span className="text-accent">{unlocked ? "Unlocked achievements" : "Locked achievements"}</span>
      </header>
      <div className={cn("w-full flex  gap-2 text-accent flex-wrap", className)} {...props}>
        {/* this will be a separated component */}
        <img
          src="https://i.ibb.co/0V2yzxPR/image.png"
          alt="Achievement-img"
          className={cn(
            ` w-15 aspect-square bg-cover cursor-pointer rounded-sm`,
            !unlocked && "grayscale contrast-75 opacity-80",
            className
          )}
        />
      </div>
    </div>
  );
}

function ActivitySessionBtn({ activity }: { activity: Activity }) {
  const handleClick = async () => {
    if (activity.isActive) {
      // If the activity is already active, stop it
      await activityService.stopActivity(activity.id);
    } else {
      // If the activity is not active, start it
      await activityService.activeActivity(activity.id);
    }
  };
  return (
    // <Button size="session" variant={isActive ? "sesstionActive" : "session"} onClick={handleClick}>
    //   {isActive ? (
    //     <span className="flex items-center gap-2">
    //       <X size={32} strokeWidth={3} /> Stop
    //     </span>
    //   ) : (
    //     <span className="flex items-center gap-2">
    //       <Play size={32} strokeWidth={3} /> Start
    //     </span>
    //   )}
    // </Button>
    <SessionModal activity= {activity} handleClick={handleClick} />
  );
}

function ActivityInfo({ activity, className, ...props }: React.ComponentProps<"div"> & { activity: Activity }) {
  return (
    <section className={cn("w-full py-5 px-4 text-sidebar-accent bg-sidebar-accent-foreground", className)} {...props}>
      {/* Session Button Block */}
      <div className="mb-5">
        <ActivitySessionBtn activity={activity} />
      </div>

      {/* Stats Grid */}
      <div className="flex flex-wrap items-center justify-around gap-6 w-full">
        <ActivityStat icon={<ClockFading />} label="Time Spent" value={activityService.convertSeconds(activity.timeSpent)} />
        <ActivityStat label="Last Active" value={activity.lastActive ? activity.lastActive : "Not Active Yet"} />
        <ActivityStat icon={<Trophy />} label="Achievements" value="5 Unlocked" />
      </div>
    </section>
  );
}

function ActivityFeed({ className, ...props }: React.ComponentProps<"article">) {
  return (
    <article className={cn("bg-muted flex gap-5 flex-col items-center justify-start pt-5 px-5", className)} {...props} />
  );
}

function ActivityFeedContainer({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-row w-full", className)} {...props} />;
}

function ActivityFeedItem({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-2 p-3 w-full bg-accent-foreground rounded-sm ", className)} {...props}>
      <ActivityFeedDate date="APRIL 25" />
      {children}
    </div>
  );
}

function ActivityFeedDate({ className, date, ...props }: React.ComponentProps<"div"> & { date: string }) {
  return (
    <div className={cn("flex flex-row items-center gap-1 w-full", className)} {...props}>
      <span className="text-lg text-accent">{date}</span>
      <Separator />
    </div>
  );
}

export {
  ActivityBanner,
  ActivityContent,
  ActivityInfo,
  ActivityFeed,
  ActivityFeedContainer,
  ActivityAchievements,
  ActivityFeedItem,
};
