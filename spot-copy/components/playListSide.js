import { usePlaylists } from "./playlistContext";


export default function PlaylistList(){
  const { playlists, setSelectedPlaylistId } = usePlaylists();
    return(
        <div>
      {playlists.map((playlist, index) => (
        <div  key={index} onClick={() => setSelectedPlaylistId(playlist.id)} className="m-2 p-2 rounded flex cursor-pointer select-none hover:bg-[#454441]">
          <img src={playlist.image || "placeholder.webp"} alt='preview' className="w-16 h-16 rounded object-cover" />
          <div className="ml-3 mt-1">
            <h3>{playlist.name}</h3>
            {playlist.private && <span className="text-sm text-gray-400">Privada</span>}
          </div>
        </div>
      ))}
    </div>
    )
}