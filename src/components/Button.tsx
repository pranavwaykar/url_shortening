import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "regular" | "long" | "larger" | "submit" | "copy";
}

export default function Button({ children, type = "regular" }: ButtonProps) {
  const base: string =
    "px-6 py-2 bg-cyan hover:bg-cyan/55 duration-300 text-white rounded-full cursor-pointer outline-none focus:ring focus:ring-2 focus:ring-cyan/55 focus:ring-offset-2";

  const styles: { [key: string]: string } = {
    regular: base,
    long: `${base} w-full`,
    larger: `${base} font-semibold text-[20px] px-8 py-4`,
    submit: `${base} rounded-md font-bold md:min-w-fit h-12 md:h-16 px-0 min-w-full text-base md:text-sm lg:text-base`,
    copy: `${base} py-6 flex items-center rounded-md font-bold md:min-w-fit h-0 px-0 min-w-full text-sm`,
  };

  return <button className={styles[type]}>{children}</button>;
}
