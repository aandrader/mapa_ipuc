import { MapsIcon } from "./Icons";

export const Navbar = () => {
  return (
    <div className="absolute rounded-2xl right-4 top-5 flex font-medium bg-gradient-to-r from-blue-ipuc-700 to-blue-500  text-white  text-nowrap w-fit gap-2 py-2 px-3 text-xl z-[1000]   ">
      <h1>Mapa Ipuc</h1>
      <MapsIcon className="size-[28px]" />
    </div>
  );
};
