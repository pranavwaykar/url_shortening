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

  function handleMenuButtonClicked(): void {
    setMenuOpen((closed) => !closed);
  }

  // Solving the populated link elements (linkEls) problem.
  useEffect(() => {
    setLinkEls([]);
  }, []);

  return (
    <>
      <Header toggleMenu={handleMenuButtonClicked} />
      {menuOpen && <OpenMenu />}
      <Hero />
      <ShortenerForm
        linkEntered={linkEntered}
        onLinkEntered={setLinkEntered}
        shortened={shortened}
        resolvedShortened={resolvedShortened}
        onShortened={setShortened}
        linkEls={linkEls}
        onLinkEls={setLinkEls} // We would leave it like that for now
      />
      {typeof shortened === "object" && "then" in shortened && (
        <ShortenedLinksList
          linkEntered={linkEntered}
          shortened={shortened}
          resolvedShortened={resolvedShortened}
          onResolvedShortened={setResolvedShortened}
        />
      )}
      <Stats />
      <CallToAction2 />
      <Footer />
    </>
  );
}
