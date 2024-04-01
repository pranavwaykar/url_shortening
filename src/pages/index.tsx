import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { useState } from "react";
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
  const [link, setLink] = useState("");
  // const [links, setLinks] = useState([]);
  const [linkEls, setLinkEls] = useState({});
  const [shortened, setShortened] = useState("");

  function handleMenuButtonClicked(): void {
    setMenuOpen((closed) => !closed);
  }

  return (
    <>
      <Header toggleMenu={handleMenuButtonClicked} />
      {menuOpen && <OpenMenu />}
      <Hero />
      <ShortenerForm
        link={link}
        onLink={setLink}
        shortened={shortened}
        onShortened={setShortened}
      />
      {typeof shortened === "object" && "then" in shortened && (
        <ShortenedLinksList link={link} shortened={shortened} />
      )}
      <Stats />
      <CallToAction2 />
      <Footer />
    </>
  );
}
