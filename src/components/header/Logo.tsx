import Image from "next/image";
interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Image
      src="./images/logo.svg"
      alt="Logo"
      width={100}
      height={40}
      className={className}
    />
  );
}
