import { cn } from "@/lib/utils";
import { ClockFading, Trophy, Play, X, PlusCircle } from "lucide-react";
import { Button } from "./button";
import { Progress } from "./progress";
import { Separator } from "./separator";
import { activityService } from "@/services/activityService";
import { Activity, FeedItem } from "@/types/activity";
import { SessionModal } from "./sessionModal";
import { AddAchievementsModal } from "./addAchievemntModal";

function ActivityContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("w-full  relative", className)} {...props} />;
}

function ActivityBanner({
  className,
  src,
  title,
  id,
  ...props
}: React.ComponentProps<"img"> & { src: string; title: string; id: string }) {
  return (
    <div className="relative w-full h-[30vh] md:rounded-t-3xl overflow-hidden shadow-lg bg-[#F2EFEA]">
      <img
        className={cn("w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]", className)}
        src={src}
        alt="Activity image"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = "/fallback.jpg";
        }}
        {...props}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="absolute bottom-0 left-0 w-full px-6 py-4 flex items-end justify-between z-10">
        <h1 className="text-white font-semibold text-2xl md:text-4xl tracking-tight drop-shadow-lg">{title}</h1>
        <div className="flex gap-3">
          <Button variant="outline" className="text-stone-800 border-stone-800 hover:bg-stone-100 hover:text-stone-800">
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={() => activityService.deleteActivity(id)}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Delete
          </Button>
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
        <span className="text-sm text-stone-500">{label}</span>
        {value && <span className="font-medium text-stone-800">{value}</span>}
      </div>
    </div>
  );
}

function NoAchivements({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-6 rounded-2xl border border-muted shadow-sm gap-4",
        className
      )}
      {...props}
    >
      <h2 className="text-xl font-semibold text-muted-foreground">No Achievements Yet</h2>
      <p className="text-sm text-muted-foreground">You haven’t added any trophies. Let’s change that.</p>
      <AddAchievementsModal />
    </div>
  );
}

function ActivityAchievements({ className, activity, ...props }: React.ComponentProps<"section"> & { activity: Activity }) {
  return (
    <section className={cn("flex flex-col w-full", className)} {...props}>
      <header className="pb-2">
        <h2 className="text-xl font-semibold text-accent-foreground">{`ACHIEVEMENTS`}</h2>
      </header>

      <ActivityAchievementsProgress total={activity.totalAchievements} unlocked={activity.achievementsUnlocked?.length} />

      <div className="bg-[#FAF0E6] rounded-b-md shadow-lg">
        {activity.totalAchievements > 0 ? (
          <>
            {" "}
            {/* unlocked achievements */}
            {activity.achievementsUnlocked?.length > 0 ? (
              <>
                {" "}
                <ActivityAchievementWrapper activity={activity} unlocked={true} />
                <div className="flex justify-center mt-2">
                  <Separator className="border-t-2 border-accent-foreground" />
                </div>
              </>
            ) : (
              <></>
            )}
            <ActivityAchievementWrapper activity={activity} unlocked={false} />
            <ActivityAchievementsFooter />
          </>
        ) : (
          <NoAchivements />
        )}
      </div>
    </section>
  );
}

function ActivityAchievementsProgress({
  className,
  total,
  unlocked,
  ...props
}: React.ComponentProps<"div"> & { total: number; unlocked: number }) {
  const value = total === 0 ? 0 : unlocked / total;
  return (
    <div
      className={cn(
        "w-full flex flex-col gap-2 text-[#3E322C] bg-[#EAE1D8] p-4 rounded-t-md shadow-sm transition-all duration-300 hover:shadow-lg hover:bg-[#D8C8B8]",
        className
      )}
      {...props}
    >
      <span className="text-sm font-medium">
        You've unlocked {unlocked}/{total} ({`${value}%`})
      </span>
      <Progress value={value} className="mt-2 bg-[#D4C6B3] rounded-full shadow-sm" />
    </div>
  );
}

function ActivityAchievementsFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("w-full flex flex-col justify-end  p-5", className)} {...props}>
      <AddAchievementsModal />
    </div>
  );
}

function ActivityAchievementWrapper({
  className,
  unlocked,
  activity,
  ...props
}: React.ComponentProps<"div"> & { unlocked: boolean; activity: Activity }) {
  return (
    <div className="p-3 flex flex-col gap-2">
      <header className="w-full">
        <span className="text-sm font-medium text-[#3E322C]">
          {unlocked ? "Unlocked achievements" : "Locked achievements"}
        </span>
      </header>
      <div className="flex justify-start gap-2">{unlocked
        ? activity.achievementsUnlocked.map((item, i) => (
            <div key={i} className={cn("w-full flex gap-3 text-accent flex-wrap", className)} {...props}>
              <img
                src={item.icon}
                alt="Achievement-img"
                className={cn(
                  "w-16 h-16 bg-cover cursor-pointer rounded-md transition-all duration-300 hover:scale-105",
                  !unlocked && "grayscale opacity-70"
                )}
              />
            </div>
          ))
        : activity.achievementsLocked.map((item, i) => (
            <div key={i} className={cn("w-full flex gap-3 text-accent flex-wrap", className)} {...props}>
              <img
                src={item.icon ? item.icon : "#"}
                alt="Achievement-img"
                className={cn(
                  "w-16 h-16 bg-cover cursor-pointer rounded-md transition-all duration-300 hover:scale-105",
                  !unlocked && "grayscale opacity-70"
                )}
              />
            </div>
          ))}</div>
      
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
    <SessionModal activity={activity} handleClick={handleClick} />
  );
}

function ActivityInfo({ activity, className, ...props }: React.ComponentProps<"div"> & { activity: Activity }) {
  return (
    <section className={cn(" w-full py-6 px-5 text-sidebar-accent bg-[#FAF0E6]  shadow-lg", className)} {...props}>
      {/* Session Button Block */}
      <div className="mb-6">
        <ActivitySessionBtn activity={activity} />
      </div>

      {/* Stats Grid */}
      <div className="flex flex-wrap items-center justify-around gap-8 w-full">
        <ActivityStat
          icon={<ClockFading className="text-stone-500" />}
          label="Time Spent"
          value={activityService.convertSeconds(activity.timeSpent)}
        />
        <ActivityStat label="Last Active" value={activity.lastActive ? activity.lastActive : "Not Active Yet"} />
        <ActivityStat
          icon={<Trophy className="text-stone-500" />}
          label="Achievements"
          value={
            activity.achievementsUnlocked.length === 0
              ? "No Achievements"
              : `${activity.achievementsUnlocked.length} Unlocked`
          }
        />
      </div>
    </section>
  );
}

function ActivityFeed({ className, ...props }: React.ComponentProps<"article">) {
  return <article className={cn("flex gap-5 flex-col items-center justify-start pt-5 px-5", className)} {...props} />;
}

function ActivityFeedContainer({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("bg-[#FDFCF9] flex flex-row w-full", className)} {...props} />;
}

function ActivityFeedItem({
  className,
  children,
  feed,
  activity,
  ...props
}: React.ComponentProps<"div"> & { feed: FeedItem; activity: Activity }) {
  return (
    <div className={cn(" shadow-lg flex flex-col gap-2 p-4 w-full bg-[#FAF0E6] rounded-xl ", className)} {...props}>
      <ActivityFeedDate date={feed.date} duration={feed.duration} />
      {children}
    </div>
  );
}

function ActivityFeedDate({
  className,
  date,
  duration,
  ...props
}: React.ComponentProps<"div"> & { date: string; duration: string }) {
  return (
    <div className={cn("flex justify-between items-center w-full", className)} {...props}>
      <span className="text-sm text-stone-600 font-light">{date}</span>
      <span className="text-sm text-stone-600 font-light">{`Session duration: ${duration}`}</span>
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
