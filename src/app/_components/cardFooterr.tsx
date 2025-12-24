"use client";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { OpenContent } from "./openContent";

interface ArticleContentProps {
  summary: string;
  laoding: boolean;
}

export const CardFooterr: FC<ArticleContentProps> = ({ summary, laoding }) => {
  const router = useRouter();
  return (
    <CardFooter
      className={`flex px-0 ${summary ? "justify-between" : "justify-end"}`}
    >
      {summary && <OpenContent />}
      {!summary && (
        <Button
          type="submit"
          className="w-45 bg-black/20 mt-5"
          disabled={laoding}
        >
          {!laoding ? "Generate summary" : "Generating..."}
        </Button>
      )}
      {summary && (
        <button
          className="w-30 h-9 rounded-md text-[14px] bg-black/50 text-white mt-5 hover:bg-black cursor-pointer"
          type="button"
          // onClick={() => router.push(`/takeQuiz/${id}`)}
          disabled={laoding}
        >
          {!laoding ? "Take a quiz" : "Taking..."}
        </button>
      )}
    </CardFooter>
  );
};
