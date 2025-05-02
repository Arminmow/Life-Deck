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

export function AppActivity() {
  const activeId = useSelector((state: any) => state.user.activeId);
  const activities = useSelector((state: any) => state.user.activities); // Get all activities

  // Find the activity with the matching activeId
  const activeActivity: Activity = activities.find((activity: any) => activity.id === activeId);

  // If no active activity is found, render a fallback message or loading state
  if (!activeActivity) {
    return <div>Loading or no active activity selected</div>;
  }

  // Find activity by id
  return (
    <ActivityContent>
      <ActivityBanner src={activeActivity.banner} alt="Chess" title={activeActivity.title} id={activeActivity.id} />

      <ActivityInfo activity={activeActivity} />
      <ActivityFeedContainer className="flex w-full flex-wrap">
        {/* main feed */}
        <div className="w-full md:w-2/3">
          <ActivityFeed>
            {activeActivity.feeds?.map((feed) => (
              <ActivityFeedItem>
                <p className="text-accent">{feed.description}</p>
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
