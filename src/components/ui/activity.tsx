import { cn } from "@/lib/utils";
import { ClockFading, Trophy, CalendarIcon } from "lucide-react";
import { Button } from "./button";
import { Progress } from "./progress";
import { Separator } from "./separator";
import { activityService } from "@/services/activityService";
import { Achievement, Activity, FeedItem } from "@/types/activity";
import { SessionModal } from "./sessionModal";
import { AddAchievementsModal } from "./addAchievemntModal";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./dialog";
import { toogleAchievementsModal } from "@/redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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
    <div className="relative w-full h-[30vh] md:rounded-t-3xl overflow-hidden shadow-lg">
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
    <div className="flex items-center gap-2 text-text-main">
      {icon}
      <div className="flex flex-col leading-tight">
        <span className="text-sm text-text-main">{label}</span>
        {value && <span className="font-medium text-text-subtle">{value}</span>}
      </div>
    </div>
  );
}

function NoAchivements({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center text-center p-6 rounded-2xl shadow-sm gap-4", className)}
      {...props}
    >
      <h2 className="text-xl font-semibold text-text-main">No Achievements Yet</h2>
      <p className="text-sm text-text-subtle">You haven’t added any trophies. Let’s change that.</p>
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

      <div className="bg-card-bg rounded-b-md shadow-lg">
        {activity.totalAchievements > 0 ? (
          <>
            {/* unlocked achievements */}
            {activity.achievementsUnlocked?.length > 0 ? (
              <>
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
  const value = total === 0 ? 0 : Math.floor((unlocked / total) * 100);
  return (
    <div
      className={cn(
        "w-full flex flex-col gap-2 text-text-main bg-sidebar-bg p-4 rounded-t-md shadow-sm transition-all duration-300 hover:shadow-lg hover:bg-main-bg",
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
  const disptch = useDispatch();
  return (
    <div className="p-3 flex flex-col gap-2" {...props}>
      <header className="w-full">
        <span className="text-sm font-medium text-text-main">
          {unlocked ? "Unlocked achievements" : "Locked achievements"}
        </span>
      </header>
      <div className="flex w-full justify-start md:justify-start flex-wrap gap-2">
        {unlocked
          ? activity.achievementsUnlocked.map((item, i) => (
              <AchievementItem
                key={i}
                onClick={() => disptch(toogleAchievementsModal())}
                item={item}
                i={i}
                unlocked={unlocked}
              />
            ))
          : activity.achievementsLocked?.map((item, i) => (
              <AchievementItem
                key={i}
                onClick={() => disptch(toogleAchievementsModal())}
                item={item}
                i={i}
                unlocked={unlocked}
              />
            ))}
      </div>
      <AchievementsModal activity={activity} />
    </div>
  );
}

function AchievementsModal({ activity }: { activity: Activity }) {
  const open = useSelector((state: RootState) => state.user.achivementsOpen);
  const disptch = useDispatch();
  return (
    <Dialog open={open} onOpenChange={() => disptch(toogleAchievementsModal())}>
      <DialogContent className="sm:max-w-[540px] bg-card-bg text-text-main rounded-3xl p-3 border-text-subtle shadow-2xl  max-h-[90%] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold ">{activity.title} Achievements</DialogTitle>

          <ActivityAchievementsProgress
            total={activity.totalAchievements}
            unlocked={activity.achievementsUnlocked?.length}
          />
        </DialogHeader>

        {/* Scrollable Content Area */}
        <div className="h-[calc(100vh-250px)] overflow-y-auto">
          {activity.achievementsUnlocked.length > 0 && (
            <div>
              <h2>Unlocked Achievements</h2>
              <div>
                {activity.achievementsUnlocked.map((item, i) => (
                  <AcievementListItem key={i} achievement={item} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-10">
            <h2>Locked Achievements</h2>
            <div className="mb-15">
              {activity.achievementsLocked.map((item, i) => (
                <AcievementListItem key={i} achievement={item} />
              ))}
            </div>
          </div>
        </div>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AcievementListItem({ achievement }: { achievement: Achievement }) {
  return (
    <div className="flex items-center w-full py-3 border-b border-text-subtle ">
      {/* Left: Icon */}
      <div className="flex-shrink-0 mr-3">
        <img
          src={achievement.icon}
          alt="Achievement Icon"
          className={cn(
            "w-10 h-10 bg-card-bg rounded-md object-cover border border-text-subtle shadow-sm",
            achievement.locked && "grayscale opacity-70 bg-gray-400"
          )}
        />
      </div>

      {/* Middle: Title and Description beside the icon */}
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold text-text-main">{achievement.title}</h1>
        <p className="text-sm text-text-subtle">{achievement.description}</p>
      </div>

      {/* Right: Buttons */}
      <div className="ml-auto flex gap-2">
        {achievement.locked ? (
          <button
            className="cursor-pointer hover:scale-105  px-3 py-1 text-sm rounded-md bg-btn-bg text-text-main hover:bg-btn-hover transition"
         
          >
            Complete
          </button>
        ) : (
          <button
            className="cursor-pointer hover:scale-105  px-3 py-1 text-sm rounded-md bg-btn-warn hover:bg-btn-warn-hover text-text-main  transition"
   
          >
            Undo Complete
          </button>
        )}

        <button
          className="px-3 py-1 text-sm rounded-md bg-cta-active text-white cursor-pointer hover:scale-105 transition"

        >
          Edit
        </button>
      </div>
    </div>
  );
}

function AchievementItem({
  className,
  item,
  i,
  unlocked,
  onClick,
}: React.ComponentProps<"div"> & { item: Achievement; i: number; unlocked: boolean }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          onClick={onClick}
          key={i}
          className={cn("aspect-square flex gap-3 text-accent flex-wrap justify-start", className)}
        >
          <img
            src={item.icon}
            alt="Achievement-img"
            className={cn(
              "w-16 h-16  bg-sidebar-bg cursor-pointer rounded-md transition-all duration-300 hover:scale-105",
              !unlocked && "grayscale opacity-70 bg-gray-400"
            )}
          />
        </div>
      </HoverCardTrigger>

      <HoverCardContent className="w-80 bg-card-bg text-[#2E2E2E] rounded-md shadow-xl border-none">
        <div className="flex items-start gap-4">
          <img
            src={item.icon}
            alt="icon preview"
            className={cn(
              "w-10 h-10 rounded-md object-cover border border-white shadow-sm",
              !unlocked && "grayscale opacity-70 bg-gray-400"
            )}
          />
          <div className="space-y-1 text-text-main">
            <h4 className="text-base font-semibold tracking-tight">{item.title}</h4>
            <p className="text-sm text-muted-foreground leading-snug">{item.description}</p>
            <div className="flex items-center gap-1 pt-2 text-xs text-muted-foreground">
              <CalendarIcon className="w-4 h-4 opacity-70" />
              <span>Added {item.createDate}</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
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
  return <SessionModal activity={activity} handleClick={handleClick} />;
}

function ActivityInfo({ activity, className, ...props }: React.ComponentProps<"div"> & { activity: Activity }) {
  return (
    <section className={cn(" w-full py-6 px-5 text-sidebar-accent bg-card-bg  shadow-lg", className)} {...props}>
      {/* Session Button Block */}
      <div className="mb-6">
        <ActivitySessionBtn activity={activity} />
      </div>

      {/* Stats Grid */}
      <div className="flex flex-wrap items-center justify-around gap-8 w-full ">
        <ActivityStat icon={<ClockFading />} label="Time Spent" value={activityService.convertSeconds(activity.timeSpent)} />
        <ActivityStat label="Last Active" value={activity.lastActive ? activity.lastActive : "Not Active Yet"} />
        <ActivityStat
          icon={<Trophy />}
          label="Achievements"
          value={activity.totalAchievements === 0 ? "No Achievements" : `${activity.achievementsUnlocked.length} Unlocked`}
        />
      </div>
    </section>
  );
}

function ActivityFeed({ className, ...props }: React.ComponentProps<"article">) {
  return (
    <article className={cn("flex gap-5 flex-col-reverse items-center justify-start pt-5 px-5", className)} {...props} />
  );
}

function ActivityFeedContainer({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("bg-main-bg flex flex-row w-full", className)} {...props} />;
}

function ActivityFeedItem({
  className,
  children,
  feed,
  activity,
  ...props
}: React.ComponentProps<"div"> & { feed: FeedItem; activity: Activity }) {
  return (
    <div
      className={cn(" shadow-lg flex flex-col gap-2 p-4 w-full bg-card-bg rounded-xl text-text-main", className)}
      {...props}
    >
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
    <div className={cn("flex justify-between items-center w-full text-text-subtle ", className)} {...props}>
      <span className="text-sm font-light">{date}</span>
      <span className="text-sm  font-light">{`Session duration: ${duration}`}</span>
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
