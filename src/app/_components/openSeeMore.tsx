import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface OpenHistoryProps {
  title: string;
  content: string;
}

export function OpenSeeMore({ title, content }: OpenHistoryProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>See more</button>
      </DialogTrigger>
      <DialogContent className="min-w-175">
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <DialogDescription className="text-black">
            {content}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
