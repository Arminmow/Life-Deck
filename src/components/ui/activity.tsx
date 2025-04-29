import { cn } from "@/lib/utils";

function ActivityContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("w-full relative", className)} {...props} />;
}

function ActivityBanner({ className, src, title, ...props }: React.ComponentProps<"img"> & { src: string; title: string }) {
  return (
    <div className="relative w-full h-[30vh] md:rounded-t-xl overflow-hidden">
      <img
        className={cn("w-full h-full object-cover", className)}
        src={src}
        alt="Activity image"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = "/fallback.jpg";
        }}
        {...props}
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
        <h1 className="md:text-5xl text-3xl font-semibold">{title}</h1>
      </div>
    </div>
  );
}

export { ActivityBanner, ActivityContent };
