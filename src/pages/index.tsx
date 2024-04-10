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
// import useLocalStorageState from "@/hooks/useLocalStorageState";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [linkEntered, setLinkEntered] = useState("");
  const [resolvedShortened, setResolvedShortened] = useState<string | null>(
    null
  );

  // Another approach: making the dataset an array of object.
  // const [linkEls, setLinkEls] = useState([]);
  const [linkEls, setLinkEls] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const storedLinkEls = localStorage.getItem("listElements");
      return storedLinkEls ? JSON.parse(storedLinkEls) : [];
    }

    return []; //fallback for server side.
  });
  const [shortened, setShortened] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem("listElements", JSON.stringify(linkEls));
  }, [linkEls]);

  function handleMenuButtonClicked(): void {
    setMenuOpen((closed) => !closed);
  }

  return (
    <>
      <Header toggleMenu={handleMenuButtonClicked} />
      {menuOpen && <OpenMenu />}
      <Hero />
      <section className="bg-subtlegray mt-[156px]">
        <ShortenerForm
          linkEntered={linkEntered}
          onLinkEntered={setLinkEntered}
          resolvedShortened={resolvedShortened}
          onResolvedShortened={setResolvedShortened}
          shortened={shortened}
          onShortened={setShortened}
          linkEls={linkEls}
          onLinkEls={setLinkEls}
        />
        <ShortenedLinksList
          linkEls={linkEls}
          linkEntered={linkEntered}
          shortened={shortened}
          resolvedShortened={resolvedShortened}
          onResolvedShortened={setResolvedShortened}
        />
        <Stats />
      </section>
      <CallToAction2 />
      <Footer />
    </>
  );
}
