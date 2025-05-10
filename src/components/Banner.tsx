import { BannerImg } from "@/assets";

export const Banner = () => {
  return (
    <div
      className="w-full h-[400px] bg-cover bg-center flex justify-center m-0 p-0 relative"
      style={{ backgroundImage: `url(${BannerImg})` }}
    >
      <h1 className="w-[621px] text-center text-[var(--accent)] pt-[59px] uppercase">Зроби свій стиль неповторним</h1>
    </div>
  );
};
