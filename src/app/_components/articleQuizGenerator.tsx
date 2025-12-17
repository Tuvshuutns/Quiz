"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StarIcon } from "../_icons/star";
import { ArticleTitle } from "./articleTitle";
import { ArticleContent } from "./articleContent";
import { FormEvent, useState } from "react";
import { useUser } from "@clerk/nextjs";

export function ArticalQuizGenerator() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [hasSummary, setHasSummary] = useState(false);
  const { user } = useUser();

  const handleSummary = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const words = content.trim().split(/\s+/);
    const autoTitle =
      title.trim() ||
      words.slice(0, 8).join(" ") + (words.length > 8 ? "..." : "");

    setTitle(autoTitle);
    try {
      const res = await fetch("/api/article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          title: autoTitle,
          userId: user?.id,
        }),
      });
      const data = await res.json();
      console.log("Generated article", data);

      if (data.article.summary) {
        setContent(data.article.summary);
        setHasSummary(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="w-175">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
          <StarIcon />
          Article Quiz Generator
        </CardTitle>
        {!hasSummary && (
          <CardDescription>
            Paste your article below to generate a summarize and quiz question.
            Your articles will saved in the sidebar for future reference.
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSummary}>
          <div className="flex flex-col gap-6">
            {!hasSummary && <ArticleTitle title={title} setTitle={setTitle} />}
            <ArticleContent
              content={content}
              setContent={setContent}
              hasSummary={hasSummary}
            />
          </div>
          <CardFooter
            className={`flex px-0 ${
              hasSummary ? "justify-between" : "justify-end"
            }`}
          >
            <Button
              type="submit"
              className="w-30 border bg-white text-black mt-5"
            >
              See content
            </Button>
            <Button type="submit" className="w-45 bg-black/20 mt-5">
              Generate summary
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
