export const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent z-[2000]">
      <h3 className="text-accent hidden">
        JEMMA
      </h3>

      <video className="bg-transparent" src="/images/loader.gif.gif.mp4" autoPlay loop muted width={200} height={56}></video>
    </div>
  );
};
