"use client";

import { Label } from "@/components/ui/label";
import { FileIcon } from "../_icons/file";
import { Input } from "@/components/ui/input";

interface ArticleContentProps {
  title: string;
  setTitle: (value: string) => void;
}

export const ArticleTitle: React.FC<ArticleContentProps> = ({
  title,
  setTitle,
}) => {
  return (
    <div className="grid gap-2">
      <Label
        htmlFor="text"
        className="flex items-center font-semibold text-sm text-[#71717A]"
      >
        <FileIcon />
        Article Title
      </Label>
      <Input
        id="text"
        type="text"
        placeholder="Enter a title for your article..."
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
};
