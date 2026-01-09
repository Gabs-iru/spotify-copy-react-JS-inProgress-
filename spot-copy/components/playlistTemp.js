import { usePlaylists } from "./playlistContext";

export default function PlaylistItem() {
  const { playlists, setSelectedPlaylistId  } = usePlaylists();

  return (
  <div className="bg-[#141414] h-120 p-5  select-none ">
        
        <div>
          {playlists.length === 0 ? (
            <div>
            <p className="ml-10 font-bold">Nenhuma Playlist Criada ou Salva</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {playlists.filter(pl => pl && pl.id).slice(0,6).map(pl => (
                <div
                  key={pl.id} onClick={() => setSelectedPlaylistId(pl.id)}
                  className="bg-[#242424] p-3 rounded-lg hover:bg-[#2a2a2a] cursor-pointer overflow-hidden flex flex-col m-auto items-center shadow-md transition-transform duration-300 hover:scale-115"
                >
                  <img
                    src={pl.image || "placeholder.webp"}
                    alt={pl.name}
                    className="w-80 h-40 object-cover rounded mb-2 "
                  />
                  <h3 className="font-semibold hover:opacity-100 transition-opacity duration-300 flex items-end p-2">{pl.name}</h3>
                </div>
                
              ))}
            </div>
          )}
        </div>
      </div>
  );
}