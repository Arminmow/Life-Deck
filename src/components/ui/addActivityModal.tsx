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
    console.log("yo imma add it real quick");
   
    console.log(userId);
    
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
          className="bg-[#FAF0E6] hover:bg-[#f2e7dc] text-gray-800 border-none shadow-sm px-5 py-2 rounded-xl transition-all duration-200"
        >
          {text}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-2xl bg-[#fffdf9] border border-stone-200 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-stone-700">Add Activity</DialogTitle>
          <DialogDescription className="text-stone-500">
            Create a new activity to track. Keep it ✨ aesthetic ✨.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {[
            { label: "Name", key: "title", placeholder: "Eg. Chess (You should learn chess)" },
            { label: "Banner URL", key: "banner", placeholder: "https://yourbanner.com/image.jpg" },
            { label: "Icon URL", key: "icon", placeholder: "https://youricon.com/icon.png" },
            { label: "Description", key: "description", placeholder: "Write a short description..." },
          ].map(({ label, key, placeholder }) => (
            <div key={key} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={key} className="text-right text-stone-600 font-medium">
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
                className="col-span-3 bg-white border border-stone-300 focus:ring-stone-400 focus:border-stone-400 rounded-lg"
              />
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-stone-700 hover:bg-stone-800 text-white font-medium rounded-lg px-6 py-2 transition-all duration-200"
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
