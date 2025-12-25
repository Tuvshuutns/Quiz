"use client";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { OpenContent } from "./openContent";

interface ArticleContentProps {
  summary: string;
  loading: boolean;
  articleId: string;
  setLoading: (loading: boolean) => void;
}

export const CardFooterr: FC<ArticleContentProps> = ({
  summary,
  loading,
  articleId,
  setLoading,
}) => {
  const router = useRouter();

  const handleTakeQuiz = async () => {
    setLoading(true);
    try {
      const checkRes = await fetch(`/api/generate?articleId=${articleId}`);
      const checkData = await checkRes.json();

      if (!checkData.quizzes || checkData.quizzes.length === 0) {
        await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            articleId,
            content: summary,
          }),
        });
      }

      router.push(`/takeQuiz/${articleId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardFooter
      className={`flex px-0 ${summary ? "justify-between" : "justify-end"}`}
    >
      {summary && <OpenContent />}
      {!summary && (
        <Button
          type="submit"
          className="w-45 bg-black/20 mt-5"
          disabled={loading}
        >
          {!loading ? "Generate summary" : "Generating..."}
        </Button>
      )}
      {summary && (
        <button
          className="w-30 h-9 rounded-md text-[14px] bg-black/50 text-white mt-5 hover:bg-black cursor-pointer"
          type="button"
          onClick={handleTakeQuiz}
          disabled={loading}
        >
          {!loading ? "Take a quiz" : "Taking..."}
        </button>
      )}
    </CardFooter>
  );
};
