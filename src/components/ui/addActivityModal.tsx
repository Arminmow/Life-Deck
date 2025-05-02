import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { activityService } from "@/services/activityService";

export function AddActivityModal() {
  const [activity, setActivity] = useState({
    title: "",
    description: "",
    banner: "",
    icon : ""
  });

  const handleSubmit = async () => {
    console.log("yo imma add it real quick");

    const activityBuilt = activityService.buildActivityFromUserInput(activity);

    await activityService.addActivity(activityBuilt);
    alert("Activity added successfully!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className=" bg-accent-foreground text-accent cursor-pointer w-5  absolute bottom-5 right-5"
        >
          +
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Activity</DialogTitle>
          <DialogDescription>
            Add an activity you would like to track. This will be used to create a new activity card.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              onChange={(e) =>
                setActivity((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              id="name"
              placeholder="Eg. Chess (You should learn chess)"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Banner url
            </Label>
            <Input
              onChange={(e) =>
                setActivity((prev) => ({
                  ...prev,
                  banner: e.target.value,
                }))
              }
              id="username"
              placeholder="http://..."
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Icon url
            </Label>
            <Input
              onChange={(e) =>
                setActivity((prev) => ({
                  ...prev,
                  icon: e.target.value,
                }))
              }
              id="username"
              placeholder="http://..."
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Input
              onChange={(e) =>
                setActivity((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              id="username"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
