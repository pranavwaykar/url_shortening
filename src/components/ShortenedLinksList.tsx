import ShortenedLink from "./ShortenedLink";

interface ShortenedLinkProps {
  shortened: Promise<string> | string;
  linkEntered: string;
  resolvedShortened: string | null;
  onResolvedShortened: (resolvedShortened: string) => void;
}

export default function ShortenedLinksList({
  shortened,
  linkEntered,
  resolvedShortened,
  onResolvedShortened,
}: ShortenedLinkProps) {
  return (
    <section className="flex flex-col absolute left-[50%] -translate-x-[50%] w-[88%]">
      <ShortenedLink
        shortened={shortened}
        linkEntered={linkEntered}
        resolvedShortened={resolvedShortened}
        onResolvedShortened={onResolvedShortened}
      />
    </section>
  );
}
