import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "./Button";

interface ShortenedLinkProps {
  shortened: Promise<string> | string;
  link: string;
}

export default function ShortenedLink({ shortened, link }: ShortenedLinkProps) {
  const [resolvedShortened, setResolvedShortened] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (typeof shortened === "object" && "then" in shortened) {
      // If shortened is a promise, wait for it to resolve
      shortened.then((result: string) => {
        setResolvedShortened(result);
      });
    } else {
      // If shortened is not a promise, it's already resolved
      setResolvedShortened(shortened as string);
    }
  }, [shortened]);

  if (!resolvedShortened) return <p>Loading...</p>;

  return (
    <div className="flex shadow-md bg-white justify-between items-center w-full rounded-md translate-y-[300%] mx-auto py-4 px-8">
      <p>{link}</p>

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
