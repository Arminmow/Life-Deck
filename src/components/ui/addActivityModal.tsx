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
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export function AddActivityModal({ text }: { text: string }) {
  const [activity, setActivity] = useState({
    title: "",
    description: "",
    banner: "",
    icon: "",
  });

  const userId = useSelector((state: RootState) => state.user.id);

  const handleSubmit = async () => {
    if (!userId) return;

    const activityBuilt = activityService.buildActivityFromUserInput(activity);
    await activityService.addActivity(userId, activityBuilt);
    alert("Activity added successfully!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#FAF0E6] cursor-pointer hover:bg-cta-btn text-text-main border-none shadow-sm px-5 py-2 rounded-xl transition-all duration-200"
        >
          {text}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-2xl bg-card-bg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-text-main">Add Activity</DialogTitle>
          <DialogDescription className="text-text-main">
            Create a new activity to track. Keep it ✨ aesthetic ✨.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5">
          {[
            { label: "Name", key: "title", placeholder: "Eg. Chess (You should learn chess)" },
            { label: "Banner URL", key: "banner", placeholder: "https://yourbanner.com/image.jpg" },
            { label: "Icon URL", key: "icon", placeholder: "https://youricon.com/icon.png" },
            { label: "Description", key: "description", placeholder: "Write a short description..." },
          ].map(({ label, key, placeholder }) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key} className="text-right text-text-main font-medium">
                {label}
              </Label>
              <Input
                id={key}
                placeholder={placeholder}
                value={(activity as any)[key]}
                onChange={(e) =>
                  setActivity((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
                className="border border-stone-300 focus:ring-2 focus:ring-stone-400 focus:border-stone-400 rounded-lg px-4 py-2 transition"
              />
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-cta-btn hover:bg-cta-hover cursor-pointer text-text-main font-medium rounded-lg px-6 py-2 transition-all duration-200"
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
