import ShortenedLink from "./ShortenedLink";

interface ShortenedLinkProps {
  shortened: Promise<string> | string;
  link: string;
}

export default function ShortenedLinksList({
  shortened,
  link,
}: ShortenedLinkProps) {
  return (
    <section className="flex flex-col absolute left-[50%] -translate-x-[50%] w-[88%]">
      <ShortenedLink shortened={shortened} link={link} />
    </section>
  );
}
