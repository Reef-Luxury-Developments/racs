import comingSoonHero from "@/assets/images/racs-logo-white-h.svg";

export const ComingSoon = (): JSX.Element => {
  return (
    <div className="w-full min-h-dvh mx-auto bg-linear-to-b from-[#3156BD] to-[#17214F] flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto relative z-10">
        {/* Left Image */}
        <div className="w-full max-w-[348px] shrink-0">
          <img
            src={comingSoonHero}
            alt="RACS Coming Soon"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Right Content */}
        <div className="flex flex-col items-start gap-6 border-l border-white/25 pl-12 py-9 max-w-[508px]">
          <h1 className="text-white text-[35px] font-['Space_Grotesk'] font-normal uppercase leading-[1.2] tracking-[5.25px] w-full">
            COMING SOON
          </h1>

          <p className="text-white text-[10px] font-['General_Sans'] leading-[1.4] tracking-[-0.11px] w-full">
            RACS specializes in advanced outdoor cooling design and build,
            engineering services for existing buildings, and energy efficiency
            retrofits. We deliver tailored, high-performance climate solutions
            that redefine comfort and sustainability across the region.
          </p>

          <a
            className="group relative inline-flex px-[23px] py-[12px] justify-center items-center gap-2.5 overflow-clip rounded-[115px] border border-[rgba(0,0,0,0.27)] bg-[linear-gradient(180deg,rgba(0,0,0,0.10)_0%,rgba(255,255,255,0.15)_100%)] shadow-[0_4px_4px_0_rgba(0,0,0,0.25),0_-5px_0_-4px_#FFF_inset,2px_5px_0_-4px_#FFF_inset,0_20px_5.2px_-15px_rgba(255,255,255,0.21)_inset] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03]"
            href="/RACS-Company-Profile.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="relative z-10 text-[14px] text-white font-['General_Sans'] leading-normal whitespace-nowrap">
              Download Company Profile
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
