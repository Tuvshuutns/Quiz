"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StarIcon } from "../_icons/star";
import { FormEvent, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { LeftIcon } from "../_icons/leftVector";
import { ArticleTitle } from "../_components/articleTitle";
import { ArticleContent } from "../_components/articleContent";
import { CardFooterr } from "../_components/cardFooterr";
import { ArticleProvider } from "../_context/articleContext";

export const Content = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const { user } = useUser();
  const [laoding, setLaoding] = useState(false);

  const handleSummary = async (event: FormEvent<HTMLFormElement>) => {
    setLaoding(true);
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
      console.log("GEnerated article", data);

      if (data.article.summary) {
        setSummary(data.article.summary);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLaoding(false);
    }
  };
  const handleReset = () => {
    setContent("");
    setTitle("");
    setSummary("");
  };
  return (
    <ArticleProvider title={title} content={content}>
      <div className="flex w-full justify-center items-center h-full">
        <div className="flex flex-col gap-10">
          {summary && (
            <button
              className="border w-12 h-10 flex justify-center items-center rounded-sm"
              onClick={handleReset}
            >
              <LeftIcon />
            </button>
          )}
          <Card className="w-175">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                <StarIcon />
                Article Quiz Generator
              </CardTitle>
              {!summary && (
                <CardDescription>
                  Paste your article below to generate a summarize and quiz
                  question. Your articles will saved in the sidebar for future
                  reference.
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSummary}>
                <div className="flex flex-col gap-6">
                  {!summary && (
                    <ArticleTitle title={title} setTitle={setTitle} />
                  )}
                  <ArticleContent
                    content={content}
                    summary={summary}
                    setContent={setContent}
                  />
                </div>
                <CardFooterr summary={summary} laoding={laoding} />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </ArticleProvider>
  );
};
