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
import { PlusCircle } from "lucide-react";
import { Achievement } from "@/types/activity";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { activityService } from "@/services/activityService";

export function AddAchievementsModal() {
  const date = new Date();
  const formatted = date.getDate() + " " + date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const activeId = useSelector((state: RootState) => state.user.activeId);

  const [achievement, setAchievement] = useState<Achievement>({
    title: "",
    description: "",
    icon: "",
    locked: true,
    createDate: formatted,
    unlockDate: "",
  });

  const handleSubmit = async () => {
    await activityService.addAchievement({ achievement: achievement, activityId: activeId });
    alert("Added , chill");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl hover:scale-[1.03] active:scale-100 transition-all duration-200 ease-in-out gap-2 px-6 py-4 rounded-2xl font-semibold"
        >
          <PlusCircle className="w-5 h-5" />
          Add Achievement
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[540px] rounded-3xl bg-card-bg text-text-main border border-text-subtle shadow-2xl px-8 py-6 space-y-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Achievement</DialogTitle>
          <DialogDescription className="text-text-subtle">
            Define what success looks like — make it meaningful.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5">
          {[
            { label: "Achievement Name", key: "title", placeholder: "Eg. Chess Master" },
            { label: "Description", key: "description", placeholder: "Write a short description..." },
            { label: "Icon URL", key: "icon", placeholder: "https://youricon.com/icon.png" },
          ].map(({ label, key, placeholder }) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key} className="font-medium">
                {label}
              </Label>
              <Input
                id={key}
                placeholder={placeholder}
                value={(achievement as any)[key]}
                onChange={(e) =>
                  setAchievement((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
                className=" border border-stone-300 focus:ring-2 focus:ring-stone-400 focus:border-stone-400 rounded-lg px-4 py-2 transition"
              />
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="w-full mt-2 bg-stone-700 hover:bg-stone-800 text-white font-semibold rounded-xl px-6 py-3 shadow-md transition-all duration-200"
          >
            🏆 Add Achievement
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
