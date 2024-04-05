import Image from "next/image";
import Button from "./Button";

export default function Hero() {
  return (
    <section className="flex flex-col-reverse lg:flex-row justify-between items-center ml-0 lg:ml-20 mt-0 lg:mt-20 overflow-x-hidden">
      <div className="mt-32 md:mt-0 text-center lg:text-left">
        <h1 className="text-[40px] leading-tight sm:text-[4.7rem] lg:text-[3.8rem] lg:leading-[4.4rem] font-bold xl:leading-[5.6rem] tracking-tight text-verydarkviolet mb-[.6rem] lg:w-[50vw] xl:text-[4.7rem]">
          More than just
          <br /> shorter links
        </h1>
        {/* Might just make all the width 60% */}
        <p className=" text-grayishviolet text-[18px] font-[500] mb-[32px] w-[79.9%] sm:w-[60%] leading-7 mx-auto lg:mx-0">
          Build your brand&apos;s recognition and get detailed insights on how
          your links are performing.
        </p>
        <Button type="larger">Get Started</Button>
      </div>
      <Image
        src="./images/illustration-working.svg"
        width={733}
        height={482}
        priority={true}
        alt="Illustration of a person working"
        className="translate-x-20 md:translate-x-0 translate-y-[6.1vh] md:translate-y-0 scale-125 sm:scale-100 lg:scale-100 md:scale-[.80] xl:translate-x-24 overflow-y-hidden" // might change lg to xl
      />
    </section>
  );
}
