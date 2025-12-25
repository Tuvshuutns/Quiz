"use client";

import { CorrectIcon } from "@/app/_icons/correct";
import { MarkIcon } from "@/app/_icons/mark";
import { RefreshIcon } from "@/app/_icons/refresh";
import { StarIcon } from "@/app/_icons/star";
import { WrongIcon } from "@/app/_icons/wrong";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { XIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Quiz {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

export const Content = () => {
  const router = useRouter();
  const params = useParams();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setCurrentIndex(0);
    setScore(0);
    setUserAnswers([]);
    setShowResult(false);
    setQuizzes([]);

    fetch(`/api/generate?articleId=${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setQuizzes(Array.isArray(data.quizzes) ? data.quizzes : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [params.id]);

  const currentQuiz = quizzes[currentIndex];

  const handleAnswer = (option: string) => {
    setSelectedAnswer(option);
  };

  const handleNext = () => {
    if (!currentQuiz) return;

    // Save the user's answer
    const newAnswers = [...userAnswers, selectedAnswer!];
    setUserAnswers(newAnswers);

    if (selectedAnswer === currentQuiz.answer) {
      setScore(score + 1);
    }

    if (currentIndex < quizzes.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  if (loading) {
    return (
      <div className="flex w-full justify-center items-center h-full">
        <p>Loading quiz...</p>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="flex w-full justify-center items-center h-full">
        <p>No quiz available for this article.</p>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="flex w-full justify-center items-center h-full">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <CardTitle className="flex gap-2 items-center text-2xl">
              <StarIcon />
              Quick test
            </CardTitle>
            <CardDescription>Let’s see what you did</CardDescription>
          </div>
          <Card className="w-110 min-h-50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">
                Your Score: {score}{" "}
                <span className="text-[16px] text-black/20">
                  / {quizzes.length}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-5">
                {quizzes.map((quiz, index) => {
                  const userAnswer = userAnswers[index];
                  const isCorrect = userAnswer === quiz.answer;
                  return (
                    <div className="flex gap-2" key={index}>
                      <div className="w-6">
                        {quiz.answer === userAnswer ? (
                          <CorrectIcon />
                        ) : (
                          <WrongIcon />
                        )}
                      </div>
                      <div className="text-xs flex flex-col">
                        <p className="text-[#737373] ">
                          {index + 1}. {quiz.question}
                        </p>
                        <p>Your answer: {userAnswer}</p>
                        {quiz.answer !== userAnswer && (
                          <p className={"text-green-500"}>
                            Correct: {quiz.answer}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant={"outline"}
                onClick={() => {
                  setCurrentIndex(0);
                  setScore(0);
                  setUserAnswers([]);
                  setShowResult(false);
                }}
                className="w-40 h-10"
              >
                <RefreshIcon />
                Restart quiz
              </Button>
              <Button onClick={() => router.push("/")} className="w-40 h-10">
                <MarkIcon />
                Save and leave
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center items-center h-full">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle className="flex gap-2 items-center text-2xl">
              <StarIcon />
              Quick test
            </CardTitle>
            <CardDescription>
              Take a quick test about your knowledge from your content
            </CardDescription>
          </div>
          <Button variant={"x"} onClick={() => router.push("/")}>
            <XIcon />
          </Button>
        </div>
        <Card className="w-160 min-h-50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">{currentQuiz.question}</CardTitle>
            <span className="text-sm text-gray-500">
              {currentIndex + 1}/{quizzes.length}
            </span>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-6">
              {currentQuiz.options.map((option, idx) => (
                <Button
                  key={idx}
                  variant="button"
                  onClick={() => handleAnswer(option)}
                  className={
                    selectedAnswer === option
                      ? "bg-black/90 hover:bg-black/70 text-white"
                      : ""
                  }
                >
                  {option}
                </Button>
              ))}
            </div>
            <Button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="w-full"
            >
              {currentIndex < quizzes.length - 1 ? "Next" : "Finish"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
