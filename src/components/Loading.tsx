export const Loading = () => {
  return (
    <div className="relative w-fit mx-auto bg-black">
      <h2 className="text-[32px] lg:text-[48px] font-medium text-accent tracking-[0.02em] relative z-10">
        JEMMA
      </h2>
      {/* <div className="absolute inset-0 animate-shine bg-gradient-to-r from-transparent via-white/40 to-transparent" /> */}

      <img
        className="w-[179px] top-[440px] left-[631px] absolute h-[51px]"
        alt="Logo JEMMA animated"
        src="/logo-jemma-animated.svg"
      />
    </div>
  );
};
