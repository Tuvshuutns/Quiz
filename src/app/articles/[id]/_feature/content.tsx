"use client";

import { OpenSeeMore } from "@/app/_components/openSeeMore";
import { BookIcon } from "@/app/_icons/book";
import { FileIcon } from "@/app/_icons/file";
import { LeftIcon } from "@/app/_icons/leftVector";
import { StarIcon } from "@/app/_icons/star";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export function Content() {
  const router = useRouter();
  const { id } = useParams();
  const [article, setArticle] = useState<{
    title: string;
    content: string;
    summary: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    async function fetchArticle() {
      setLoading(true);
      try {
        const res = await fetch(`/api/article/${id}`);
        if (!res.ok) {
          console.error("Failed to fetch article:", res.statusText);
          return;
        }
        const data = await res.json();
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [id]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col gap-10">
        <button
          className="border w-12 h-10 flex justify-center items-center rounded-sm"
          onClick={() => router.push("/")}
        >
          <LeftIcon />
        </button>
        <Card className="w-160 flex gap-5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <StarIcon />
              Article Quiz Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5">
            <div className="space-y-2">
              <CardDescription className="flex items-center gap-2">
                <BookIcon />
                Summarized content
              </CardDescription>
              <CardTitle>{article?.title}</CardTitle>
              {loading ? (
                <p className="text-gray-500">Loading...</p>
              ) : article ? (
                <p className="text-base">{article.summary}</p>
              ) : (
                <p className="text-gray-500">No summary available</p>
              )}
            </div>
            <div className="space-y-2">
              <CardDescription className="flex items-center gap-2">
                <FileIcon />
                Article Content
              </CardDescription>
              {loading ? (
                <p className="text-gray-500">Loading...</p>
              ) : article ? (
                <>
                  <p className="text-base whitespace-pre-wrap line-clamp-3">
                    {article.content}
                  </p>
                  <OpenSeeMore
                    content={article.content}
                    title={article.title}
                  />
                </>
              ) : (
                <p className="text-gray-500">No content available</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-35" onClick={() => router.push(`/takeQuiz/${id}`)}>
              Take a quiz
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
