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
import { PlusCircle } from "lucide-react";

export function AddAchievementsModal() {
  const [achievement, setAchievement] = useState({
    title: "",
    description: "",
    icon: "",
  });

  //   const userId = useSelector((state: RootState) => state.user.id);

  const handleSubmit = async () => {
    console.log("yo imma add it real quick");

    // console.log(userId);

    // if (!userId) return;

    // const activityBuilt = activityService.buildActivityFromUserInput(activity);
    // await activityService.addActivity(userId, activityBuilt);
    // alert("Activity added successfully!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:brightness-110 gap-2 px-6 py-4 rounded-xl"
        >
          <PlusCircle className="w-5 h-5" />
          Add Achievement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-2xl bg-[#fffdf9] border border-stone-200 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-stone-700">Add Achievement</DialogTitle>
          <DialogDescription className="text-stone-500">Create a new achievement.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {[
            { label: "Achievement Name", key: "title", placeholder: "Eg. Chess (You should learn chess)" },
            { label: "Banner URL", key: "banner", placeholder: "https://yourbanner.com/image.jpg" },
            { label: "Icon URL", key: "icon", placeholder: "https://youricon.com/icon.png" },
            { label: "Description", key: "description", placeholder: "Write a short description..." },
          ].map(({ label, key, placeholder }) => (
            <div key={key} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={key} className="text-left text-stone-600 font-medium">
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
