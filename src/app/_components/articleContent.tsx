"use client";

import { Label } from "@/components/ui/label";
import { FileIcon } from "../_icons/file";
import { FC } from "react";
import { BookIcon } from "../_icons/book";

interface ArticleContentProps {
  content: string;
  setContent: (value: string) => void;
  hasSummary: boolean;
}

export const ArticleContent: FC<ArticleContentProps> = ({
  content,
  setContent,
  hasSummary,
}) => {
  return (
    <div className="grid gap-2">
      <div className="flex items-center">
        <Label
          htmlFor="text"
          className="flex items-center font-semibold text-sm text-[#71717A]"
        >
          {hasSummary ? <BookIcon /> : <FileIcon />}
          {hasSummary ? "Summary Content" : "Article Content"}
        </Label>
      </div>
      <textarea
        placeholder="Paste your article content here..."
        className="border rounded-md min-h-40 p-3"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
    </div>
  );
};
