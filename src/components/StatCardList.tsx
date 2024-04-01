import StatCard from "./StatCard";

export default function StatCardList() {
  return (
    <div className="lg:mx-[3%] xl:mx-24 h-fit">
      <div className="mt-16 pb-[120px] flex gap-20 lg:gap-0 flex-col items-center lg:items-start lg:flex-row w-full md:justify-between">
        <StatCard
          src={"./images/icon-brand-recognition.svg"}
          title={"Brand Recognition"}
        >
          Boost your brand recognition with each click. Generic links don&apos;t
          mean a thing. Branded links help instill confidence in your content.
        </StatCard>
        <StatCard
          src={"./images/icon-detailed-records.svg"}
          title={"Detailed Records"}
          className="mt-0 lg:mt-[44px]"
        >
          Gain insights into who is clicking your links. Knowing when and where
          people engage with your content helps inform better decisions.
        </StatCard>
        <StatCard
          src={"./images/icon-fully-customizable.svg"}
          title={"Fully Customizable"}
          className="mt-0 lg:mt-[88px]"
        >
          Improve brand awareness and content discoverability through
          customizable links, supercharging audience engagement.
        </StatCard>
      </div>
      <div className="absolute lg:relative w-full flex justify-center -translate-y-[58rem] lg:-translate-y-72">
        <div className="bg-cyan w-2 h-[40rem] lg:w-full lg:h-2"></div>
      </div>
    </div>
  );
}
