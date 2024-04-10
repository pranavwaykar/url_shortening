import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../Button";
import { shortenURL, pruneEnteredURL } from "@/utils/helper";

export type ShortenedLinkElement = {
  id: string;
  url: string;
  shortenURL: string;
};

interface ShortenerFormProps {
  shortened: string;
  onShortened: (shortened: string) => void;
  linkEntered: string;
  onLinkEntered: (linkEntered: string) => void;
  resolvedShortened: string | null;
  onLinkEls: any;
}

export default function ShortenerForm({
  linkEntered,
  onLinkEntered,
  shortened,
  onShortened,
  onLinkEls,
  resolvedShortened,
}: ShortenerFormProps) {
  const [error, setError] = useState(false);
  const [link, setLink] = useState("");

  const addNewLink = useCallback(
    (link: any, shortened: any) => {
      if (link === "" || shortened === null) onLinkEls([]);
      if (shortened)
        onLinkEls((prev: any[]) => [
          ...prev,
          { id: crypto.randomUUID(), url: link, shortenURL: shortened },
        ]);
    },
    [onLinkEls]
  );

  /*eslint-disable*/
  useEffect(() => {
    if (resolvedShortened)
      addNewLink(pruneEnteredURL(linkEntered), resolvedShortened);
  }, [resolvedShortened]);
  /*eslint-enable*/

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
