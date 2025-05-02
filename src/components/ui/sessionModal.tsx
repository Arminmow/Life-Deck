import { useState } from "react";
import { Play, X } from "lucide-react";
import { Button } from "./button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Textarea } from "./textarea";
import { Activity } from "@/types/activity";
import { activityService } from "@/services/activityService";

export function SessionModal({ handleClick, activity }: { activity: Activity; handleClick: () => void }) {
  const [open, setOpen] = useState(false);
  const [sessionDuration, setSessionDuration] = useState<string>("");

  const handleOpen = () => {
    // Calculate current session duration BEFORE modal opens
    if (activity.activationDate) {
      const seconds = activityService.calculateTimeSpent(activity.activationDate);
      const formatted = activityService.convertSeconds(seconds);
      setSessionDuration(formatted);
    }
    setOpen(true);
  };

  const handleConfirmStop = () => {
    handleClick(); // update backend/store
    setOpen(false); // close modal AFTER click
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {activity.isActive ? (
        <DialogTrigger asChild>
          <Button onClick={handleOpen} size="session" variant="sesstionActive">
            <span className="flex items-center gap-2">
              <X size={32} strokeWidth={3} /> Stop
            </span>
          </Button>
        </DialogTrigger>
      ) : (
        <Button onClick={handleClick} size="session" variant="session">
          <span className="flex items-center gap-2">
            <Play size={32} strokeWidth={3} /> Start
          </span>
        </Button>
      )}

      <DialogContent className="sm:max-w-[425px] w-full">
        <DialogHeader>
          <DialogTitle>Session ended – Duration: {sessionDuration || "N/A"}</DialogTitle>
          <DialogDescription>
            Want to write a quick summary of what you worked on during this session? It'll help you track your progress over
            time.
          </DialogDescription>
        </DialogHeader>
        <div className="gap-4 py-4 w-full">
          <Textarea
            placeholder="Write down your session report"
            className="w-full resize-none break-words overflow-hidden"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleConfirmStop}>Confirm Stop</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
