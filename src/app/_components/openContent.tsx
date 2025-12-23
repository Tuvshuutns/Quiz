"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useArticle } from "../_context/articleContext";

export function OpenContent() {
  const { content, title } = useArticle();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-30 h-9 rounded-md text-[14px] border bg-white text-black mt-5 cursor-pointer">
          See content
        </button>
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
