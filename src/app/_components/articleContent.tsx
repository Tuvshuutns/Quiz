"use client";

import { Label } from "@/components/ui/label";
import { FileIcon } from "../_icons/file";
import { FC } from "react";
import { BookIcon } from "../_icons/book";

interface ArticleContentProps {
  content: string;
  summary: string;
  setContent: (value: string) => void;
}

export const ArticleContent: FC<ArticleContentProps> = ({
  content,
  summary,
  setContent,
}) => {
  return (
    <div className="grid gap-2">
      <div className="flex items-center">
        <Label
          htmlFor="text"
          className="flex items-center font-semibold text-sm text-[#71717A]"
        >
          {summary ? <BookIcon /> : <FileIcon />}
          {summary ? "Summary Content" : "Article Content"}
        </Label>
      </div>
      <textarea
        placeholder="Paste your article content here..."
        className="border rounded-md min-h-40 p-3"
        value={summary ? summary : content}
        onChange={(e) => {
          if (!summary) {
            setContent(e.target.value);
          }
        }}
        disabled={!!summary}
      />
    </div>
  );
};
