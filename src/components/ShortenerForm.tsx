import { useState } from "react";
import Button from "./Button";

type ShortenedLinkElement = {
  url: string;
  shortened: string;
};

interface ShortenerFormProps {
  linkEntered: string;
  onLinkEntered: (link: string) => void;
  shortened: string;
  onShortened: (shortened: string) => void;
  linkEls: ShortenedLinkElement[];
  onLinkEls: (linkEls: ShortenedLinkElement[]) => void;
  // onLinkEls: React.Dispatch<React.SetStateAction<ShortenedLinkElement[]>>;
}

/*
MY DREAM HELPER FILE
-> Something that helps me abbreviate long links for mobile.
-> The async function that fetches the shortened link for me.
*/

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

export default function ShortenerForm({
  linkEntered,
  onLinkEntered,
  shortened,
  onShortened,
  linkEls,
  onLinkEls,
}: ShortenerFormProps) {
  const [link, setLink] = useState("");
  const [error, setError] = useState(false);

  // const addNewLink = ([key, value]: [string, string]): void => {
  //   // Use the functional update to ensure the state is updated correctly
  //   onLinkEls((prevLinkEls: LinkElsType) => ({ ...prevLinkEls, [key]: value }));
  // };

  // function addNewLink() {

  // }

  // BASIC validation thingy, I know that I would still have to update it and whatnot.
  function handleSubmit(e: any): void {
    e.preventDefault();
    onLinkEntered(link);
    const actualLink: any = shortenURL(link);
    onShortened(actualLink);
    setLink("");
    if (linkEntered === "") setError(true);
    if (linkEntered === "" || error) return;

    // Once the link is a sensible link ...
    console.log(shortened);
  }

  function handleChange(e: any): void {
    setLink(e.target.value);
    if (link === "") setError(false);
    const linkRegex =
      /^(http|https):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\/\S*)?$/;
    setError(!linkRegex.test(link));
  }

  return (
    <>
      <form
        className="grid grid-cols-1 mx-auto md:grid-cols-8 gap-3 md:gap-2 w-[88%] p-6 md:py-10 md:px-14 rounded-xl -translate-y-[72px] md:rounded-lg bg-form-pattern-m md:bg-form-pattern object-cover object-center bg-darkviolet bg-no-repeat"
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
            {!link ? "Please add a link" : "Ensure it starts with https://"}
          </em>
        )}
        <Button type="submit">Shorten it!</Button>
      </form>
      {/* Would smarten up the logic real soon */}
      {/* {shortened && <ShortenedLink shortened={shortened} link={link} />} */}
    </>
  );
}

// Logging the shortened link to console!
