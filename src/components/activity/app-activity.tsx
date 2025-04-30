import {
  ActivityContent,
  ActivityBanner,
  ActivityInfo,
  ActivityFeed,
  ActivityFeedContainer,
  ActivityAchievements,
  ActivityFeedItem,
} from "../ui/activity";

export function AppActivity() {
  return (
    <ActivityContent>
      <ActivityBanner
        src="https://wallpapers.com/images/hd/chess-king-wooden-pieces-3yal5hd39dvbvu9u.jpg"
        alt="Chess"
        title="Chess"
      />

      <ActivityInfo timeSpent="2h 37m" />
      <ActivityFeedContainer className="flex w-full flex-wrap">
        {/* main feed */}
        <div className="w-full md:w-2/3">
          <ActivityFeed>
            <ActivityFeedItem>
              <p className="text-accent">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam necessitatibus dolores fugiat sint sapiente
                rem accusamus molestiae vel, maxime dicta doloremque, laborum fuga, tenetur ipsum sunt ipsam excepturi
                voluptatum. Nostrum!
              </p>
            </ActivityFeedItem>
            <ActivityFeedItem>
              <p className="text-accent">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam necessitatibus dolores fugiat sint sapiente
                rem accusamus molestiae vel, maxime dicta doloremque, laborum fuga, tenetur ipsum sunt ipsam excepturi
                voluptatum. Nostrum!
              </p>
            </ActivityFeedItem>
            <ActivityFeedItem>
              <p className="text-accent">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam necessitatibus dolores fugiat sint sapiente
                rem accusamus molestiae vel, maxime dicta doloremque, laborum fuga, tenetur ipsum sunt ipsam excepturi
                voluptatum. Nostrum!
              </p>
            </ActivityFeedItem>
            <ActivityFeedItem>
              <p className="text-accent">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam necessitatibus dolores fugiat sint sapiente
                rem accusamus molestiae vel, maxime dicta doloremque, laborum fuga, tenetur ipsum sunt ipsam excepturi
                voluptatum. Nostrum!
              </p>
            </ActivityFeedItem>
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
