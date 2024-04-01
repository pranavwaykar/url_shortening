import ShortenedLink from "./ShortenedLink";

interface ShortenedLinkProps {
  shortened: Promise<string> | string;
  linkEntered: string;
}

export default function ShortenedLinksList({
  shortened,
  linkEntered,
}: ShortenedLinkProps) {
  return (
    <section className="flex flex-col mx-auto w-full -translate-y-[72px] mt-8 space-y-4">
      <ShortenedLink shortened={shortened} linkEntered={linkEntered} />
      {/* <ShortenedLink shortened={shortened} link={link} />
      <ShortenedLink shortened={shortened} link={link} /> */}
    </section>
  );
}
