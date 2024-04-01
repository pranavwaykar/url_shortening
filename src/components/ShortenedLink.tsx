import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ShortenedLinkProps {
  shortened: Promise<string> | string;
  linkEntered: string;
}

export default function ShortenedLink({
  shortened,
  linkEntered,
}: ShortenedLinkProps) {
  const [resolvedShortened, setResolvedShortened] = useState<string | null>(
    null
  );
  const [copied, setCopied] = useState<boolean>(false);

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

  if (!resolvedShortened)
    return <p className="text-center text-xs text-green-400">Loading...</p>;

  return (
    <div className="flex flex-col md:flex-row shadow-md bg-white justify-between md:items-center w-[88%] rounded-md mx-auto md:py-4 md:px-8">
      <p className="p-4 md:p-0">{linkEntered}</p>
      <span className="md:hidden w-full bg-grayishviolet/50 h-[1px]"></span>

      <div className="flex flex-col md:flex-row gap-4 md:items-center p-4 md:p-0">
        <Link className="text-cyan" href={resolvedShortened}>
          {resolvedShortened}
        </Link>
        <button
          className={`${
            copied ? "bg-darkviolet" : "bg-cyan"
          }  py-6 flex items-center justify-center rounded-md font-bold md:min-w-fit h-0 px-4 min-w-full text-sm text-white duration-300`}
          onClick={() => {
            navigator.clipboard
              .writeText(resolvedShortened)
              .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 800);
              })
              .catch((err) => {
                console.error("Error copying to clipboard", err);
              });
          }}
          disabled={copied}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
