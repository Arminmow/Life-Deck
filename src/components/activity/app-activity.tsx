import { Activity } from "@/types/activity";
import {
  ActivityContent,
  ActivityBanner,
  ActivityInfo,
  ActivityFeed,
  ActivityFeedContainer,
  ActivityAchievements,
  ActivityFeedItem,
} from "../ui/activity";
import { useSelector } from "react-redux";
import NoActivitySelected from "../ui/NoActivitySelected";
import { ActiveActivitySync } from "../sync/ActiveActivitySync";

export function AppActivity() {
  const activeId = useSelector((state: any) => state.user.activeId);
  const activities = useSelector((state: any) => state.user.activities); // Get all activities

  // Find the activity with the matching activeId
  const activeActivity: Activity = activities.find((activity: any) => activity.id === activeId);

  // If no active activity is found, render a fallback message or loading state
  if (!activeActivity) {
    return <NoActivitySelected />;
  }

  // Find activity by id
  return (
    <ActivityContent>
      <ActiveActivitySync/>
      <ActivityBanner src={activeActivity.banner} alt="Chess" title={activeActivity.title} id={activeActivity.id} />

      <ActivityInfo activity={activeActivity} />
      <ActivityFeedContainer className="flex w-full flex-wrap">
        {/* main feed */}
        <div className="w-full md:w-2/3">
          <ActivityFeed>
            {activeActivity.feeds?.map((feed, index) => (
              <ActivityFeedItem key={index} feed={feed} activity={activeActivity}>
                <p className="text-[17px] text-stone-700 font-medium leading-snug tracking-normal">{feed.description}</p>
              </ActivityFeedItem>
            ))}
          </ActivityFeed>
        </div>
        {/* sidebar */}
        <div className="w-full md:w-1/3">
          <ActivityFeed>
            <ActivityAchievements />
          </ActivityFeed>
        </div>
      </ActivityFeedContainer>
    </ActivityContent>
  );
}
