import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "./Button";

interface ShortenedLinkProps {
  shortened: Promise<string> | string;
  linkEntered: string;
  resolvedShortened: string | null;
  onResolvedShortened: (resolvedShortened: string) => void;
}

export default function ShortenedLink({
  shortened,
  linkEntered,
  resolvedShortened,
  onResolvedShortened,
}: ShortenedLinkProps) {
  useEffect(() => {
    if (typeof shortened === "object" && "then" in shortened) {
      // If shortened is a promise, wait for it to resolve
      shortened.then((result: string) => {
        onResolvedShortened(result);
      });
    } else {
      // If shortened is not a promise, it's already resolved
      onResolvedShortened(shortened as string);
    }
    console.log(resolvedShortened);
  }, [shortened, resolvedShortened, onResolvedShortened]);

  if (!resolvedShortened) return <p>Loading...</p>;

  return (
    <div className="flex shadow-md bg-white justify-between items-center w-full rounded-md translate-y-[300%] mx-auto py-4 px-8">
      <p>{linkEntered}</p>

      <div className="flex gap-4 items-center">
        <Link
          className="text-cyan hover:decoration-black hover:decoration-1"
          href={resolvedShortened}
        >
          {resolvedShortened}
        </Link>
        <Button type="copy">Copy</Button>
      </div>
    </div>
  );
}
