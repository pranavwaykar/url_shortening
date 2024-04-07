import { useCallback, useEffect, useRef, useState } from "react";
import Button from "./Button";
import ShortenedLink from "./ShortenedLink";

export type ShortenedLinkElement = {
  id: string;
  url: string;
  shortenURL: string;
};

interface ShortenerFormProps {
  link: string;
  onLink: (link: string) => void;
  shortened: string;
  onShortened: (shortened: string) => void;
  linkEntered: string;
  onLinkEntered: (linkEntered: string) => void;
  resolvedShortened: string | null;
  onResolvedShortened: (resolvedShortened: string | null) => void;
  linkEls: ShortenedLinkElement[];
  onLinkEls: (linkEls: ShortenedLinkElement[]) => void;
}

/*
MY DREAM HELPER FILE
-> Something that helps me abbreviate long links for mobile.
-> The async function that fetches the shortened link for me.
*/

// TO BE EXPORTED TO HELPER.
async function shortenURL(lengthyLink: string) {
  try {
    const res = await fetch(
      "https://url-shortener-service.p.rapidapi.com/shorten",
      {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key":
            "c714f15a4fmsh834b9c29cf34deap1d7308jsned36279fefe2",
          "X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com",
        },
        body: new URLSearchParams({
          url: lengthyLink,
        }),
      }
    );

    const result = await res.text();
    const actualLink = JSON.parse(result).result_url;
    console.log(actualLink);
    return actualLink;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

function pruneEnteredURL(URL: string): string {
  let prunedURL;
  if (window.innerWidth <= 890 && URL.length >= 32) {
    prunedURL = URL.slice(0, 32) + "...";
    console.log(prunedURL);
    return prunedURL;
  }
  return URL;
}

export default function ShortenerForm({
  linkEntered,
  onLinkEntered,
  shortened,
  onShortened,
  linkEls,
  onLinkEls,
  resolvedShortened,
  onResolvedShortened,
}: ShortenerFormProps) {
  const [error, setError] = useState(false);
  const [link, setLink] = useState("");

  const addNewLink = useCallback(
    (link: any, shortened: any) => {
      if (link === "" || shortened === null) onLinkEls([]);
      if (shortened)
        onLinkEls((prev: ShortenedLinkElement[] | []) => [
          ...prev,
          { id: crypto.randomUUID(), url: link, shortenURL: shortened },
        ]);
    },
    [onLinkEls]
  );

  useEffect(() => {
    if (resolvedShortened)
      // addNewLink(pruneEnteredURL(linkEntered), resolvedShortened);
      addNewLink(pruneEnteredURL(linkEntered), resolvedShortened);
  }, [resolvedShortened]);

  useEffect(() => {
    if (linkEntered) console.log(pruneEnteredURL(linkEntered));
  }, [linkEntered]);

  // BASIC validation thingy, I know that I would still have to update it and whatnot.
  function handleSubmit(e: any): void {
    e.preventDefault();

    //validation
    if (link === "") setError(true);
    if (error) return;

    onLinkEntered(link);
    // Once the link is a sensible link ...
    const actualLink: any = shortenURL(link);
    onShortened(actualLink);
    setLink("");

    console.log(shortened);
  }

  function handleChange(e: any): void {
    setLink(e.target.value);
    if (link === "") setError(false);
    const linkRegex =
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    setError(!linkRegex.test(link));
  }

  return (
    <>
      <form
        className="grid grid-cols-1 mx-auto md:grid-cols-8 gap-3 justify-between w-[88%] p-6 md:py-10 md:px-14 rounded-xl -translate-y-[72px] md:rounded-lg bg-form-pattern-m md:bg-form-pattern object-cover object-center bg-darkviolet bg-no-repeat"
        action="#"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Shorten a link here..."
          className={`rounded-lg md:col-span-7 pl-3 md:pl-8 outline-none h-12 md:h-16 ${
            error ? "ring-2 ring-rose-600 ring-offset-1" : null
          }`}
          value={link}
          onChange={handleChange}
        />
        {error && (
          <em className="md:absolute bottom-3 left-6 md:left-14 text-sm text-red">
            {!link ? "Please add a link" : "Please enter a valid web address"}
          </em>
        )}
        <Button type="submit">Shorten it!</Button>
      </form>
    </>
  );
}
