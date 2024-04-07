import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import OpenMenu from "@/components/OpenMenu";
import Hero from "@/components/Hero";
import ShortenerForm from "@/components/ShortenerForm";
import Stats from "@/components/Stats";
import CallToAction2 from "@/components/CallToAction2";
import Footer from "@/components/Footer";
import ShortenedLinksList from "@/components/ShortenedLinksList";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [linkEntered, setLinkEntered] = useState("");
  const [resolvedShortened, setResolvedShortened] = useState<string | null>(
    null
  );

  // Another approach: making the dataset an array of object.
  const [linkEls, setLinkEls] = useState([]);
  const [shortened, setShortened] = useState("");

  // Setting things to localStorage
  useEffect(() => {
    localStorage.setItem("listElements", JSON.stringify(linkEls));
  }, [linkEls]);

  // Getting things from localStorage
  useEffect(() => {
    const storedLinkEls = localStorage.getItem("listElements");
    if (storedLinkEls) setLinkEls(JSON.parse(storedLinkEls));
  }, []);

  function handleMenuButtonClicked(): void {
    setMenuOpen((closed) => !closed);
  }

  return (
    <>
      <Header toggleMenu={handleMenuButtonClicked} />
      {menuOpen && <OpenMenu />}
      <Hero />
      <div className="bg-subtlegray mt-[156px]">
        <ShortenerForm
          linkEntered={linkEntered}
          onLinkEntered={setLinkEntered}
          resolvedShortened={resolvedShortened}
          onResolvedShortened={setResolvedShortened}
          shortened={shortened}
          onShortened={setShortened}
          linkEls={linkEls}
          onLinkEls={setLinkEls} // We would leave it like that for now
        />
        {typeof shortened === "object" && "then" in shortened && (
          <ShortenedLinksList
            linkEls={linkEls}
            linkEntered={linkEntered}
            shortened={shortened}
            resolvedShortened={resolvedShortened}
            onResolvedShortened={setResolvedShortened}
          />
        )}
        <Stats />
      </div>
      <CallToAction2 />
      <Footer />
    </>
  );
}
