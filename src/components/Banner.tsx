import { BannerImg } from "@/assets";

export const Banner = () => {
  return (
    <div
      className="w-full h-[460px] mt-[45px] bg-cover bg-center flex justify-center items-center m-0 p-0 relative"
      style={{ backgroundImage: `url(${BannerImg})` }}
    >
      <h1 className="w-[621px] text-center text-[var(--accent)] uppercase">Зроби свій стиль неповторним</h1>
    </div>
  );
};
