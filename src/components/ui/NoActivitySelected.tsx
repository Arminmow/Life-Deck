// components/activity/NoActivitySelected.tsx
import { PlusCircle } from "lucide-react";
import { AddActivityModal } from "./addActivityModal";

export default function NoActivitySelected() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-[#FDFCF9 ] rounded-2xl via-white to-gray-100">
      <div className="text-center max-w-md px-6">
        <div className="flex justify-center mb-6">
          <PlusCircle className="w-16 h-16 text-gray-400" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Activity Selected</h2>
        <p className="text-gray-500 mb-6">Looks like you haven’t added or chosen an activity yet. Let’s get started!</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <AddActivityModal text=" Add New Activity" />
        </div>
      </div>
    </div>
  );
}
