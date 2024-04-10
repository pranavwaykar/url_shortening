export async function shortenURL(lengthyLink: string) {
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

export function pruneEnteredURL(URL: string): string {
  let prunedURL;
  if (window.innerWidth <= 890 && URL.length >= 32) {
    prunedURL = URL.slice(0, 32) + "...";
    console.log(prunedURL);
    return prunedURL;
  }
  return URL;
}
