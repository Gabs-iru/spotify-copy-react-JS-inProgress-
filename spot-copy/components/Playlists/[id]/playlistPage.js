import EditPlaylistPopup from "@/components/editPlay";
import { usePlayer } from "@/components/playerContext";
import { usePlaylists } from "@/components/playlistContext";
import { useState } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { FaPause, FaRegTrashAlt } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";



export default function PlaylistPage({ playlist }) {
const { playlists,
      setPlaylists,
      selectedPlaylistId,
      setSelectedPlaylistId } = usePlaylists(); 
const [showConfirm, setShowConfirm] = useState(false);
const { playTrack
        ,isPlaying,
        togglePlay, } = usePlayer();
const [isEditing, setIsEditing] = useState(false);
const [editedPlaylist, setEditedPlaylist] = useState(null);



  const handleDelete = () => {
  setPlaylists(playlists.filter(pl => pl.id !== playlist.id));

  if (selectedPlaylistId === playlist.id) {
    setSelectedPlaylistId(null);
  }

  setShowConfirm(false);
};

const handleAddSong = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const audio = new Audio(URL.createObjectURL(file));

    
    audio.onloadedmetadata = () => {
      const newSong = {
        id: Date.now(),
        title: file.name.replace(/\.[^/.]+$/, ""), 
        artist: "Desconhecido",
        duration: formatDuration(audio.duration),
        url: URL.createObjectURL(file),
      };
    const updatedPlaylists = playlists.map((pl) =>
        pl.id === playlist.id
          ? { ...pl, songs: [...(pl.songs || []), newSong] }
          : pl
      );

      setPlaylists(updatedPlaylists);
    };
  };

 const formatDuration = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };


  return (
    <>
    
   <div className="p-4 text-white select-none flex rounded-xl" style={{ backgroundColor: playlist.bgColor }}>
      {playlist.image && (
        <img src={playlist.image} alt={playlist.name} className="w-64 h-64 object-cover rounded mb-4"/>
      )}
      {isEditing && (
  <EditPlaylistPopup
    playlist={editedPlaylist}
    onClose={() => setIsEditing(false)}
    onSave={(updated) => {
      const updatedPlaylists = playlists.map(pl =>
        pl.id === updated.id ? updated : pl
      );
      setPlaylists(updatedPlaylists);
    }}
  />
)}
      <div className="flex flex-col justify-center ml-5">
      <p className="text-[14px] font-bold relative top-5">{playlist.private ? "Privada" : "Pública"}</p>
      <h1 className="text-[90px] font-bold leading-tight cursor-pointer" onClick={() => {
    setEditedPlaylist(playlist);
    setIsEditing(true);
  }}>
    {playlist.name}
  <span className="blink"></span>
  </h1>
  
      </div>
      
      
    </div>
    <div className="h-20  flex items-center justify-baseline">
      <button onClick={togglePlay} className="ml-10 bg-lime-400 rounded-full h-15 w-15 items-center flex p-6 cursor-pointer hover:scale-105">
          {isPlaying ? <FaPause size={30} className="text-black" /> : <FaPlay size={30} className="text-black" />}
          
          
      </button>
      <button className="cursor-pointer ml-10" onClick={() => setShowConfirm(true)}>
        <FaRegTrashAlt size={25}/>
      </button>
      <button className="cursor-pointer ml-5">
        <AiOutlineCloudDownload size={25}/>
      </button>
      <button className="cursor-pointer ml-5">
        <HiDotsHorizontal  size={25}/>
      </button>
    </div>
    <div>
      
       <label className="ml-10 bg-[#2a2a2a] px-4 py-2 rounded cursor-pointer hover:bg-[#3a3a3a]">
          + Adicionar Música
          <input
        type="file"
        accept="audio/*"
        onChange={handleAddSong}
        className="my-4 hidden"
      />
        </label>
              <div className="mt-5">
        {playlist.songs?.map((song, index) => (
        <div
          key={song.id}
          onClick={() => playTrack(song.url)}
          className="flex items-center p-2 hover:bg-gray-800 rounded cursor-pointer"
        >
          <span className="w-8 text-gray-400">{index + 1}</span>
          <p className="flex-1">{song.title}</p>
          <p className="w-32 text-right">{song.artist}</p>
          <p className="w-16 text-right">{song.duration}</p>
        </div>
      ))}
      </div>
    </div>
    {showConfirm && (
        <div className="fixed inset-0 bg-[#0000004d] flex items-center justify-center z-50 select-none">
          <div className="bg-[#141414] bg-opacity-10 p-6 rounded-xl flex flex-col items-center">
            <p className="mb-4 text-white font-semibold">Tem certeza que deseja deletar a playlist?</p>
            <div className="flex gap-4">
              <button
                className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 cursor-pointer font-bold"
                onClick={handleDelete}
              >
                Deletar
              </button>
              <button
                className="bg-gray-700 px-4 py-2 rounded text-white hover:bg-gray-600 cursor-pointer font-bold" 
                onClick={() => setShowConfirm(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
   </>
  );
}
