"use client";

import { StarIcon } from "@/app/_icons/star";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const Content = () => {
  const router = useRouter();

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
        <Card className="max-w-159 min-h-50 flex justify-between">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-xl">Login to your account</CardTitle>
            <CardAction>1/5</CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-between gap-4">
              <Button variant="button">Login</Button>
              <Button variant="button">Login</Button>
              <Button variant="button">Login</Button>
              <Button variant="button">Login</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
