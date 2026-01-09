import { FaExpandAlt } from "react-icons/fa";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { FaListUl } from "react-icons/fa";
import MenuP from "./popupPlaylist";
import PlaylistManager from "./createPlaylist";
import { useState } from "react";
import PlaylistList from "./playListSide";
import { usePlaylists } from "./playlistContext";



export default function LeftSide(){
    const [modal, setModal] = useState(false)
    const { playlists, setSelectedPlaylistId } = usePlaylists();
    
    return(
        <>
        <div className="bg-[#202021] h-full overflow-x-hidden overflow-y-auto">
            <div className="font-bold  ml-5 mr-5 ">
                <div className="flex justify-between">
                    <button className="cursor-pointer">Sua Biblioteca</button>
                    <div className="flex">
                        <MenuP setModal={setModal}/>
                        <button className="cursor-pointer ml-4 text-[#9ea1a3] hover:text-white"><FaExpandAlt /></button>
                    </div>
                </div>
                <div className="flex mt-5">
                    <button className="mr-4 cursor-pointer">Playlist</button>
                    <button className="cursor-pointer">Artistas</button>
                </div>
                <div className="flex mt-3 justify-between">
                    <HiMiniMagnifyingGlass className="cursor-pointer text-xl text-[#9ea1a3] hover:text-[#bec1c4]"/>
                    <button className="flex cursor-pointer ">Recentes<FaListUl className="text-[15px] ml-2 mt-1"/></button>
                </div>
                <div>
                    <PlaylistManager modal={modal} setModal={setModal} />
                    <PlaylistList playlists={playlists} />
                </div>
            </div>
        </div>
        </>
    )
}