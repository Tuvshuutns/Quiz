"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

export function CreatUser() {
  const { user, isLoaded } = useUser();
  const hasCreated = useRef(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) return;
    if (hasCreated.current) return;

    hasCreated.current = true;

    fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
        clerkId: user.id,
      }),
    })
      .then((res) => res.text())
      .then(console.log)
      .catch(console.error);
  }, [isLoaded, user]);

  return null;
}
