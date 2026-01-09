import { FaSpotify } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { PiShoppingBagOpenDuotone } from "react-icons/pi";
import { usePlaylists } from "./playlistContext";


export default function Header(){
      const { setSelectedPlaylistId } = usePlaylists();
    return(
        <>
        <div className="h-16 w-full bg-black">
            <div className="flex flex-row justify-around mt-4">
                    <FaSpotify className="text-4xl cursor-pointer absolute left-7"/>
                    <GoHome onClick={() => setSelectedPlaylistId(null)}  className="text-[#9ea1a3] text-[40px] cursor-pointer bg-[#2f3236] rounded-3xl p-1 absolute left-177 top-3 hover:text-[#bec1c4]"/>
                        <div className="cursor-pointer flex align-baseline justify-between min-w-80 rounded-2xl">
                            <input className="z-0 cursor-text rounded-3xl w-115 h-11 focus:border-2 focus:outline-0 absolute left-190 top-2.5 bg-[#2f3236] px-11.5 text-[16px] font-bold"></input>
                            <HiMiniMagnifyingGlass className="cursor-pointer text-[#9ea1a3] text-3xl z-1 absolute left-192 hover:text-[#bec1c4]"/>
                            <p className="text-[#9ea1a3] text-3xl absolute right-188 top-3 z-1 cursor-default">|</p>
                            <PiShoppingBagOpenDuotone className="cursor-pointer text-[#9ea1a3] text-3xl z-1 absolute right-179 hover:text-[#bec1c4]"/>
                        </div>
                    <div className="ml-40 flex justify-between w-90 mt-1 font-bold">
                        <p className="cursor-pointer">Baixar</p>
                        <p className="cursor-pointer">Instalar aplicativo</p>
                        <p className="cursor-default font-light">|</p>
                        <p className="cursor-pointer">Inscrever-se</p>
                        <p className="cursor-pointer">Entrar</p>
                    </div>
            </div>
        </div>
        </>
    )
}